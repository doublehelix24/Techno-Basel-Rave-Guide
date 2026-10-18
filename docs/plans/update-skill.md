# Plan: semi-automated event updates

Status: proposed (18 Oct 2026). Nothing in this plan is implemented yet.

## Goal

Keep the guide's event list current with a repeatable, LLM-driven update that the
maintainer triggers manually in Claude Code. The model does research and editorial
writing; a deterministic checker enforces the structural rules in `AGENTS.md`; the
maintainer approves which events go in.

## Look-ahead window

Typical announcement lead times in the Zürich/Basel scene (general knowledge, not
researched per venue):

| Event type | Typical announcement lead |
|---|---|
| Regular club nights (MÄX, Hive, Zukunft; Nordstern, Elysia in Basel) | 2–6 weeks; monthly programs ~4–6 weeks ahead |
| Big headliner club shows / promoter series (e.g. Warehouse) | 2–4 months |
| Hall and arena tours (Halle 622, Hallenstadion, St. Jakobshalle) | 4–9 months |
| Festivals and open airs | 6–10 months, lineups released in phases |
| New Year's Eve | September–October |

Decisions:

- **Full write-ups:** events within a rolling **4-month** window.
- **Radar:** confirmed big shows up to **~6 months** out go on a watchlist, not the page.
- **Cadence:** run the update every **2–3 weeks**, so club nights announced 3–6 weeks
  ahead are caught with useful lead time.
- **Cities:** search **Zürich and Basel**. Basel events can be added to the guide
  even though the title still marks Basel as upcoming; changing that status remains
  the maintainer's call.

## Why a checker is needed

One event touches many places that must stay in sync:

- jump links and the overview row in `public/index.html`
- the ordered `events` array in `public/guide.js`
- the event's detail section (`.facts` with a `TICKETS` row, `.ratings`, sources line)
- the `venues` map, venue image in `public/` and the venue comparison section
- comparison pages (`page12`–`page14`), recommendations (`page15`) and the source
  directory (`page16`)
- "Last updated" and the research-cutoff date
- the prototype snapshot in `public/prototypes/index.html`, which shares `guide.js`

An LLM will occasionally miss one of these. Rules that a script can verify should be
verified by a script.

## Components

### 1. Checker: `scripts/check-guide.mjs`

Dependency-free Node script in the repository root (not served by Netlify). Run with
`node scripts/check-guide.mjs`; exits non-zero with a list of failures. Checks:

- overview rows, jump links, `events` array entries and event section IDs match in
  count and order
- every event date is today or later; end date/time is after start (Europe/Zurich)
- every "CHF (from)" amount has exactly two decimals and links to the same URL as the
  section's "Buy tickets" link
- every event has a source-directory entry
- every venue used in the overview has a `venues` entry, an image file in `public/`
  and a credit
- "Last updated" and the source directory's research cutoff agree
- the prototype snapshot's event IDs and order are compatible with `guide.js`

### 2. Skill: `.claude/skills/update-events/SKILL.md`

Invoked as `/update-events`. References `AGENTS.md` instead of duplicating it. Workflow:

1. **Prune.** Remove past events from every location listed above.
2. **Re-verify kept events.** Prices, sold-out status, lineup and time changes,
   cancellations — against primary sources.
3. **Discover.** Work through `sources.md` for Zürich and Basel. Prefer official
   venue and promoter pages. Ticket sites and Resident Advisor often block automated
   fetching; fall back to the Chrome browser tools for those.
4. **Approval checkpoint.** Present a shortlist: date, city, venue, genre, starting
   price, proposed fit score, source links, and why it fits. The maintainer chooses
   what is added. Rejected and out-of-window items go to `watchlist.md`.
5. **Write.** Add approved events everywhere, update comparisons and
   recommendations, add new venues (photo from the venue or an official partner,
   with credit), update "Last updated".
6. **Check.** `node scripts/check-guide.mjs`, `node --check public/guide.js`,
   `git diff --check`, and a browser pass at 320px, 390px and desktop width,
   including one calendar invite.
7. **Commit, don't push.** Report added, removed, changed (prices, times) and anything
   that could not be verified.

### 3. Skill reference files

Kept next to the skill in `.claude/skills/update-events/`:

- `sources.md` — the discovery list, grouped by city:
  - Zürich: MÄX, Hive, Zukunft, Supermarket, Warehouse ZRH, Kaufleuten, Halle 622,
    Hallenstadion, X-TRA
  - Basel: Nordstern, Elysia, Kaserne, Viertel, Hinterhof, Balz, St. Jakobshalle
  - Cross-city: Resident Advisor (Zürich and Basel areas), Ticketcorner,
    Ticketmaster, major promoters
  - The list is a starting point; verify each source during the first run.
- `taste-profile.md` — genre weights behind the editorial fit scores, derived from
  the scores already on the page, so scoring stays consistent across runs.
- `watchlist.md` — announced events outside the 4-month window (the 6-month radar)
  and rejected events with the reason, so later runs don't re-research them.

## Optional later step

Run the skill as a scheduled cloud agent (`/schedule`) every two weeks and leave a
branch for review. This conflicts with the "never push automatically" rule in
`AGENTS.md` and needs that rule changed first. Manual triggering is the default.

## Implementation order

1. `scripts/check-guide.mjs`, run against the current page until it passes.
2. `sources.md`, `taste-profile.md`, an initial `watchlist.md`.
3. `SKILL.md`.
4. Note the skill and checker in `AGENTS.md` under "Publishing and checks".
5. First real run as a dry run: stop at the approval checkpoint and review the
   shortlist quality before writing anything.
