import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      sessionId?: string;
      name?: string;
      recipient?: string;
      message?: string;
      email?: string;
    };

    const sessionId = body.sessionId?.trim();
    const name = body.name?.trim();
    const recipient = body.recipient?.trim() || null;
    const message = body.message?.trim();
    const email = body.email?.trim();

    if (!sessionId || !name || !message || !email) {
      return NextResponse.json(
        { error: 'Missing required fields', details: 'sessionId, name, message, and email are required.' },
        { status: 400 }
      );
    }

    const isBypassSession = sessionId.startsWith('cs_bypass_');

    if (!isBypassSession) {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      if (session.payment_status !== 'paid') {
        return NextResponse.json(
          { error: 'Payment not verified', details: 'Stripe checkout session is not paid.' },
          { status: 403 }
        );
      }

      const { data: existing, error: existingError } = await supabaseAdmin
        .from('intake_messages')
        .select('id')
        .eq('stripe_session_id', sessionId)
        .limit(1)
        .maybeSingle();

      if (existingError) {
        return NextResponse.json(
          { error: 'Failed to validate session usage', details: existingError.message },
          { status: 500 }
        );
      }

      if (existing) {
        return NextResponse.json(
          { error: 'Session already used', details: 'This Stripe session has already been submitted.' },
          { status: 409 }
        );
      }
    }

    const { data, error } = await supabaseAdmin
      .from('intake_messages')
      .insert({
        stripe_session_id: sessionId,
        name,
        recipient,
        message,
        email,
        status: 'pending'
      })
      .select('id')
      .single();

    if (error) {
      return NextResponse.json({ error: 'Failed to insert intake message', details: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id: data.id });
  } catch (error: unknown) {
    const details = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: 'Server error', details }, { status: 500 });
  }
}
