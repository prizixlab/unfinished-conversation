import { NextResponse } from "next/server";
import { generateResponse } from "@/lib/openai";
import { resend } from "@/lib/resend";
import { supabaseAdmin } from "@/lib/supabase";
import {
  buildReplyPrompt,
  buildResultUrl,
  claimNextSubmissionForDelivery,
  claimNextSubmissionForGeneration,
  markDeliveryFailure,
  markDeliverySuccess,
  markGenerationFailure,
  markGenerationSuccess,
} from "@/lib/submissions";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const BATCH_LIMIT = 5;

function getBearerToken(req: Request) {
  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) {
    return null;
  }

  return auth.slice("Bearer ".length);
}

async function processGenerationBatch() {
  let processed = 0;

  for (let index = 0; index < BATCH_LIMIT; index += 1) {
    const submission = await claimNextSubmissionForGeneration();
    if (!submission) {
      break;
    }

    try {
      const replyText = await generateResponse(buildReplyPrompt(submission));
      if (!replyText) {
        throw new Error("Model returned an empty reply");
      }

      await markGenerationSuccess(submission, replyText);
      processed += 1;
    } catch (error) {
      await markGenerationFailure(
        submission,
        "generation_error",
        error instanceof Error ? error.message : "Unknown generation error"
      );
    }
  }

  return processed;
}

async function processDeliveryBatch() {
  let processed = 0;
  const fromEmail = process.env.FROM_EMAIL ?? "";
  const fromName = process.env.FROM_NAME ?? "Verba Non Dicta";

  if (!fromEmail) {
    throw new Error("FROM_EMAIL is not configured");
  }

  for (let index = 0; index < BATCH_LIMIT; index += 1) {
    const submission = await claimNextSubmissionForDelivery();
    if (!submission) {
      break;
    }

    try {
      if (!submission.email) {
        throw new Error("Submission is missing recipient email");
      }

      const resultUrl = buildResultUrl(submission.token);
      const resendResponse = await resend.emails.send({
        from: `${fromName} <${fromEmail}>`,
        to: submission.email,
        subject: "Your private reply is ready",
        text: `Your private reply is ready.\n\nRead it here: ${resultUrl}\n\nThis link is private. If you do not see the page immediately, try opening the link again in the same browser.`,
      });

      if ("error" in resendResponse && resendResponse.error) {
        throw new Error(
          typeof resendResponse.error.message === "string"
            ? resendResponse.error.message
            : "Resend reported a delivery failure"
        );
      }

      const providerId =
        "data" in resendResponse &&
        resendResponse.data &&
        typeof resendResponse.data.id === "string"
          ? resendResponse.data.id
          : "id" in resendResponse && typeof resendResponse.id === "string"
            ? resendResponse.id
          : null;

      await markDeliverySuccess(submission, providerId);
      processed += 1;
    } catch (error) {
      await markDeliveryFailure(
        submission,
        "email_error",
        error instanceof Error ? error.message : "Unknown email error"
      );
    }
  }

  return processed;
}

export async function GET(req: Request) {
  console.log("CRON HIT");

  const secret = process.env.CRON_SECRET;
  const bearerToken = getBearerToken(req);

  if (!secret || bearerToken !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const generated = await processGenerationBatch();
  const delivered = await processDeliveryBatch();

  const stuckThreshold = new Date(Date.now() - 15 * 60 * 1000).toISOString();
  const { data: stuckRecords, error: stuckError } = await supabaseAdmin
    .from('requests')
    .select('id, stripe_session_id, status, processing_started_at')
    .in('status', ['generating_reply', 'sending_email'])
    .lt('processing_started_at', stuckThreshold);

  if (stuckError) {
    return NextResponse.json({ error: stuckError.message }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    generated,
    delivered,
    stuck: stuckRecords ?? [],
  });
}
