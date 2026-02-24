import { NextResponse } from 'next/server';

import { stripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export const runtime = 'nodejs';

const isTruthyEnv = (value?: string) => {
  if (!value) return false;
  return ['true', '1', 'yes', 'on'].includes(value.trim().toLowerCase());
};

export async function POST(req: Request) {
  console.log('[INTAKE_SUBMIT_ROUTE_ACTIVE_v2]');

  const rawAllowBypass = process.env.ALLOW_BYPASS_PAYMENT;
  const allowBypass = isTruthyEnv(rawAllowBypass);
  console.log(`[intake/submit] allowBypass=${allowBypass} raw=${rawAllowBypass}`);

  try {
    const url = new URL(req.url);
    const paid = url.searchParams.get('paid');
    const bypassRequested = paid === '1';

    const body = (await req.json()) as {
      sessionId?: string;
      senderName?: string;
      recipientName?: string;
      recipientEmail?: string;
      message?: string;
    };

    const payload = {
      sessionId: body.sessionId?.trim() ?? '',
      senderName: body.senderName?.trim() ?? '',
      recipientName: body.recipientName?.trim() ?? '',
      recipientEmail: body.recipientEmail?.trim() ?? '',
      message: body.message?.trim() ?? '',
    };

    const missingFields = Object.entries(payload)
      .filter(([, value]) => !value)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { ok: false, error: 'Missing required fields', missingFields },
        { status: 400 }
      );
    }

    if (bypassRequested) {
      if (!allowBypass) {
        return NextResponse.json({ ok: false, error: 'Bypass not allowed' }, { status: 403 });
      }
    } else {
      const checkoutSession = await stripe.checkout.sessions.retrieve(payload.sessionId);

      if (checkoutSession.payment_status !== 'paid') {
        return NextResponse.json({ ok: false, error: 'Payment not verified.' }, { status: 403 });
      }
    }

    const { data, error } = await supabaseAdmin
      .from('intake_messages')
      .insert({
        session_id: payload.sessionId,
        sender_name: payload.senderName,
        recipient: payload.recipientName,
        email: payload.recipientEmail,
        message: payload.message,
        status: 'pending',
      })
      .select('id')
      .single();

    if (error) {
      return NextResponse.json(
        { ok: false, error: 'Failed to insert intake message.', details: error.message },
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
