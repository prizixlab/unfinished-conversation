import { NextResponse } from "next/server";

export async function POST(req: Request) {
  return NextResponse.json(
    {
      error:
        "This webhook endpoint has been retired. Configure Stripe to use /api/webhook/stripe.",
    },
    { status: 410 }
  );
}
