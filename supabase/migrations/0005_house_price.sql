-- ComparaCasa: core house price + currency
-- Every house now carries a mandatory price together with the currency it is
-- expressed in. Only a curated set of major currencies is supported so the
-- formatting/validation surface stays small and manageable.
--
-- Notes on the NOT NULL backfill: existing rows predate this column, so the
-- new columns are added with defaults (0 / 'EUR') to satisfy the NOT NULL
-- constraint on already-stored houses. New houses always go through the
-- application's validation, which requires a positive, user-supplied price.

alter table public.houses
  add column if not exists price numeric(12, 2) not null default 0
    check (price >= 0);

alter table public.houses
  add column if not exists currency text not null default 'EUR'
    check (currency in (
      'USD', 'EUR', 'GBP', 'JPY', 'CHF', 'CAD', 'AUD', 'CNY'
    ));
