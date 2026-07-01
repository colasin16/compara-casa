# ComparaCasa — Landing Page Brief

This document collects the questions we need answered to build a proper landing
page that gives potential users all the information they need. Each section is
answered as fully as the current product allows.

Answers are grounded in what the app actually does today (see `README.md`,
`src/app`, `src/components`, `supabase/migrations`). Where a question is a
business/positioning decision that the code can't settle, it is marked
**❓ NEEDS YOUR INPUT** with a proposed default you can confirm or change.

> **What the product does today (source of truth for the answers below):**
> A responsive web app where you define your own **weighted criteria**, then
> **score** each house/flat 0–10 against them. It computes a **normalized
> weighted final score**, ranks houses, and shows them **side by side**. You
> also get a reusable **checklist**, per-house **pros & cons**, free-form
> **notes**, a **listing link**, and **price + currency**. Addresses use
> **autocomplete geocoding**, and all located houses appear on an interactive
> **map** on the dashboard. Data is **cloud-synced** per user (Supabase + Row
> Level Security). Auth is **email/password** or **guest**. Available in
> **English and Spanish**. Free to use.

---

## 1. The problem  *(most important section)*

- **What problem made you build ComparaCasa?**
  House hunting overloads your memory. After several visits, the details of each
  property blur together and gut-feel wins over the things you said actually
  mattered. ComparaCasa turns "which one felt better?" into a structured,
  weighted score based on *your* criteria.

- **At what point during house hunting does the frustration happen?**
  After the 3rd–4th visit, when properties start blending together, and again at
  the final decision moment, when you have to choose between two or three
  finalists and can't objectively remember how each compared.

- **What are people using today instead?**
  Apple/Google Notes, Excel/Google Sheets, WhatsApp messages to a partner, photo
  camera rolls, listing-portal "favourites", and — mostly — memory.

- **Why are those solutions insufficient?**
  - Notes/WhatsApp: unstructured, no scoring, no ranking, hard to compare.
  - Spreadsheets: you have to build the whole model yourself (columns,
    weighting, normalization, colour scales), it breaks easily, and it's painful
    on a phone right after a visit.
  - Memory: unreliable after a handful of visits; partners remember different
    things.

- **What mistakes does your product prevent?**
  - Forgetting *why* you liked or disliked a property.
  - Letting one flashy feature (or the last house you saw) dominate the decision.
  - Comparing houses on different, inconsistent axes.
  - Losing a partner's input in a scroll of chat messages.

- **Have you personally experienced this problem?**
  **❓ NEEDS YOUR INPUT** — a first-person founder story is the strongest version
  of this section. Please share your own house-hunting anecdote (how many houses,
  what you forgot, what tipped the decision) so we can quote it.

- **Example pain points to feature on the page** (confirm which ring true):
  - "After visiting 8 houses I couldn't remember which one had the bigger kitchen."
  - "My partner and I remembered different things."
  - "Everything started to blend together."

---

## 2. Who is the product for?

**Primary (ideal) customer:**
- First-time home buyers actively visiting properties.
- Couples/partners buying or renting *together* who need a shared, objective view.

**Also a good fit:**
- Families comparing several homes.
- People renting a flat and shortlisting options.

**Who is NOT the customer (today):**
- Real estate agents / professionals managing listings for clients (the app is
  built around one person's/household's own shortlist, not a CRM).
- Property investors needing yield/ROI/financial modelling (not built yet — see
  §19 Future vision).
- Someone comparing a single property (no comparison to make).

> **❓ NEEDS YOUR INPUT** — Confirm the primary target. Proposed default:
> *couples and first-time buyers comparing homes they've visited.*

---

## 3. What is the main promise?

> **Compare every house you visit on the criteria that matter to you, so you can
> choose with confidence instead of relying on memory.**

Alternate one-liner already used on the site:
*"Compare houses and flats and decide with confidence."*

---

## 4. What happens in the product? *(step by step)*

1. **You land on the home page** and either **Get started** (opens the dashboard;
   you can continue as a **guest** with no signup) or **Log in**.
2. **Set up your criteria** (`/dashboard/criteria`) — e.g. Location, Condition,
   Parking, Terrace, Light — and give each an importance **weight (0–10)**.
   There's a one-click "starter criteria" seed if you want to skip setup.
3. **(Optional) Set up a checklist** (`/dashboard/checklist`) of must-have
   features to verify on every visit (Lift, Storage, A/C, Heating…).
4. **Add a house** (name, address, listing link, price + currency) from the
   dashboard. The **address field autocompletes** and stores the precise
   location, so the house appears on the **map**.
5. **Open the house** (`/dashboard/houses/[id]`) and **rate each criterion 0–10**
   with sliders. The **weighted final score updates live** as you drag. Tick the
   checklist items the house has, and jot **pros, cons, and notes** while the
   visit is fresh.
6. **See all houses on a map** on the dashboard, and **Compare**
   (`/dashboard/compare`) — a side-by-side table (criteria × houses) ranked by
   weighted score, with a red→green colour scale and the best house per criterion
   highlighted, plus a comparison of price, pros/cons, notes and checklist
   features.

- **How long until useful information?** As soon as you've scored **two houses**
  against your criteria you get a ranked comparison — realistically a couple of
  minutes per house.

---

## 5. Features *(actual features, not benefits)*

- Create unlimited houses/flats (name, address, listing link).
- **Address autocomplete** (geocoding) that captures the precise location.
- Interactive **map** on the dashboard showing all located houses, with
  price/name tooltips on each marker.
- House **listing link** (URL of the portal listing you found it on).
- House **price + currency** (multi-currency supported).
- Define your own **criteria** with an importance **weight (0–10)**.
- **Rate** each house per criterion (0–10) with sliders.
- **Weighted, normalized final score** (0–10) computed automatically, live.
- Houses **ranked** by final score on the dashboard.
- **Side-by-side comparison table** (criteria × houses) with red→green colour
  scale and **best-in-category highlight**.
- Reusable **checklist** of features, defined once, ticked per house.
- Per-house **pros & cons**, editable, reorderable, and draggable between lists.
- Per-house free-form **notes**, editable and reorderable.
- Comparison of **price, pros/cons, notes and checklist** across houses.
- **Starter templates** (one-click seed) for criteria and checklist.
- **Accounts** via email/password, plus **continue as guest**.
- Password reset / forgot-password flow; email confirmation.
- **Cloud sync** across devices; each user only sees their own data (RLS).
- **Automatic saving** (changes persist via server actions).
- **Responsive / mobile-friendly** web app (works in a phone browser).
- **Light/dark theme**.
- **Bilingual UI: English + Spanish** (language switcher).
- SEO-ready (metadata, sitemap, Open Graph images, structured data).

**Not yet available (so we don't over-promise):** photo uploads per house,
sharing/collaborating with a partner on the *same* account/board, charts (radar),
export.

> **❓ NEEDS YOUR INPUT** — Two commonly expected features are **not built yet**:
> **photo upload** and **real-time sharing with a partner** (today a couple would
> share one login). Do you want these on the roadmap/landing page as
> "coming soon", or omitted entirely?

---

## 6. Benefits *(feature → benefit)*

| Feature | Benefit |
| --- | --- |
| Weighted custom criteria | Decide using exactly the things *you* care about, weighted by how much they matter. |
| Normalized final score | Get one clear, comparable number per house instead of a gut feeling. |
| Side-by-side comparison + colour scale | See at a glance which house wins overall and per criterion. |
| Reusable checklist | Never forget to check the same must-haves on every visit. |
| Pros & cons | Capture the real reasons you liked/disliked a place while it's fresh. |
| Notes | Keep every detail (the noisy street, the great light) attached to the right house. |
| Price + currency | Weigh value against score, in your own currency. |
| Address autocomplete + map | See where every shortlisted house is, and how they cluster across the city, at a glance. |
| Listing link | Jump straight back to the original portal listing when you need the details. |
| Cloud sync + accounts | Pick up where you left off on any device, right after a visit. |
| Continue as guest | Start comparing in seconds, no signup friction. |
| Automatic saving | Never lose a rating or a note. |
| Mobile-friendly | Score a house on your phone while you're standing in it. |
| English + Spanish | Use it comfortably in your own language. |

---

## 7. What makes it different?

Why not just use Excel / Google Sheets / Apple Notes / Notion?

- **The scoring model is already built.** Weights, per-criterion scores,
  normalization and ranking work out of the box — no formulas to design or break.
- **Purpose-built comparison view** with colour scale and best-in-category
  highlighting, instead of a grid you have to format yourself.
- **Fast on mobile, right after a visit** — sliders and quick pros/cons, not a
  fiddly spreadsheet on a phone.
- **Structured, consistent axes** — every house is compared on the same criteria,
  so comparisons are apples-to-apples.
- **Location built in** — address autocomplete plots every house on a map, so you
  see where your shortlist sits without pasting links into a separate maps tab.
- **Zero setup option** — starter templates and guest mode get you going
  immediately; a blank spreadsheet doesn't.

---

## 8. Biggest selling point

**The weighted final score + side-by-side comparison.** It's the one thing that
turns a pile of half-remembered visits into a clear, ranked answer — and the one
thing a notes app or blank spreadsheet can't give you without real work.

> If we show ONE screenshot on the landing page, it's the **comparison table**
> (criteria × houses, colour-scaled, ranked).

---

## 9. Typical user journey

- **How many houses does a normal person compare?**
  Typically **3–10**; some go higher (15–25) in a hot market.
  **❓ NEEDS YOUR INPUT** — confirm the number you want to anchor on (proposed
  default: "most people compare 5–10 homes").
- **How often do they visit?**
  Often several viewings clustered over a few weekends during an active search.
  **❓ NEEDS YOUR INPUT** — confirm typical cadence if you have a view.

---

## 10. Emotional outcome

After using ComparaCasa, users should feel:
- **Confident** in their choice.
- **Organized** — everything about every house in one place.
- **Less overwhelmed / less stressed.**
- **Certain** and **ready to make a decision.**

---

## 11. Pricing

- Today the app is **free**, including a **guest mode** (the home FAQ and the
  structured-data on the landing page both state price €0).
- No subscription, one-time payment, or usage limit is implemented today.

> **❓ NEEDS YOUR INPUT** — Is "**Free**" the intended long-term model, or is this
> free-during-beta with a future **freemium / subscription** plan? This changes
> the CTA and the pricing section. Proposed default for launch: **Free**, with an
> optional "more features coming" note.

---

## 12. Trust

- Available today: **live product screenshots** (dashboard with map, house detail,
  comparison table), and a working **guest mode** so people can try before
  signing up.
- Not available yet: user counts, testimonials, reviews, press mentions, case
  studies.

> **❓ NEEDS YOUR INPUT** — Do you have any of the following we can show: number of
> users, testimonials/quotes, reviews, or a founder story (§1)? If not, we'll
> lead with screenshots + "try as guest" as the trust signals for launch.

---

## 13. Objections *(and answers)*

- **"I only have three houses."**
  Three is exactly when memory fails — even a quick side-by-side makes the choice
  obvious, and it takes two minutes.
- **"I already use Excel / Sheets."**
  ComparaCasa is the spreadsheet you'd have to build — weighting, normalization,
  ranking and a colour-coded comparison, already done and mobile-friendly.
- **"I don't need another app."**
  No install and no signup required — start as a guest in your browser.
- **"I can remember everything."**
  Most people can't after 4+ visits, and partners remember different things.
  ComparaCasa keeps one shared, objective record.
- **"I'm buying with my partner."**
  You can capture both people's pros/cons and criteria weights in one place so
  you decide from the same facts. *(Note: real-time multi-user sharing isn't
  built yet — see §5 / §19.)*

---

## 14. Visuals *(what we can show)*

- **Dashboard** — houses ranked by weighted score.
- **House detail page** — criteria sliders with live final score, checklist,
  pros/cons, notes, price.
- **Comparison table** — criteria × houses, red→green colour scale,
  best-in-category highlight (**the hero visual**).
- **Map** — all located houses as markers on the dashboard, with price/name
  tooltips.
- **Criteria setup** — weighting sliders.
- **Checklist** setup and per-house ticks.
- Light and dark theme variants.

Not available yet: charts/radar graphs (not built).

---

## 15. Call to action

- **Primary CTA:** *Get started* → opens the dashboard (guest-friendly, no signup
  wall). This matches the current home page.
- **Secondary CTA:** *Log in.*

> **❓ NEEDS YOUR INPUT** — Confirm the primary CTA. Options: "Start free",
> "Try as guest", "Create free account", or "Join waitlist" (only if you plan to
> gate access). Proposed default: **"Get started — free, no signup"**.

---

## 16. SEO *(target searches)*

- compare houses / compare apartments / compare flats
- house comparison tool / property comparison tool
- home buying checklist / house viewing checklist
- compare properties / property evaluation tool
- apartment comparison spreadsheet (alternative-to intent)
- how to decide between two houses
- Spanish equivalents: *comparar casas*, *comparar pisos*, *comparador de
  viviendas*, *checklist para ver pisos*, *cómo elegir entre dos casas*.

(The app already ships bilingual metadata, sitemap, Open Graph images and
FAQ/WebApplication structured data.)

---

## 17. Tone

Proposed brand tone: **Practical + Friendly + Modern**, with a **Minimalist**
visual style (matches the current clean UI and green accent).

> **❓ NEEDS YOUR INPUT** — Confirm or adjust. Is it more **Premium** or more
> **Playful** than the above? Proposed default: practical, friendly, modern.

---

## 18. Language

**English and Spanish.** The app already ships a full bilingual UI with a
language switcher, so the landing page should be bilingual too.

---

## 19. Future vision *(2 years)*

The long-term direction (influences positioning today). **❓ NEEDS YOUR INPUT** —
please confirm which of these you actually want to signal on the landing page:

- Photo uploads per house.
- Real-time sharing / collaboration with a partner.
- Richer **map / location context** (transport, schools, crime, points of
  interest) — a basic map of your houses already exists today.
- Charts (radar per house) and export/share of results.
- Budget / value analysis and mortgage comparison.
- Renovation cost estimation.
- AI recommendations ("based on your weights, House B is your best fit").

Proposed near-term roadmap to hint at: **photos**, **partner sharing**, and
**richer map context** — the most requested and most on-brand for the current
product.

---

## 20. One-sentence elevator pitch

> **ComparaCasa helps home buyers and couples compare every property they visit —
> scored on the criteria that matter to them — so they can confidently choose the
> right home without relying on memory or messy spreadsheets.**

---

## Open questions for you *(quick checklist)*

- [ ] §1 — Your personal house-hunting story (first-person founder anecdote).
- [ ] §2 — Confirm the primary target customer.
- [ ] §5 — Include photo upload & partner sharing as "coming soon", or omit?
- [ ] §9 — Number of houses / visit cadence to anchor on.
- [ ] §11 — Pricing model: free forever, free beta, or future freemium?
- [ ] §12 — Any trust assets (users, testimonials, reviews)?
- [ ] §15 — Preferred primary CTA wording.
- [ ] §17 — Confirm brand tone.
- [ ] §19 — Which future features to signal now.
