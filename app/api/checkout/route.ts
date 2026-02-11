import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!siteUrl) {
    return NextResponse.json(
      { error: "Missing NEXT_PUBLIC_SITE_URL in .env.local" },
      { status: 500 }
    );
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Unfinished Letter (Test $1)" },
            unit_amount: 100, // $1.00
          },
          quantity: 1,
        },
      ],

      // ✅ THIS is the redirect after payment
      success_url: `${siteUrl}/intake?session_id={CHECKOUT_SESSION_ID}`,

      // ✅ This is where Stripe sends you if user cancels
      cancel_url: `${siteUrl}/start?canceled=1`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.log("STRIPE ERROR:", err?.type, err?.code, err?.message);
    return NextResponse.json(
      { error: err?.message ?? "Stripe error", code: err?.code, type: err?.type },
      { status: 500 }
    );
  }
}
