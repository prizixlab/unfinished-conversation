import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { retryFailedSubmission } from "@/lib/submissions";

export const dynamic = "force-dynamic";

function getBearerToken(req: Request) {
  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) {
    return null;
  }

  return auth.slice("Bearer ".length);
}

function authorize(req: Request) {
  const secret = process.env.CRON_SECRET;
  return Boolean(secret && getBearerToken(req) === secret);
}

export async function GET(req: Request) {
  if (!authorize(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const stuckThreshold = new Date(Date.now() - 15 * 60 * 1000).toISOString();
  const [{ data: failedRows, error: failedError }, { data: stuckRows, error: stuckError }] =
    await Promise.all([
      supabaseAdmin
        .from("requests")
        .select(
          "id, stripe_session_id, status, error_code, error_message, processing_started_at, created_at, updated_at"
        )
        .in("status", ["failed_generation", "failed_email"])
        .order("updated_at", { ascending: false })
        .limit(100),
      supabaseAdmin
        .from("requests")
        .select(
          "id, stripe_session_id, status, error_code, error_message, processing_started_at, created_at, updated_at"
        )
        .in("status", ["generating_reply", "sending_email"])
        .lt("processing_started_at", stuckThreshold)
        .order("updated_at", { ascending: false })
        .limit(100),
    ]);

  if (failedError || stuckError) {
    const errorMessage = failedError?.message || stuckError?.message || "Failed to load records";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }

  const records = [...(failedRows ?? []), ...(stuckRows ?? [])];
  const deduped = Array.from(new Map(records.map((row) => [row.id, row])).values());

  return NextResponse.json({ ok: true, records: deduped });
}

export async function POST(req: Request) {
  if (!authorize(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json()) as {
    submissionId?: string;
    action?: "retry_generation" | "retry_email";
  };

  if (!body.submissionId || !body.action) {
    return NextResponse.json(
      { error: "submissionId and action are required" },
      { status: 400 }
    );
  }

  const targetStatus =
    body.action === "retry_generation"
      ? "queued"
      : body.action === "retry_email"
        ? "reply_generated"
        : null;

  if (!targetStatus) {
    return NextResponse.json({ error: "Unsupported action" }, { status: 400 });
  }

  try {
    const data = await retryFailedSubmission(body.submissionId, targetStatus);
    return NextResponse.json({ ok: true, submission: data });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Retry failed unexpectedly",
      },
      { status: 500 }
    );
  }
}
