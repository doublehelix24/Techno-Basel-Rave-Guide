# Techno | Zürich | Basel After Dark

This repository is a static event guide hosted on Netlify. Netlify's publish directory is `public/` (also declared in `netlify.toml`). There is no build step or package manager. The deployable site consists of `public/index.html`, `public/guide.css`, `public/guide.js`, `public/techno-circle.png`, and the `public/venue-*` image assets; keep their relative paths working from `public/`.

## Editing the guide

- The permanent site name is “Techno | Zürich | Basel After Dark.” The title cycles through Techno, Zürich, and Basel; Basel is marked as upcoming. Techno Circle Basel is the guide's brand.
- The supplied logo PNG has a dark outer matte. The logo display in `public/guide.css` clips to the colored roundel so it looks clean on light backgrounds; preserve that treatment or use a transparent replacement.
- The page has OS-based dark mode with a saved manual override. Keep the mobile layout, keyboard access, and `prefers-reduced-motion` treatment when changing interactions or animation. Mobile navigation links and controls need at least 44px tap targets. Keep the mobile navigation a text menu without pill/button styling or horizontal scrolling; use two rows on narrow phones.
- The overview rows, jump links, event detail sections, venue comparison, comparisons, and source directory live in `public/index.html`. Keep the venue section after the event details. Calendar data lives in the ordered `events` array in `public/guide.js`; its order must match the overview rows. Each event needs a matching section ID and downloadable calendar invite.
- Calendar times use `Europe/Zurich`, including overnight end dates. Verify schedules, venues, prices, and ticket links against primary event sources before changing facts. Musical fit scores are editorial. Keep the “Last updated” tag accurate when event research changes.
- Display every amount in the overview's “CHF (from)” column with exactly two decimal places, including whole-franc prices. Every “CHF (from)” price must link to the same ticket-sale URL used by that event's “Buy tickets” link in its detail section; for events with multiple ticket categories, keep the price link separate from the expandable category information.
- Each venue has a photo preview sourced from the actual venue or an official event partner, with a visible source credit. Keep the images in `public/`, only reveal them on hover or an explicit expansion, and distinguish Warehouse's pre-opening promotional image from a finished-venue photograph. Overview venue names link to the venue comparison and provide a touch/keyboard-accessible preview.
- The top-right version label and dialog are both in `public/index.html`. **Do not increment the version unless the user explicitly asks.** The current version is 2. Keep the changelog as a cumulative record of meaningful user-facing additions and changes, ordered from biggest feature to smallest, with an emoji for each entry. Make it complete and readable rather than a token summary. Leave out implementation details, internal moves, and bug fixes. Keep the creator credit at the top of the dialog; the current wording is “Created with 🖤🎧 by Felix.”

## Publishing and checks

- Netlify publishes `public/` directly from this repository. Put every site asset needed at runtime inside that folder; repository-root files are not served.
- Preview `public/index.html` at desktop and phone widths after visual changes. Check the animated title/tagline, Zürich's umlaut, the overview links and fit controls, dark mode, and a sample Zürich-time calendar invite when related code changes.
- Commit completed changes. Publishing to the connected Netlify site requires pushing the committed branch to the Git remote; confirm deployment status when that is in scope.
