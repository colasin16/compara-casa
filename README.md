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
- `house_points`: `id, user_id, house_id, kind ('pro' | 'con'), body, position, created_at` —
  per-house positives/negatives that users can add, edit, remove, reorder, and
  drag between the two lists on the house detail page.

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

> **Status:** Implemented. `/login` offers **email/password** sign-up and
> sign-in (Supabase Auth), with a "Continue as guest" fallback
> (`signInAnonymously`). The proxy redirects unauthenticated users to `/login`,
> email confirmation links are handled by the `/auth/confirm` route handler
> (`verifyOtp`), and the header shows the signed-in email (or guest id) plus
> sign out.
> **Requires:** in Supabase → Authentication, enable the *Email* provider
> (and *Anonymous sign-ins* for the guest button). Add this app's origin to the
> *Site URL* / *Redirect URLs* so confirmation links resolve to `/auth/confirm`.

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

> **Status:** Implemented. `/compare` shows a side-by-side table (criteria ×
> houses) with houses ordered by weighted final score. Each cell uses a 0–10
> color scale (red → green) and the best house per criterion is highlighted.
> Below the table, positives, negatives, and notes are compared across houses
> side by side. An empty state links to `/criteria` when there is nothing to
> compare yet, and the header gains a "Compare" nav entry.

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
#   enable the "Email" provider in Supabase → Authentication → Sign In / Providers
#   (and "Anonymous sign-ins" if you want the guest button)
#   add this app's origin to Supabase → Authentication → URL Configuration

# 3. Apply the database schema
#   run the SQL files in supabase/migrations/ in order (0001, 0002, …)
#   in the Supabase SQL editor (or via the Supabase CLI)

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
