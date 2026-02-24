import { NextResponse } from 'next/server';

import { stripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export const runtime = 'nodejs';

const isTruthyEnv = (value?: string) => {
  if (!value) return false;
  return ['true', '1', 'yes'].includes(value.trim().toLowerCase());
};

export async function POST(req: Request) {
  console.log('[INTAKE_SUBMIT_ROUTE_ACTIVE_v1]');

  const rawAllowBypass = process.env.ALLOW_BYPASS_PAYMENT;
  const isDev = process.env.NODE_ENV !== 'production';
  const allowBypass = rawAllowBypass === undefined ? isDev : isTruthyEnv(rawAllowBypass);

  console.log('[intake/submit] bypass config', {
    allowBypass,
    rawAllowBypass,
    nodeEnv: process.env.NODE_ENV,
  });

  try {
    const body = (await req.json()) as {
      sessionId?: string;
      senderName?: string;
      recipientName?: string;
      recipientEmail?: string;
      message?: string;
    };

    const sessionId = body.sessionId?.trim() ?? '';
    const senderName = body.senderName?.trim() ?? '';
    const recipientName = body.recipientName?.trim() ?? '';
    const recipientEmail = body.recipientEmail?.trim() ?? '';
    const message = body.message?.trim() ?? '';

    console.log('[intake/submit] payload diagnostics', {
      sessionId,
      senderName,
      recipientName,
      recipientEmail,
      messageLen: message.length,
    });

    if (!sessionId || !senderName || !recipientName || !recipientEmail || !message) {
      return NextResponse.json(
        { ok: false, error: 'Missing required fields.' },
        { status: 400 }
      );
    }

    const isBypassSession = sessionId.startsWith('cs_bypass_');

    if (isBypassSession && !allowBypass) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Bypass session is not allowed.',
          rawEnv: rawAllowBypass,
        },
        { status: 403 }
      );
    }

    if (!isBypassSession) {
      const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);

      if (checkoutSession.payment_status !== 'paid') {
        return NextResponse.json(
          {
            ok: false,
            error: 'Payment not verified.',
          },
          { status: 403 }
        );
      }
    }

    const { data, error } = await supabaseAdmin
      .from('intake_messages')
      .insert({
        session_id: sessionId,
        sender_name: senderName,
        name: senderName,
        recipient: recipientName,
        email: recipientEmail,
        message,
        status: 'pending',
      })
      .select('id')
      .single();

    if (error) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Failed to insert intake message.',
          details: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, id: data.id }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Server error.',
        details: error?.message ?? 'Unexpected error while submitting intake message.',
      },
      { status: 500 }
    );
  }
}
