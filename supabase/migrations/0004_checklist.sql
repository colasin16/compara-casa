-- ComparaCasa: checklist (per-user item templates checked per house)
-- A checklist_items row is a single thing the user wants to verify on a house
-- (e.g. "Lift", "Storage room"). Like criteria, the list is defined once per
-- user and reused across every house. A house_checks row records, per house,
-- whether that house has the item.

-- ---------------------------------------------------------------------------
-- checklist_items: user-defined features reused across houses
-- ---------------------------------------------------------------------------
create table if not exists public.checklist_items (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  name        text not null check (char_length(name) between 1 and 60),
  created_at  timestamptz not null default now(),
  unique (user_id, name)
);

create index if not exists checklist_items_user_id_idx
  on public.checklist_items (user_id);

-- ---------------------------------------------------------------------------
-- house_checks: whether one house has one checklist item
-- ---------------------------------------------------------------------------
create table if not exists public.house_checks (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  house_id    uuid not null references public.houses (id) on delete cascade,
  item_id     uuid not null references public.checklist_items (id) on delete cascade,
  checked     boolean not null default false,
  created_at  timestamptz not null default now(),
  unique (house_id, item_id)
);

create index if not exists house_checks_house_id_idx
  on public.house_checks (house_id);
create index if not exists house_checks_item_id_idx
  on public.house_checks (item_id);

-- ---------------------------------------------------------------------------
-- Row Level Security: each user only accesses their own rows.
-- ---------------------------------------------------------------------------
alter table public.checklist_items enable row level security;
alter table public.house_checks    enable row level security;

drop policy if exists "Users manage own checklist items" on public.checklist_items;
create policy "Users manage own checklist items"
  on public.checklist_items for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users manage own house checks" on public.house_checks;
create policy "Users manage own house checks"
  on public.house_checks for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
