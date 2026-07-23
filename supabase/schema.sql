-- Bravo MÃ©moire: personal learning profile and cross-device progress.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  current_level text default 'A1',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.review_items (
  user_id uuid not null references auth.users(id) on delete cascade,
  item_id text not null,
  kind text not null,
  due_at timestamptz not null default now(),
  interval_days numeric not null default 0,
  ease numeric not null default 2.5,
  repetitions integer not null default 0,
  lapses integer not null default 0,
  updated_at timestamptz not null default now(),
  primary key (user_id, item_id, kind)
);

create table if not exists public.learning_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.learning_attempts (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  item_id text not null,
  kind text not null,
  correct boolean not null,
  created_at timestamptz not null default now()
);

create index if not exists review_items_due_idx on public.review_items(user_id, due_at);
create index if not exists learning_attempts_item_idx on public.learning_attempts(user_id, item_id, created_at desc);

alter table public.profiles enable row level security;
alter table public.review_items enable row level security;
alter table public.learning_attempts enable row level security;
alter table public.learning_state enable row level security;

create policy "Users own their profile" on public.profiles for all using (auth.uid() = id) with check (auth.uid() = id);
create policy "Users own their reviews" on public.review_items for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users own their attempts" on public.learning_attempts for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users own their learning state" on public.learning_state for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

