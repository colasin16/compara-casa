# Database migrations

The Supabase schema is owned by the SQL files in this folder. They are the
**single source of truth** — the remote database is only ever changed by
applying a migration through the Supabase CLI.

## Golden rules

1. **Never** run DDL in the Supabase SQL Editor / dashboard. Changes made there
   are not recorded in migration history and silently drift from this repo.
2. Every schema change is a new file in `supabase/migrations/`, committed in the
   same PR as the code that needs it.
3. Migrations are applied with `supabase db push`, never by hand.
4. Never edit a migration that has already been applied to a shared
   environment. Add a new migration instead.

## Day-to-day workflow

```bash
# 1. Create a new migration (opens an empty timestamped SQL file)
npm run db:new add_house_notes

# 2. Write the SQL, then check what is pending vs. the remote
npm run db:status        # supabase migration list

# 3. Apply it to the linked remote project
npm run db:push          # supabase db push

# Useful extras
npm run db:diff          # show schema drift between repo and remote
npm run db:lint          # static checks on the schema
npm run db:reset         # rebuild the LOCAL db from scratch + all migrations
```

> Existing files use a zero-padded prefix (`0001_`, `0002_`, …). `supabase
migration new` creates timestamped files (e.g. `20260620…_name.sql`), which
> sort _after_ the numbered ones and remain correctly ordered. Either prefix is
> fine — just keep them monotonically increasing.

## Conventions for a migration file

- `create table if not exists` and `create index if not exists` for safe reruns.
- Enable RLS and add a `"Users manage own X"` policy keyed on
  `auth.uid() = user_id` (see `0002_house_points.sql`).
- For policies, prefer an idempotent guard so a fresh apply never fails:

    ```sql
    drop policy if exists "Users manage own house notes" on public.house_notes;
    create policy "Users manage own house notes"
      on public.house_notes for all
      using (auth.uid() = user_id)
      with check (auth.uid() = user_id);
    ```

## Recovering from drift (out-of-band changes)

If something was changed outside a migration (e.g. via the SQL Editor), the
remote history and the repo can be reconciled **without** dropping data using
`supabase migration repair`:

```bash
# Mark migrations whose objects already exist as applied (does NOT run them):
supabase migration repair --status applied 0001 0002

# Remove a bogus/duplicate history entry (bookkeeping only, no schema change):
supabase migration repair --status reverted <version>

supabase migration list   # verify Local and Remote now match
supabase db push          # apply anything still pending
```
