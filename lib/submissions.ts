import { randomBytes } from "crypto";
import Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabase";
import { logSubmissionEvent } from "@/lib/submissionEvents";
import { detectLanguage } from "@/lib/language";

export const SUBMISSION_STATUSES = [
  "paid",
  "queued",
  "generating_reply",
  "reply_generated",
  "sending_email",
  "completed",
  "failed_validation",
  "failed_generation",
  "failed_email",
  "expired",
] as const;

export type SubmissionStatus = (typeof SUBMISSION_STATUSES)[number];

export type SubmissionRow = {
  id: string;
  stripe_session_id: string;
  payment_status: string;
  session_expires_at: string | null;
  email: string | null;
  sender_name: string | null;
  recipient_name: string | null;
  message_text: string | null;
  message_language: string | null;
  status: SubmissionStatus;
  reply_text: string | null;
  reply_generated_at: string | null;
  email_sent_at: string | null;
  email_delivery_status: string | null;
  email_provider_id: string | null;
  token: string;
  error_code: string | null;
  error_message: string | null;
  is_consumed: boolean;
  is_test: boolean;
  processing_started_at: string | null;
  processing_attempts: number;
  created_at: string;
  updated_at: string;
};

export const MAX_MESSAGE_LENGTH = 8000;
export const MAX_NAME_LENGTH = 120;
export const MAX_EMAIL_LENGTH = 320;
export const MAX_REQUEST_BYTES = 12_000;
export const RESULT_VISIBLE_STATUSES = new Set<SubmissionStatus>([
  "reply_generated",
  "sending_email",
  "completed",
  "failed_email",
]);

function trimmed(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export function normalizeEmail(value: unknown) {
  return trimmed(value).toLowerCase();
}

export function sanitizeSingleLine(value: unknown, maxLength: number) {
  return trimmed(value).replace(/\s+/g, " ").slice(0, maxLength);
}

export function sanitizeMessage(value: unknown) {
  return trimmed(value).replace(/\r\n/g, "\n").slice(0, MAX_MESSAGE_LENGTH);
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= MAX_EMAIL_LENGTH;
}

export function isExpired(isoString: string | null) {
  if (!isoString) return false;
  return Date.parse(isoString) <= Date.now();
}

export function buildResultUrl(token: string) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return `${siteUrl}/r/${token}`;
}

export function createSubmissionToken() {
  return randomBytes(24).toString("base64url");
}

export function stripeSessionToPaidRequest(session: Stripe.Checkout.Session) {
  const completedAt = session.created ? session.created * 1000 : Date.now();
  const intakeExpiresAt = new Date(completedAt + 24 * 60 * 60 * 1000).toISOString();

  return {
    stripe_session_id: session.id,
    payment_status: session.payment_status ?? "paid",
    session_expires_at: intakeExpiresAt,
    email: session.customer_details?.email?.trim().toLowerCase() || null,
    status: "paid" as const,
    is_consumed: false,
    is_test: !session.livemode,
  };
}

export function buildReplyPrompt(request: SubmissionRow) {
  return `Write one complete reply to the message below.

Product rules:
- This is one complete response only.
- This is not therapy.
- Do not present yourself as a therapist, counselor, or crisis resource.
- Do not claim certainty, supernatural knowledge, or direct access to the deceased.
- Do not invite another conversation, follow-up, or future exchange.
- Do not use bullet points unless absolutely necessary.
- Output plain text only.
- Keep the tone calm, emotionally precise, and restrained.

Context:
Sender name: ${request.sender_name ?? ""}
Recipient name: ${request.recipient_name ?? ""}
Language: ${request.message_language ?? "unknown"}

Original message:
${request.message_text ?? ""}

Write the reply now.`;
}

export async function upsertPaidSubmissionFromStripeSession(
  session: Stripe.Checkout.Session
) {
  const values = stripeSessionToPaidRequest(session);
  const existing = await getSubmissionByStripeSessionId(session.id);
  let row: SubmissionRow;

  if (existing) {
    const { data, error } = await supabaseAdmin
      .from("requests")
      .update({
        payment_status: values.payment_status,
        session_expires_at: values.session_expires_at,
        email: existing.is_consumed ? existing.email : values.email,
        is_test: values.is_test,
      })
      .eq("id", existing.id)
      .select("*")
      .single();

    if (error) {
      throw error;
    }

    row = data as SubmissionRow;
  } else {
    const { data, error } = await supabaseAdmin
      .from("requests")
      .insert({
        ...values,
        token: createSubmissionToken(),
      })
      .select("*")
      .single();

    if (error) {
      throw error;
    }

    row = data as SubmissionRow;
  }

  await logSubmissionEvent({
    submissionId: row.id,
    stripeSessionId: row.stripe_session_id,
    eventType: "payment_verified",
    actor: "stripe_webhook",
    toStatus: row.status,
    details: {
      payment_status: row.payment_status,
      session_expires_at: row.session_expires_at,
      is_test: row.is_test,
    },
  });

  return row;
}

export async function getSubmissionByStripeSessionId(sessionId: string) {
  const { data, error } = await supabaseAdmin
    .from("requests")
    .select("*")
    .eq("stripe_session_id", sessionId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return (data as SubmissionRow | null) ?? null;
}

export async function getSubmissionByToken(token: string) {
  const { data, error } = await supabaseAdmin
    .from("requests")
    .select("*")
    .eq("token", token)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return (data as SubmissionRow | null) ?? null;
}

export function parseIntakePayload(body: any) {
  const senderName = sanitizeSingleLine(body?.senderName, MAX_NAME_LENGTH);
  const recipientName = sanitizeSingleLine(body?.recipientName, MAX_NAME_LENGTH);
  const email = normalizeEmail(body?.recipientEmail);
  const messageText = sanitizeMessage(body?.message);
  const stripeSessionId = trimmed(body?.sessionId);

  return {
    senderName,
    recipientName,
    email,
    messageText,
    stripeSessionId,
    messageLanguage: messageText ? detectLanguage(messageText) : null,
  };
}

export async function queuePaidSubmission({
  submission,
  email,
  senderName,
  recipientName,
  messageText,
  messageLanguage,
}: {
  submission: SubmissionRow;
  email: string;
  senderName: string;
  recipientName: string;
  messageText: string;
  messageLanguage: string | null;
}) {
  const { data, error } = await supabaseAdmin
    .from("requests")
    .update({
      email,
      sender_name: senderName,
      recipient_name: recipientName,
      message_text: messageText,
      message_language: messageLanguage,
      status: "queued",
      is_consumed: true,
      error_code: null,
      error_message: null,
    })
    .eq("id", submission.id)
    .eq("status", "paid")
    .eq("is_consumed", false)
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  const row = data as SubmissionRow;
  await logSubmissionEvent({
    submissionId: row.id,
    stripeSessionId: row.stripe_session_id,
    eventType: "intake_accepted",
    actor: "submission_gatekeeper",
    fromStatus: submission.status,
    toStatus: row.status,
    details: {
      message_language: row.message_language,
    },
  });

  return row;
}

export async function claimNextSubmissionForGeneration() {
  const { data, error } = await supabaseAdmin.rpc("claim_next_request_for_generation");
  if (error) {
    throw error;
  }

  const row = Array.isArray(data) && data.length > 0 ? (data[0] as SubmissionRow) : null;
  if (row) {
    await logSubmissionEvent({
      submissionId: row.id,
      stripeSessionId: row.stripe_session_id,
      eventType: "generation_claimed",
      actor: "response_composer",
      fromStatus: "queued",
      toStatus: row.status,
    });
  }

  return row;
}

export async function markGenerationSuccess(submission: SubmissionRow, replyText: string) {
  const timestamp = new Date().toISOString();
  const { data, error } = await supabaseAdmin
    .from("requests")
    .update({
      status: "reply_generated",
      reply_text: replyText,
      reply_generated_at: timestamp,
      processing_started_at: null,
      error_code: null,
      error_message: null,
    })
    .eq("id", submission.id)
    .eq("status", "generating_reply")
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  const row = data as SubmissionRow;
  await logSubmissionEvent({
    submissionId: row.id,
    stripeSessionId: row.stripe_session_id,
    eventType: "generation_succeeded",
    actor: "response_composer",
    fromStatus: submission.status,
    toStatus: row.status,
  });

  return row;
}

export async function markGenerationFailure(
  submission: SubmissionRow,
  errorCode: string,
  errorMessage: string
) {
  const { data, error } = await supabaseAdmin
    .from("requests")
    .update({
      status: "failed_generation",
      processing_started_at: null,
      error_code: errorCode,
      error_message: errorMessage,
    })
    .eq("id", submission.id)
    .eq("status", "generating_reply")
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  const row = data as SubmissionRow;
  await logSubmissionEvent({
    submissionId: row.id,
    stripeSessionId: row.stripe_session_id,
    eventType: "generation_failed",
    actor: "response_composer",
    fromStatus: submission.status,
    toStatus: row.status,
    details: {
      error_code: errorCode,
      error_message: errorMessage,
    },
  });

  return row;
}

export async function claimNextSubmissionForDelivery() {
  const { data, error } = await supabaseAdmin.rpc("claim_next_request_for_delivery");
  if (error) {
    throw error;
  }

  const row = Array.isArray(data) && data.length > 0 ? (data[0] as SubmissionRow) : null;
  if (row) {
    await logSubmissionEvent({
      submissionId: row.id,
      stripeSessionId: row.stripe_session_id,
      eventType: "delivery_claimed",
      actor: "delivery_courier",
      fromStatus: "reply_generated",
      toStatus: row.status,
    });
  }

  return row;
}

export async function markDeliverySuccess(
  submission: SubmissionRow,
  providerId: string | null
) {
  const timestamp = new Date().toISOString();
  const { data, error } = await supabaseAdmin
    .from("requests")
    .update({
      status: "completed",
      email_sent_at: timestamp,
      email_delivery_status: "sent",
      email_provider_id: providerId,
      processing_started_at: null,
      error_code: null,
      error_message: null,
    })
    .eq("id", submission.id)
    .eq("status", "sending_email")
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  const row = data as SubmissionRow;
  await logSubmissionEvent({
    submissionId: row.id,
    stripeSessionId: row.stripe_session_id,
    eventType: "delivery_succeeded",
    actor: "delivery_courier",
    fromStatus: submission.status,
    toStatus: row.status,
    details: {
      email_provider_id: providerId,
    },
  });

  return row;
}

export async function markDeliveryFailure(
  submission: SubmissionRow,
  errorCode: string,
  errorMessage: string
) {
  const { data, error } = await supabaseAdmin
    .from("requests")
    .update({
      status: "failed_email",
      email_delivery_status: "failed",
      processing_started_at: null,
      error_code: errorCode,
      error_message: errorMessage,
    })
    .eq("id", submission.id)
    .eq("status", "sending_email")
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  const row = data as SubmissionRow;
  await logSubmissionEvent({
    submissionId: row.id,
    stripeSessionId: row.stripe_session_id,
    eventType: "delivery_failed",
    actor: "delivery_courier",
    fromStatus: submission.status,
    toStatus: row.status,
    details: {
      error_code: errorCode,
      error_message: errorMessage,
    },
  });

  return row;
}

export async function expireSubmission(
  submission: SubmissionRow,
  actor: "submission_gatekeeper" | "stripe_webhook" = "submission_gatekeeper"
) {
  const { data, error } = await supabaseAdmin
    .from("requests")
    .update({
      status: "expired",
      error_code: "session_expired",
      error_message: "The intake window expired before submission.",
    })
    .eq("id", submission.id)
    .eq("status", "paid")
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  const row = data as SubmissionRow;
  await logSubmissionEvent({
    submissionId: row.id,
    stripeSessionId: row.stripe_session_id,
    eventType: "submission_expired",
    actor,
    fromStatus: submission.status,
    toStatus: row.status,
  });

  return row;
}

export async function retryFailedSubmission(
  submissionId: string,
  targetStatus: "queued" | "reply_generated"
) {
  const allowedCurrentStatus =
    targetStatus === "queued" ? "failed_generation" : "failed_email";

  const { data, error } = await supabaseAdmin
    .from("requests")
    .update({
      status: targetStatus,
      processing_started_at: null,
      error_code: null,
      error_message: null,
    })
    .eq("id", submissionId)
    .eq("status", allowedCurrentStatus)
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  const row = data as SubmissionRow;
  await logSubmissionEvent({
    submissionId: row.id,
    stripeSessionId: row.stripe_session_id,
    eventType: "submission_retried",
    actor: "watchman",
    fromStatus: allowedCurrentStatus,
    toStatus: row.status,
  });

  return row;
}
