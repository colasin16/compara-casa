-- ComparaCasa: house link
-- Removes the short `notes` column from the houses table (replaced by the
-- per-house house_notes feature) and adds an optional `link` column so users
-- can store the URL of the listing page they found the house on.

alter table public.houses
  drop column if exists notes,
  add column if not exists link text;
