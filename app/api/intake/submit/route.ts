import { NextResponse } from 'next/server';

import { stripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export const runtime = 'nodejs';

const envTrue = (value?: string) => value?.toLowerCase() === 'true';
const rawAllowBypass = process.env.ALLOW_BYPASS_PAYMENT;
const allowBypass =
  rawAllowBypass === undefined
    ? process.env.NODE_ENV !== 'production'
    : envTrue(rawAllowBypass);

console.log('[intake/submit] server start env keys =', Object.keys(process.env));
console.log(
  '[intake/submit] bypass config allowBypass =',
  allowBypass,
  'raw =',
  rawAllowBypass,
  'node_env =',
  process.env.NODE_ENV
);

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      sessionId?: string;
      name?: string;
      recipient?: string;
      message?: string;
      email?: string;
    };

    const { sessionId, name, recipient, message, email } = body;
    const isBypassSession = Boolean(sessionId?.startsWith('cs_bypass_'));
    const canBypassPayment = allowBypass && isBypassSession;

    console.log('INTAKE SUBMIT PAYLOAD:', {
      sessionId,
      name,
      recipient,
      message,
      email,
      bypassMode: canBypassPayment,
    });

    if (!sessionId || !name || !message || !email) {
      return NextResponse.json(
        {
          error: 'Missing required fields',
          details: 'sessionId, name, message, and email are required.',
        },
        { status: 400 }
      );
    }

    if (!canBypassPayment) {
      const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);

      if (checkoutSession.payment_status !== 'paid') {
        return NextResponse.json(
          {
            error: 'Payment not verified',
            details: {
              payment_status: checkoutSession.payment_status,
              status: checkoutSession.status,
            },
          },
          { status: 403 }
        );
      }
    }

    const { data, error } = await supabaseAdmin
      .from('intake_messages')
      .insert({
        session_id: sessionId,
        sender_name: name,
        recipient_name: recipient,
        recipient_email: email,
        message,
        status: 'pending',
      })
      .select('id')
      .single();

    if (error) {
      return NextResponse.json(
        {
          error: 'Failed to insert intake message',
          details: error.message,
        },
        { status: 500 }
      );
    }

    console.log('[intake/submit] SUCCESS id =', data.id);

    return NextResponse.json({ ok: true, id: data.id }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: 'Server error',
        details: error?.message ?? 'Unexpected error while submitting intake message.',
      },
      { status: 500 }
    );
  }
}
