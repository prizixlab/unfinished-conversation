import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import {
  MAX_REQUEST_BYTES,
  expireSubmission,
  getSubmissionByStripeSessionId,
  isExpired,
  isValidEmail,
  normalizeEmail,
  parseIntakePayload,
  queuePaidSubmission,
} from "@/lib/submissions";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const contentLength = Number(req.headers.get("content-length") || "0");
  if (contentLength > MAX_REQUEST_BYTES) {
    return NextResponse.json(
      { ok: false, error: "Payload too large" },
      { status: 413 }
    );
  }

  let body: any = null;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const { senderName, recipientName, email, messageText, stripeSessionId, messageLanguage } =
    parseIntakePayload(body);

  const missing: string[] = [];
  if (!senderName) missing.push("senderName");
  if (!recipientName) missing.push("recipientName");
  if (!email) missing.push("recipientEmail");
  if (!messageText) missing.push("message");
  if (!stripeSessionId) missing.push("sessionId");

  if (missing.length > 0) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields", missing },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Invalid email address" },
      { status: 400 }
    );
  }

  if (messageText.length < 20) {
    return NextResponse.json(
      { ok: false, error: "Message is too short" },
      { status: 400 }
    );
  }

  try {
    const stripeSession = await stripe.checkout.sessions.retrieve(stripeSessionId);
    if (!stripeSession || stripeSession.payment_status !== "paid") {
      return NextResponse.json(
        { ok: false, error: "Payment not verified" },
        { status: 403 }
      );
    }

    const submission = await getSubmissionByStripeSessionId(stripeSessionId);
    if (!submission) {
      return NextResponse.json(
        {
          ok: false,
          error: "Payment is still being confirmed. Please try again in a moment.",
        },
        { status: 409 }
      );
    }

    if (submission.status === "expired" || isExpired(submission.session_expires_at)) {
      if (submission.status === "paid") {
        await expireSubmission(submission);
      }
      return NextResponse.json(
        { ok: false, error: "This intake link has expired." },
        { status: 410 }
      );
    }

    if (submission.is_consumed || submission.status !== "paid") {
      return NextResponse.json(
        { ok: false, error: "This paid session has already been used." },
        { status: 409 }
      );
    }

    const queued = await queuePaidSubmission({
      submission,
      email: normalizeEmail(email),
      senderName,
      recipientName,
      messageText,
      messageLanguage,
    });

    return NextResponse.json(
      {
        ok: true,
        id: queued.id,
        stripeSessionId: queued.stripe_session_id,
        status: queued.status,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to submit intake", error);
    return NextResponse.json(
      { ok: false, error: "Failed to submit intake" },
      { status: 500 }
    );
  }
}
