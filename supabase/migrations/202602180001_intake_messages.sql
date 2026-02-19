create extension if not exists "pgcrypto";

create table if not exists public.intake_messages (
  id uuid primary key default gen_random_uuid(),
  stripe_session_id text,
  name text,
  recipient text,
  message text,
  email text,
  status text default 'pending',
  created_at timestamptz default now()
);

alter table public.intake_messages add column if not exists id uuid;
alter table public.intake_messages alter column id set default gen_random_uuid();

alter table public.intake_messages add column if not exists stripe_session_id text;
alter table public.intake_messages add column if not exists name text;
alter table public.intake_messages add column if not exists recipient text;
alter table public.intake_messages add column if not exists message text;
alter table public.intake_messages add column if not exists email text;
alter table public.intake_messages add column if not exists status text;
alter table public.intake_messages alter column status set default 'pending';
alter table public.intake_messages add column if not exists created_at timestamptz;
alter table public.intake_messages alter column created_at set default now();

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conrelid = 'public.intake_messages'::regclass
      and contype = 'p'
  ) then
    alter table public.intake_messages add constraint intake_messages_pkey primary key (id);
  end if;
end $$;
