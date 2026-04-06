# Unfinished Conversation

A single-entry product: pay once, write one message, wait, receive a private response link. Built with Next.js App Router, Supabase, Stripe, Resend, and OpenAI.

## Features
- One-time Stripe Checkout payment
- Canonical paid row creation via Stripe webhook
- One-time intake submission gatekeeper
- Async reply generation and private-link email delivery via Vercel Cron
- Tokenized result page and server-side PDF download
- Ops retry/stuck-record visibility endpoint

## Local Development

```bash
npm install
npm run dev
```

Create a `.env.local` file with the values from `.env.example`.

## Supabase Setup

1. Create a new Supabase project.
2. Run `supabase/migrations/20260406_submission_orchestration.sql` or `supabase/schema.sql`.
3. Store your `SUPABASE_URL` or `NEXT_PUBLIC_SUPABASE_URL`, plus `SUPABASE_SERVICE_ROLE_KEY`, in `.env.local`.

> Note: If you enable RLS, do not expose `requests` or `submission_events` to anon users. Server routes use the service role.

## Stripe Setup

1. Create a Stripe product and a one-time price of $27.
2. Put the price ID in `STRIPE_PRICE_ID`.
3. Add a webhook endpoint pointing to `/api/webhook/stripe`.
4. Subscribe the webhook to at least:
   - `checkout.session.completed`
   - `checkout.session.expired`
5. In Stripe dashboard, set:
   - Success URL: `https://your-domain.com/intake?session_id={CHECKOUT_SESSION_ID}`
   - Cancel URL: `https://your-domain.com/start?canceled=1`

## Resend Setup

1. Create a Resend account and verify your domain.
2. Configure SPF/DKIM/DMARC in your DNS.
3. Put the verified sender in `FROM_EMAIL`.
4. Optionally set `FROM_NAME`.

## OpenAI Setup

1. Create an API key.
2. Add it to `OPENAI_API_KEY`.
3. Optionally set `OPENAI_MODEL`.

## Vercel Deploy + Cron

1. Deploy the repo to Vercel.
2. Add all environment variables from `.env.example`.
3. Configure a Cron job to hit:

```
GET https://your-domain.com/api/cron/generate
Authorization: Bearer <CRON_SECRET>
```

Suggested schedule: every 5 minutes.

4. Optional ops endpoint:

```
GET  https://your-domain.com/api/ops/submissions
POST https://your-domain.com/api/ops/submissions
Authorization: Bearer <CRON_SECRET>
```

## Security Notes
- No canonical row exists until payment is verified.
- Intake is only accepted for a paid, unconsumed Stripe session.
- One Stripe session can be consumed only once.
- Cron endpoint is protected by `CRON_SECRET`.
- Ops endpoint is protected by `CRON_SECRET`.
- Response access is via cryptographically random token links.
- Reply text is not sent in the email body.
