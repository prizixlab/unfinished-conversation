# Verba Non Dicta Submission Workflow

## Trigger
- Stripe confirms a completed, paid Checkout Session via the canonical webhook at `/api/webhook/stripe`.

## Inputs
- Stripe session ID
- Stripe payment status
- Stripe customer email when available
- Intake payload from `/api/intake/submit`
- OpenAI-generated reply text
- Resend delivery response

## Outputs
- One canonical row in `public.requests`
- One optional audit trail in `public.submission_events`
- One private email containing a tokenized result link
- One controlled result page at `/r/[token]`

## Canonical Flow
1. Stripe webhook verifies signature and creates or updates a paid `requests` row.
2. Intake gatekeeper validates the paid session and atomically updates that row from `paid` to `queued`, marking it consumed.
3. Cron worker atomically claims one queued row, generates one reply, and stores it as `reply_generated`.
4. Cron worker atomically claims one `reply_generated` row, sends a private-link email, and marks the row `completed`.

## Allowed Statuses
- `paid`
- `queued`
- `generating_reply`
- `reply_generated`
- `sending_email`
- `completed`
- `failed_validation`
- `failed_generation`
- `failed_email`
- `expired`

## Failure Statuses
- `failed_validation`
- `failed_generation`
- `failed_email`
- `expired`

## Security Rules
- No canonical submission row exists until payment is verified.
- `/api/intake/submit` is the only canonical intake write path.
- `/api/webhook/stripe` is the only canonical Stripe webhook path.
- Intake accepts only Stripe session IDs, never internal UUIDs.
- Intake must verify Stripe payment server-side and update only an unconsumed `paid` row.
- `stripe_session_id` is unique and can only be consumed once.
- Sensitive ops routes require `CRON_SECRET` bearer auth.
- Stripe webhook signatures must be verified before any state mutation.
- Reply emails must contain only a private link, never the reply body.
- Token access is the primary delivery surface and must stay private.

## Definition Of Done
- A paid user reaches `/intake`.
- Intake validation succeeds and stores the message on the paid row.
- The row moves to `queued`.
- Exactly one reply is generated.
- Exactly one private-link email is sent.
- The same paid Stripe session cannot be consumed twice.
- The record reaches `completed`.
