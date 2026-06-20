# ComparaCasa

A responsive web app where users score and compare houses using their own **weighted criteria**.

Users define the aspects that matter to them (location, condition, parking, terrace, lighting/orientation, etc.), assign each an importance **weight**, then rate every house against those criteria. The app computes a normalized weighted score so the things you care about most drive the final result.

## Core concept

- A user defines their own **criteria** (e.g. Location, Condition, Parking, Terrace, Lighting), each with a 0–10 importance **weight**.
- For each **house**, the user gives each criterion a 0–10 **score**.
- The house's **final score** = weighted average, normalized to 0–10:

  ```
  final = Σ(score_i × weight_i) / Σ(weight_i)
  ```

- Houses can be ranked and compared side by side.

## Decisions

- **Platform:** Responsive web app (works on mobile browsers).
- **Users:** Multi-user with accounts, cloud-synced data.

## Recommended stack

- **Frontend + Backend:** Next.js (App Router) + TypeScript + React.
- **UI:** Tailwind CSS + shadcn/ui components.
- **Auth + Database + Sync:** Supabase (Postgres, built-in Auth, Row Level Security).
- **ORM/queries:** Supabase client (or Drizzle for typed SQL).
- **Forms/validation:** React Hook Form + Zod.
- **Hosting:** Vercel (frontend) + Supabase (managed backend).
- **Testing:** Vitest + React Testing Library; Playwright for E2E.

Why: a single TypeScript codebase, free-tier friendly, auth + cloud sync nearly out of the box, and Row Level Security guarantees each user only sees their own data.

### Alternative stack

Next.js + Prisma + Postgres (Neon) + Auth.js — more manual control if you'd rather not use Supabase.

## Data model

- `users` — managed by Supabase Auth.
- `criteria` (user-level templates): `id, user_id, name, weight (0–10), created_at`.
- `houses`: `id, user_id, name, address, notes, created_at`.
- `ratings`: `id, house_id, criterion_id, score (0–10)`, unique on (house_id, criterion_id).

Design choice: criteria are defined once per user and reused across houses, so houses are
compared on the same axes. New criteria can be added later; houses simply have no rating yet.

## Development plan

### Phase 1 — Foundation
- Init Next.js + TypeScript + Tailwind + shadcn/ui.
- Create Supabase project; configure env vars.
- Set up DB schema (tables above) + RLS policies (user owns their rows).
- App layout, navigation, base theme.

### Phase 2 — Auth
- Email/password (and optionally Google) sign-up / login / logout via Supabase Auth.
- Protected routes; session handling; redirect unauthenticated users.

> **Status:** Implemented with **anonymous (guest) auth only** for fast iteration.
> `/login` offers a "Continue as guest" button (`signInAnonymously`), the proxy
> redirects unauthenticated users to `/login`, and the header shows the guest
> session + sign out. Real email/OAuth login is deferred.
> **Requires:** enable *Anonymous sign-ins* in Supabase → Authentication → Sign In / Providers.

### Phase 3 — Criteria management
- CRUD for criteria with name + weight (0–10 slider).
- Validation (unique names, weight range).
- Optional starter template (Location, Condition, Parking, Terrace, Lighting).

> **Status:** Implemented. `/criteria` lists criteria (sorted by weight), with an
> add form, inline edit, and delete — all via Server Actions with Zod validation.
> Empty state offers a one-click "Add starter criteria" seed. Duplicate names are
> rejected (DB unique constraint surfaced as a friendly error).

### Phase 4 — Houses & scoring
- CRUD for houses (name, address, notes).
- House detail page: rate each criterion 0–10 (sliders).
- Live weighted final score with breakdown per criterion.

> **Status:** Implemented. `/dashboard` lists houses ranked by weighted score with
> an add form; `/houses/[id]` rates each criterion with sliders, shows a live
> final score (updates as you drag), and persists each rating on commit. House
> edit (inline) and delete included.

### Phase 5 — Comparison & ranking
- Houses list sorted by final score.
- Side-by-side comparison table (criteria × houses).
- Visual cues (color scale, best-in-category highlight).

### Phase 6 — Polish
- Empty states, loading/skeletons, mobile responsiveness.
- Edit weights → scores recompute everywhere.
- Optional: charts (radar per house), export/share.

### Phase 7 — Quality & deploy
- Unit tests for scoring logic; component tests; one E2E happy path.
- Deploy to Vercel + Supabase; seed demo data.

## Key edge cases

- All weights = 0 → avoid divide-by-zero (treat as unweighted average or block save).
- Criterion with no rating on a house → exclude from denominator or treat as unrated.
- Deleting a criterion → cascade-delete its ratings.

## Local setup

```bash
# 1. Install dependencies
npm install

# 2. Configure Supabase
cp .env.local.example .env.local
#   then fill in NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
#   also enable "Anonymous sign-ins" in Supabase → Authentication → Sign In / Providers

# 3. Apply the database schema
#   run supabase/migrations/0001_init.sql in the Supabase SQL editor
#   (or via the Supabase CLI)

# 4. Start the dev server
npm run dev
```

### Project structure (Phase 1)

```
src/
  app/                 App Router pages (landing, dashboard)
  components/          UI + shared components (shadcn/ui under ui/)
  lib/
    supabase/          browser + server clients, proxy session helper
    scoring.ts         weighted-score calculation
    types.ts           shared domain types
  proxy.ts             auth session refresh (Next 16 renamed middleware → proxy)
supabase/
  migrations/          SQL schema + RLS policies
```

> **Note:** This project uses Next.js 16, where the `middleware` file convention
> was renamed to `proxy`. See `AGENTS.md` — always consult the docs bundled in
> `node_modules/next/dist/docs/` before writing framework code.
