create extension if not exists "pgcrypto";

create table if not exists public.requests (
  id uuid primary key default gen_random_uuid(),
  stripe_session_id text not null unique,
  payment_status text not null default 'paid',
  session_expires_at timestamptz,
  email text,
  sender_name text,
  recipient_name text,
  message_text text,
  message_language text,
  status text not null default 'paid',
  reply_text text,
  reply_generated_at timestamptz,
  email_sent_at timestamptz,
  email_delivery_status text,
  email_provider_id text,
  token text not null default encode(gen_random_bytes(24), 'base64url') unique,
  error_code text,
  error_message text,
  is_consumed boolean not null default false,
  is_test boolean not null default false,
  processing_started_at timestamptz,
  processing_attempts integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.requests add column if not exists stripe_session_id text;
alter table public.requests add column if not exists payment_status text not null default 'paid';
alter table public.requests add column if not exists session_expires_at timestamptz;
alter table public.requests add column if not exists email text;
alter table public.requests add column if not exists sender_name text;
alter table public.requests add column if not exists recipient_name text;
alter table public.requests add column if not exists message_text text;
alter table public.requests add column if not exists message_language text;
alter table public.requests add column if not exists status text not null default 'paid';
alter table public.requests add column if not exists reply_text text;
alter table public.requests add column if not exists reply_generated_at timestamptz;
alter table public.requests add column if not exists email_sent_at timestamptz;
alter table public.requests add column if not exists email_delivery_status text;
alter table public.requests add column if not exists email_provider_id text;
alter table public.requests add column if not exists token text;
alter table public.requests add column if not exists error_code text;
alter table public.requests add column if not exists error_message text;
alter table public.requests add column if not exists is_consumed boolean not null default false;
alter table public.requests add column if not exists is_test boolean not null default false;
alter table public.requests add column if not exists processing_started_at timestamptz;
alter table public.requests add column if not exists processing_attempts integer not null default 0;
alter table public.requests add column if not exists created_at timestamptz not null default now();
alter table public.requests add column if not exists updated_at timestamptz not null default now();

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'requests'
      and column_name = 'unfinished_summary'
  ) then
    execute '
      update public.requests
      set sender_name = coalesce(sender_name, unfinished_summary)
      where sender_name is null and unfinished_summary is not null
    ';
  end if;

  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'requests'
      and column_name = 'person_role'
  ) then
    execute '
      update public.requests
      set recipient_name = coalesce(recipient_name, person_role)
      where recipient_name is null and person_role is not null
    ';
  end if;

  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'requests'
      and column_name = 'unsaid_message'
  ) then
    execute '
      update public.requests
      set message_text = coalesce(message_text, unsaid_message)
      where message_text is null and unsaid_message is not null
    ';
  end if;

  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'requests'
      and column_name = 'language'
  ) then
    execute '
      update public.requests
      set message_language = coalesce(message_language, language)
      where message_language is null and language is not null
    ';
  end if;

  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'requests'
      and column_name = 'response_text'
  ) then
    execute '
      update public.requests
      set reply_text = coalesce(reply_text, response_text)
      where reply_text is null and response_text is not null
    ';
  end if;

  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'requests'
      and column_name = 'ready_at'
  ) then
    execute '
      update public.requests
      set reply_generated_at = coalesce(reply_generated_at, ready_at)
      where reply_generated_at is null and ready_at is not null
    ';
  end if;

  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'requests'
      and column_name = 'error'
  ) then
    execute '
      update public.requests
      set error_message = coalesce(error_message, error)
      where error_message is null and error is not null
    ';
  end if;
end;
$$;

update public.requests
set status = case
  when status = 'draft' and stripe_session_id is not null then 'paid'
  when status = 'draft' and stripe_session_id is null then 'failed_validation'
  when status = 'pending' then 'queued'
  when status = 'ready' then 'completed'
  when status = 'failed' then 'failed_generation'
  else status
end;

update public.requests
set token = encode(gen_random_bytes(24), 'base64url')
where token is null;

alter table public.requests
  alter column token set not null,
  alter column status set default 'paid';

alter table public.requests
  drop constraint if exists requests_status_check;

alter table public.requests
  add constraint requests_status_check
  check (
    status in (
      'paid',
      'queued',
      'generating_reply',
      'reply_generated',
      'sending_email',
      'completed',
      'failed_validation',
      'failed_generation',
      'failed_email',
      'expired'
    )
  );

alter table public.requests
  drop constraint if exists requests_consumed_requires_progress_check;

alter table public.requests
  add constraint requests_consumed_requires_progress_check
  check (
    not is_consumed
    or status in (
      'queued',
      'generating_reply',
      'reply_generated',
      'sending_email',
      'completed',
      'failed_generation',
      'failed_email'
    )
  );

create unique index if not exists requests_token_key on public.requests (token);
create unique index if not exists requests_consumed_session_idx
  on public.requests (stripe_session_id)
  where is_consumed = true and stripe_session_id is not null;
create index if not exists requests_status_created_at_idx
  on public.requests (status, created_at);
create index if not exists requests_processing_started_at_idx
  on public.requests (status, processing_started_at);

create table if not exists public.submission_events (
  id bigserial primary key,
  submission_id uuid not null references public.requests(id) on delete cascade,
  stripe_session_id text,
  from_status text,
  to_status text,
  event_type text not null,
  actor text not null,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists submission_events_submission_created_idx
  on public.submission_events (submission_id, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists requests_set_updated_at on public.requests;

create trigger requests_set_updated_at
before update on public.requests
for each row
execute function public.set_updated_at();

create or replace function public.claim_next_request_for_generation()
returns setof public.requests
language plpgsql
security definer
as $$
begin
  return query
  with candidate as (
    select id
    from public.requests
    where status = 'queued'
    order by created_at asc
    limit 1
    for update skip locked
  ),
  updated as (
    update public.requests r
    set
      status = 'generating_reply',
      processing_started_at = now(),
      processing_attempts = coalesce(r.processing_attempts, 0) + 1,
      error_code = null,
      error_message = null
    from candidate
    where r.id = candidate.id
    returning r.*
  )
  select * from updated;
end;
$$;

create or replace function public.claim_next_request_for_delivery()
returns setof public.requests
language plpgsql
security definer
as $$
begin
  return query
  with candidate as (
    select id
    from public.requests
    where status = 'reply_generated'
    order by reply_generated_at asc nulls first, created_at asc
    limit 1
    for update skip locked
  ),
  updated as (
    update public.requests r
    set
      status = 'sending_email',
      processing_started_at = now(),
      error_code = null,
      error_message = null
    from candidate
    where r.id = candidate.id
    returning r.*
  )
  select * from updated;
end;
$$;
