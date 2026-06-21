-- ComparaCasa: per-house free-form notes ("things to remember")
-- A house_notes row is a single free-text note the user jots down for a house
-- that doesn't fit anywhere else (pros/cons, ratings, the house's own notes
-- field). Ordering is stored in `position` so users can reorder the list.

create table if not exists public.house_notes (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  house_id    uuid not null references public.houses (id) on delete cascade,
  body        text not null check (char_length(body) between 1 and 1000),
  position    integer not null default 0,
  created_at  timestamptz not null default now()
);

create index if not exists house_notes_house_id_idx
  on public.house_notes (house_id);

-- ---------------------------------------------------------------------------
-- Row Level Security: each user only accesses their own notes.
-- ---------------------------------------------------------------------------
alter table public.house_notes enable row level security;

create policy "Users manage own house notes"
  on public.house_notes for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
