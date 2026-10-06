# Big Jo’s Beds website

Online shop for Big Jo’s Beds: one product (the 160 × 210 cm Big Jo’s Bed) in two finishes (Flax and Charcoal). Customers can buy the mattress and base set, the mattress only or the base only. Payment is through PayFast, with free delivery in Cape Town.

- **Stack:** [Astro](https://astro.build) on Vercel. Content pages are static. Checkout, order status, contact and the PayFast notification run as server routes.
- **Payments:** PayFast hosted checkout (Instant EFT, Capitec Pay, cards) with a verified ITN.
- **Data:** orders and enquiries in Supabase. Emails through Resend.
- **Design:** the approved design kit in `brand/`, used as-is (tokens, CSS, fonts, logos, copy).

## Run it locally

Needs Node 22+.

```bash
npm install
cp .env.example .env      # defaults: sandbox checkout, orders kept in memory
npm run dev               # http://localhost:4321
```

With the defaults you can click all the way through checkout. You land on PayFast's sandbox, and no money moves. PayFast can't send its payment notification to `localhost`, so a local order stays "We’re confirming your payment". Use a Vercel preview to see the full round trip (below).

## Checks

```bash
npm test             # 70 unit tests (PayFast signing + ITN verification, pricing, delivery area, validation)
npm run test:e2e     # 28 browser tests (all pages at 320–1440px, axe accessibility, checkout, no-JS purchase)
npm run build        # launch check + type check + production build
npm run check:brand  # the design kit's own static check
```

## Commerce modes

Set `COMMERCE_MODE` in the environment.

| Mode | What customers see |
|---|---|
| `enquiry` | No prices and no checkout; "Ask about this bed" goes to the contact form. Use it any time you need to pause sales. |
| `sandbox` (default) | The full shop with a "Test shop" banner. Payments go to the PayFast sandbox. Pages are `noindex`. |
| `live` | Real payments. **The build refuses to run** until every launch input below is supplied (`scripts/check-launch.mjs`). |

## How a payment works

1. **Product page:** the customer picks a finish, an item and a quantity. "Buy now" goes to `/checkout`.
2. **Checkout:** the customer enters their details and delivery address.
   - Postal codes outside the Cape Town ranges in `src/config/business.json` are sent to the enquiry form instead.
   - The price is always recalculated on the server from `src/data/catalogue.json`.
3. **Order created:** a `pending_payment` order is saved, and the customer is sent to PayFast with a signed form.
4. **PayFast notifies us:** PayFast POSTs an ITN to `/api/payfast/itn`. The order becomes **paid** only if all of these hold:
   - the signature (with the passphrase) is correct
   - the request comes from a PayFast IP
   - the merchant ID and amount match the order
   - PayFast's own server confirms the data (`VALID`)

   If anything else fails, the order is marked `needs_review` and you get an email; it is never marked paid. Duplicate ITNs are ignored.
5. **Emails:** the customer gets a confirmation and you get an order alert with the delivery address.
6. **Order page:** PayFast returns the customer to `/order/<reference>`, which shows the status from the database.

## Where things live

| Path | What it is |
|---|---|
| `src/data/catalogue.json` | Items, **prices (in cents)**, finishes, image names, and claims with `publish` flags. The warranty and trial are on; the rest are off |
| `src/config/business.json` | Business details for the footer and legal requirements; Cape Town postal-code ranges |
| `src/content/copy.json` | Website copy v1.1, verbatim from the copy deck |
| `src/content/commerce.json` | Checkout, order and email copy (draft for owner review) |
| `src/content/policies/*.md` | Policy pages. A file becomes a page and a footer link. No file, no page |
| `src/lib/payfast.ts`, `src/lib/itn.ts` | PayFast signing and ITN verification |
| `supabase/migrations/0001_init.sql` | `orders` and `enquiries` tables (RLS on) and an `orders_to_make` view |
| `src/data/icons.json` | The Big Jo’s line icons (see "Icons" below) |
| `brand/` | The design kit, unchanged. `src/styles/brand.css` is a copy with font and pattern paths adjusted |
| `reference/` | Supplier quote, voice notes, competitor photo and rejected renders. Never built (see its README) |

## Current setup (6 Oct 2026)

- **Vercel project:** `bigjosbeds` (team "johannes-7130's projects"), linked to this repo.
  - Settings: functions in Dublin (`dub1`), Node 22.
  - Env: `COMMERCE_MODE=sandbox` and `SUPABASE_URL` are set.
  - Every push to a branch builds a deployment. Vercel Authentication protects all `*.vercel.app` URLs; you can open them while logged in to Vercel.
- **Supabase project:** "Big Jo's Beds" (`cyafpzrvzlpowociybiv`, eu-west-1). The schema from `supabase/migrations/0001_init.sql` is applied. It holds no data yet.

**To finish the sandbox round trip:**
1. **Add the secret key.** In Supabase → Project Settings → API Keys, copy the **secret** key (`sb_secret_…`, or the legacy `service_role` key). Add it in Vercel as `SUPABASE_SERVICE_ROLE_KEY`, type Sensitive, for Preview and Production.
2. **Let PayFast reach the site.** Vercel → Project → Settings → Deployment Protection: set Vercel Authentication to "Only Preview Deployments" or turn it off while you test. PayFast's notification is a server call, so it can't log in to Vercel. A custom production domain is never protected.
3. **Redeploy** from the Vercel dashboard (or push any commit).
4. **Buy a bed** on the deployment URL using the PayFast sandbox test buyer. The order should turn **paid** in the `orders` table. Emails start once Resend is configured.

## Logo

`public/logos/big-jos-primary.svg` is the master logo: Johannes's refined vector version, supplied 6 Oct 2026, with a Clay wordmark and an Ink "BEDS". Use it for everything: the site, emails, packaging, socials and print.

- **Variants:** `big-jos-bone.svg` (for dark backgrounds, used in the footer), `big-jos-clay.svg` and `big-jos-ink.svg` are generated from the master by `npm run logos`. Re-run it whenever the master changes.
- **Favicon:** `public/favicon.svg` is the logo's own "J" in Bone on a Clay tile.
- **On the site:** shown at 190 × 64 px (150 px wide on phones).
- **Superseded:** the kit's logos in `brand/assets/logos/` are the older pixel-traced versions. Don't use them.

## Icons

20 line icons drawn for this brand, following the kit's rule of one 1.5–2 px stroke family:
- **Style:** 24 × 24 grid, 1.75 stroke, round ends, no fills. They take the text colour, and Clay is used for accents.
- **Product facts:** size, layers (firm), depth, cape-town (Table Mountain).
- **Shopping:** price, delivery, secure, payment, check, returns (the 100-day trial), warranty.
- **Status:** done, pending, alert, info.
- **Navigation:** ask, chat (WhatsApp, drawn generically rather than as the WhatsApp logo), menu, arrow-right, arrow-down.

They replace two-line "label + detail" copy: hero facts, specs, delivery and payment notes, error and status messages. The deck's detail text stays in the page for screen readers.

- On the site: `<Icon name="delivery" />` (`src/components/Icon.astro`). Icons are hidden from screen readers, so always pair one with text.
- Elsewhere (packaging, socials, Figma): standalone SVGs in `public/icons/`. Regenerate them with `npm run icons` after editing `src/data/icons.json`.

## Go live: what is still needed

1. **Make this GitHub repository private.** It is public, and `reference/` includes supplier pricing and bank details.
2. **PayFast:** the shop uses the **Get Lucky Golf** PayFast merchant account (owner instruction, 6 Oct 2026). In Vercel, copy `PAYFAST_MERCHANT_ID`, `PAYFAST_MERCHANT_KEY` and `PAYFAST_PASSPHRASE` from the `get-lucky-golf` project into `bigjosbeds`. Set them for **Production only**, as Sensitive. Test mode never uses these: it always uses PayFast's public sandbox, or `PAYFAST_SANDBOX_*` if set. So they are safe to add before launch. Each payment sends its own `notify_url`, so Big Jo’s payment notifications never reach the Get Lucky app. Check that Instant EFT and Capitec Pay are enabled on that account.
3. **Supabase:** create a project and run `supabase/migrations/0001_init.sql` in the SQL editor. Add `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to Vercel. Paid orders appear in the `orders_to_make` view.
4. **Resend:** `bigjosbeds.co.za` is added in Resend and waiting on three DNS records at the domain's DNS host: TXT `resend._domainkey`, CNAME `rsend` and CNAME `send`. The values are in Resend → Domains. Then add these to Vercel:
   - `RESEND_API_KEY`: a sending-only key restricted to `bigjosbeds.co.za`
   - `EMAIL_FROM`, e.g. `Big Jo’s Beds <orders@bigjosbeds.co.za>`
   - `OWNER_EMAIL`: where order alerts go. Customer replies go there too.
5. **Domain:** connect it in Vercel and set `PUBLIC_SITE_URL`.
6. **Business details (ECTA section 43)** in `src/config/business.json`: legal name, registration number, physical address and email. The phone is set: +27 60 961 5091, which is also the WhatsApp number.
7. **Policies** as Markdown in `src/content/policies/`, each starting with `---\ntitle: …\n---`:
   - `terms-of-sale.md`: **drafted** in `src/content/policies/drafts/`. Fill in its `[TO CONFIRM: …]` gaps (legal details, VAT, delivery-day needs, warranty cover), then move it up a folder
   - `delivery-and-returns.md`: **published** (owner approved, 6 Oct 2026). It covers delivery and the 100-day trial: the trial starts on delivery, collection is free and the refund is full. It also covers refunds within 30 days, cancellation any time before delivery, and how refunds are paid through PayFast
   - `warranty.md`: what the 20-year mattress warranty covers and how to claim, based on PBS’s written terms. Say whether the base is covered (the PBS quote only lists the warranty on the mattress)
   - `privacy.md`: **drafted** POPIA notice in `src/content/policies/drafts/`, written from the site's real data flows (checkout, enquiries, PayFast, Supabase, Vercel, Resend, WhatsApp). Gaps: legal details, Information Officer, the bed maker's name, provider data agreements, retention periods.
   - The build refuses any published policy that still contains `TO CONFIRM`
8. **Decisions:**
   - Confirm the delivery postal-code ranges against PBS's 55 km zone.
   - Confirm the final product name.
   - Decide whether to publish the 250 kg rating, cotton cover and production days. Each has a `publish` flag in `catalogue.json`. The 20-year mattress warranty and 100-day trial are published (owner approval, 6 Oct 2026).
   - Review the draft wording in `commerce.json`.
9. **Founder photo:** done. Johannes's studio portrait is at `src/assets/images/founder.jpg`, cropped to 4:5 with the backdrop warmed toward the site's neutrals. `src/lib/founder.ts` shares it between two pages. On the story page it sits beside the opening lines, and on the home page it sits in the founder section. In both places it fills the height of the text beside it. To swap it, replace that file with another real photo (4:5 works best). Don't use a generated portrait.
10. **Photos:** replace the concept renders in `src/assets/images/` with photos of the real bed, using the same file names, and update the alt text in `catalogue.json`.
11. Set `COMMERCE_MODE=live` and redeploy. The build lists anything still missing.

### Test the full round trip on a Vercel preview first

Deploy with `COMMERCE_MODE=sandbox` and real Supabase variables.

**Turn off Vercel Deployment Protection for previews** (or add a protection bypass), otherwise PayFast's notification can't reach `/api/payfast/itn`.

Then buy a bed using the PayFast sandbox test buyer. The order should turn **paid** in Supabase and both emails should arrive.
