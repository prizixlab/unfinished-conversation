import { supabaseAdmin } from "@/lib/supabase";

type LogSubmissionEventInput = {
  submissionId: string;
  stripeSessionId?: string | null;
  eventType: string;
  actor: string;
  fromStatus?: string | null;
  toStatus?: string | null;
  details?: Record<string, unknown>;
};

export async function logSubmissionEvent({
  submissionId,
  stripeSessionId = null,
  eventType,
  actor,
  fromStatus = null,
  toStatus = null,
  details = {},
}: LogSubmissionEventInput) {
  const payload = {
    submission_id: submissionId,
    stripe_session_id: stripeSessionId,
    event_type: eventType,
    actor,
    from_status: fromStatus,
    to_status: toStatus,
    details,
  };

  const { error } = await supabaseAdmin.from("submission_events").insert(payload);
  if (error) {
    console.error("Failed to log submission event", payload, error);
    return;
  }

  console.info("submission_event", payload);
}
