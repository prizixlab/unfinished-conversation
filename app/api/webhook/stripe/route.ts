import { NextResponse } from 'next/server';
import Stripe from "stripe";
import { stripe } from '@/lib/stripe';
import {
  expireSubmission,
  getSubmissionByStripeSessionId,
  upsertPaidSubmissionFromStripeSession,
} from "@/lib/submissions";

export async function POST(req: Request) {
  const signature = req.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  const payload = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (err) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    if (session?.id && session.payment_status === "paid") {
      await upsertPaidSubmissionFromStripeSession(session);
    }
  }

  if (event.type === "checkout.session.expired") {
    const session = event.data.object as Stripe.Checkout.Session;
    if (session?.id) {
      const submission = await getSubmissionByStripeSessionId(session.id);
      if (submission && submission.status === "paid" && !submission.is_consumed) {
        await expireSubmission(submission, "stripe_webhook");
      }
    }
  }

  return NextResponse.json({ received: true });
}
