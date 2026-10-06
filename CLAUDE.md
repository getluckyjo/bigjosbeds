# Big Jo’s Beds — notes for Claude

Read `README.md` for setup and the payment flow, and `brand/CLAUDE.md` for the design and content contract. The kit's rules still apply. The owner has since supplied prices and asked for online checkout, so the "enquiry only" default is lifted, and `COMMERCE_MODE` controls it.

## Rules that matter here
- Name: **Big Jo’s Beds** (curly apostrophe; never "Joe’s"). Tagline: **Best sleep for big people.**
- Use the copy in `src/content/copy.json` verbatim (deck v1.1). New commerce wording goes in `src/content/commerce.json` and is a draft for owner review.
- Never invent prices, reviews, warranty, trial or returns terms, delivery promises, certifications or contact details.
- Prices live only in `src/data/catalogue.json`, in cents. Never trust a client-supplied amount.
- Claims in `catalogue.json → claims` stay `publish: false` until the owner approves them: the 250 kg rating, warranty, cotton cover and 3–5 days.
- Never mark an order paid outside `processItn()` (`src/lib/itn.ts`). Every PayFast check must pass.
- `/api/payfast/itn` is the only route exempt from the CSRF origin check in `src/middleware.ts`.
- Images: `src/assets/images/` holds concept renders. The kit's own `bed-*.png` files and the renders in `reference/renders-not-used/` show a "BDDS" label typo; don't use them.
- `reference/` is source material only. Never import or publish from it.
- Icons: use `src/components/Icon.astro` with names from `src/data/icons.json`. They follow one stroke family: 24 grid, 1.75 stroke, round caps, no fills. Always pair an icon with visible or `bj-sr-only` text. No emoji and no third-party icon sets. Run `npm run icons` after changing the set.

## Commands
`npm run dev` · `npm test` · `npm run test:e2e` · `npm run build` (runs the launch check and `astro check` first)

The Playwright version is pinned to 1.56.1 to match the Chromium pre-installed in Claude Code cloud sessions, with an npm override for `playwright-core`.
