# Techno | Zürich | Basel After Dark

This repository is a static event guide hosted on Netlify. Netlify's publish directory is `public/` (also declared in `netlify.toml`). There is no build step or package manager. The deployable site consists of `public/index.html`, `public/guide.css`, `public/guide.js`, and `public/techno-circle.png`; keep their relative paths working from `public/`.

## Editing the guide

- The permanent site name is “Techno | Zürich | Basel After Dark.” The title cycles through Techno, Zürich, and Basel; Basel is marked as upcoming. Techno Circle Basel is the guide's brand.
- The supplied logo PNG has a dark outer matte. The logo display in `public/guide.css` clips to the colored roundel so it looks clean on light backgrounds; preserve that treatment or use a transparent replacement.
- The page has OS-based dark mode with a saved manual override. Keep the mobile layout, keyboard access, and `prefers-reduced-motion` treatment when changing interactions or animation.
- The overview rows, jump links, event detail sections, comparisons, and source directory live in `public/index.html`. Calendar data lives in the ordered `events` array in `public/guide.js`; its order must match the overview rows. Each event needs a matching section ID and downloadable calendar invite.
- Calendar times use `Europe/Zurich`, including overnight end dates. Verify schedules, venues, prices, and ticket links against primary event sources before changing facts. Musical fit scores are editorial. Keep the “Last updated” tag accurate when event research changes.
- Display every amount in the overview's “CHF (from)” column with exactly two decimal places, including whole-franc prices.
- The top-right version label and dialog are both in `public/index.html`. **Do not increment the version unless the user explicitly asks.** The current version is 2. Keep the changelog as a cumulative record of meaningful user-facing additions and changes, ordered from biggest feature to smallest, with an emoji for each entry. Make it complete and readable rather than a token summary. Leave out implementation details, internal moves, and bug fixes. Preserve the creator credit unless asked to change it.

## Publishing and checks

- Netlify publishes `public/` directly from this repository. Put every site asset needed at runtime inside that folder; repository-root files are not served.
- Preview `public/index.html` at desktop and phone widths after visual changes. Check the animated title/tagline, Zürich's umlaut, the overview links and fit controls, dark mode, and a sample Zürich-time calendar invite when related code changes.
- Commit completed changes. Publishing to the connected Netlify site requires pushing the committed branch to the Git remote; confirm deployment status when that is in scope.
