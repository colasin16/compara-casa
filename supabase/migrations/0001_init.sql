-- ComparaCasa initial schema
-- Tables: criteria (per-user weighted templates), houses, ratings
-- Security: Row Level Security so each user only accesses their own data.

-- ---------------------------------------------------------------------------
-- criteria: user-defined, weighted aspects reused across houses
-- ---------------------------------------------------------------------------
create table if not exists public.criteria (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  name        text not null,
  weight      numeric(4, 2) not null default 5
                check (weight >= 0 and weight <= 10),
  created_at  timestamptz not null default now(),
  unique (user_id, name)
);

create index if not exists criteria_user_id_idx on public.criteria (user_id);

-- ---------------------------------------------------------------------------
-- houses: a property the user is evaluating
-- ---------------------------------------------------------------------------
create table if not exists public.houses (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  name        text not null,
  address     text,
  notes       text,
  created_at  timestamptz not null default now()
);

create index if not exists houses_user_id_idx on public.houses (user_id);

-- ---------------------------------------------------------------------------
-- ratings: a 0-10 score for one criterion on one house
-- ---------------------------------------------------------------------------
create table if not exists public.ratings (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users (id) on delete cascade,
  house_id      uuid not null references public.houses (id) on delete cascade,
  criterion_id  uuid not null references public.criteria (id) on delete cascade,
  score         numeric(4, 2) not null default 0
                  check (score >= 0 and score <= 10),
  created_at    timestamptz not null default now(),
  unique (house_id, criterion_id)
);

create index if not exists ratings_house_id_idx on public.ratings (house_id);
create index if not exists ratings_criterion_id_idx on public.ratings (criterion_id);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.criteria enable row level security;
alter table public.houses   enable row level security;
alter table public.ratings  enable row level security;

create policy "Users manage own criteria"
  on public.criteria for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users manage own houses"
  on public.houses for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users manage own ratings"
  on public.ratings for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
