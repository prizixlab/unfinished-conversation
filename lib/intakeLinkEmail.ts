import { resend } from "@/lib/resend";
import { supabaseAdmin } from "@/lib/supabase";
import { logSubmissionEvent } from "@/lib/submissionEvents";
import type { SubmissionRow } from "@/lib/submissions";

const FROM_NAME = "Verba Non Dicta";
const SUBJECT = "Your private message link";

export function buildIntakeUrl(stripeSessionId: string) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return `${siteUrl}/intake?session_id=${encodeURIComponent(stripeSessionId)}`;
}

function getProviderId(response: Awaited<ReturnType<typeof resend.emails.send>>) {
  return "data" in response &&
    response.data &&
    typeof response.data.id === "string"
    ? response.data.id
    : "id" in response && typeof response.id === "string"
      ? response.id
      : null;
}

async function hasSentIntakeLinkEmail(submissionId: string) {
  const { data, error } = await supabaseAdmin
    .from("submission_events")
    .select("id")
    .eq("submission_id", submissionId)
    .eq("event_type", "intake_link_email_sent")
    .limit(1);

  if (error) {
    throw error;
  }

  return Boolean(data?.length);
}

export async function sendIntakeLinkEmail(submission: SubmissionRow) {
  if (!submission.email) {
    await logSubmissionEvent({
      submissionId: submission.id,
      stripeSessionId: submission.stripe_session_id,
      eventType: "intake_link_email_skipped",
      actor: "stripe_webhook",
      details: { reason: "missing_customer_email" },
    });
    return { sent: false, providerId: null };
  }

  if (await hasSentIntakeLinkEmail(submission.id)) {
    return { sent: false, providerId: null };
  }

  const fromEmail = process.env.FROM_EMAIL ?? "";
  if (!fromEmail) {
    throw new Error("FROM_EMAIL is not configured");
  }

  const intakeUrl = buildIntakeUrl(submission.stripe_session_id);
  const response = await resend.emails.send({
    from: `${FROM_NAME} <${fromEmail}>`,
    to: submission.email,
    subject: SUBJECT,
    text: `Your private message link is ready.

You can write your message here:
${intakeUrl}

This link can be used once. If you already sent your message, it will no longer be available.

If you do not see future emails from Verba Non Dicta, check your spam or promotions folder and mark the message as “Not spam.”

— Verba Non Dicta`,
  });

  if ("error" in response && response.error) {
    throw new Error(
      typeof response.error.message === "string"
        ? response.error.message
        : "Resend reported an intake link delivery failure"
    );
  }

  const providerId = getProviderId(response);
  await logSubmissionEvent({
    submissionId: submission.id,
    stripeSessionId: submission.stripe_session_id,
    eventType: "intake_link_email_sent",
    actor: "stripe_webhook",
    details: {
      email_provider_id: providerId,
      intake_url: intakeUrl,
    },
  });

  return { sent: true, providerId };
}
