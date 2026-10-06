# Big Jo’s Beds — notes for Claude

Read `README.md` for setup and the payment flow, and `brand/CLAUDE.md` for the design and content contract. The kit's rules still apply. The owner has since supplied prices and asked for online checkout, so the "enquiry only" default is lifted, and `COMMERCE_MODE` controls it.

## Rules that matter here
- Name: **Big Jo’s Beds** (curly apostrophe; never "Joe’s"). Tagline: **Best sleep for big people.**
- Use the copy in `src/content/copy.json` verbatim (deck v1.1, plus v1.2 founder story from facts Johannes supplied: 2 m tall, 125 kg, a lifetime looking for a bed he fits on; "Big Jo" is his nickname and the brand is named after him). Don't add founder anecdotes beyond what he has supplied. New commerce wording goes in `src/content/commerce.json` and is a draft for owner review.
- WhatsApp: `business.json → whatsapp` is Johannes's own number (+27 60 961 5091, supplied 6 Oct 2026). It is linked from the contact page, product page and footer through `whatsappHref()`.
- Never invent prices, reviews, warranty, trial or returns terms, delivery promises, certifications or contact details.
- Prices live only in `src/data/catalogue.json`, in cents. Never trust a client-supplied amount.
- Claims in `catalogue.json → claims` stay `publish: false` until the owner approves them: the 250 kg rating, cotton cover and 3–5 days. The owner approved the **20-year warranty** and the **100-day trial, returns no questions asked** on 6 Oct 2026. The supplier quote backs the warranty on the mattress only, so the copy says "mattress warranty". Their wording lives in `commerce.json → assurance` and the two FAQs in `faqExtra`. Trial terms he has given: full refund, free collection, and the 100 days start on delivery. Don't add terms he hasn't given, such as how soon refunds are paid, cancellation before delivery, or what the warranty covers.
- Never mark an order paid outside `processItn()` (`src/lib/itn.ts`). Every PayFast check must pass.
- `/api/payfast/itn` is the only route exempt from the CSRF origin check in `src/middleware.ts`.
- Images: `src/assets/images/` holds concept renders. The kit's own `bed-*.png` files and the renders in `reference/renders-not-used/` show a "BDDS" label typo; don't use them.
- Draft policies live in `src/content/policies/drafts/` and are never published. Drafts mark gaps with **[TO CONFIRM: …]**. Move a file up into `src/content/policies/` only when the owner approves it and every gap is filled; the build fails if a published policy still contains `TO CONFIRM`.
- `reference/` is source material only. Never import or publish from it.
- Icons: use `src/components/Icon.astro` with names from `src/data/icons.json`. They follow one stroke family: 24 grid, 1.75 stroke, round caps, no fills. Always pair an icon with visible or `bj-sr-only` text. No emoji and no third-party icon sets. Run `npm run icons` after changing the set.

## Commands
`npm run dev` · `npm test` · `npm run test:e2e` · `npm run build` (runs the launch check and `astro check` first)

The Playwright version is pinned to 1.56.1 to match the Chromium pre-installed in Claude Code cloud sessions, with an npm override for `playwright-core`.
