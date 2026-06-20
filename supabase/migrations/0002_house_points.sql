-- ComparaCasa: per-house positives / negatives ("pros vs cons")
-- A house_points row is a single free-text line the user notes for a house,
-- tagged as a positive ('pro') or a negative ('con'). Ordering within each
-- side is stored in `position` so users can freely reorder and move lines
-- between the two lists.

create table if not exists public.house_points (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  house_id    uuid not null references public.houses (id) on delete cascade,
  kind        text not null check (kind in ('pro', 'con')),
  body        text not null check (char_length(body) between 1 and 300),
  position    integer not null default 0,
  created_at  timestamptz not null default now()
);

create index if not exists house_points_house_id_idx
  on public.house_points (house_id);

-- ---------------------------------------------------------------------------
-- Row Level Security: each user only accesses their own points.
-- ---------------------------------------------------------------------------
alter table public.house_points enable row level security;

create policy "Users manage own house points"
  on public.house_points for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
