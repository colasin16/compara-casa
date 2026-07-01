-- ComparaCasa: house coordinates
-- Adds optional latitude and longitude columns to the houses table so that
-- addresses chosen via the autocomplete can be stored with their precise
-- geolocation. These columns are nullable because existing houses and houses
-- where the user skips the address field will have no coordinates.

alter table public.houses
  add column if not exists latitude  double precision,
  add column if not exists longitude double precision;
