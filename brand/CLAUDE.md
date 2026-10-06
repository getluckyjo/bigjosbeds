# Big Jo’s Beds — website implementation contract

Build from this kit. It is the approved visual direction translated into a framework-neutral website design system, not a finished shop.

## Read first, in order
1. `README.md` for installation and asset locations.
2. `docs/01-brand.md`, `docs/02-tokens.md`, `docs/03-components.md`.
3. `docs/04-website-blueprint.md` and `docs/05-content-and-claims.md`.
4. `content/product.json`: distinguish brief-supplied specifications from missing or unverified commercial details.
5. Read `content/copy.json` and `docs/08-authentic-content.md`. Version 1.1 copy supersedes earlier sample phrases. `content/publication-notes.json` is internal and must not render automatically.
6. Open `index.html`, `examples/home.html`, and `examples/product.html` for the intended visual and interaction quality.

## Preserve these decisions
- Name: **Big Jo’s Beds**. Never “Joe’s”. Tagline: **Best sleep for big people.**
- Warm Bone surfaces, Clay primary actions, Ink copy, Flax and Charcoal product finishes.
- Use included outlined SVG wordmarks. Do not substitute live text, invent another icon, stretch the logo or reconstruct it with the heading font.
- Headings: DM Serif Display, weight 400. Body/UI: DM Sans, 400/500/600. Both are included with licence files. Serif italic is not bundled; do not synthesize it.
- Use `styles/brand.css` and `tokens/tokens.css` as the implementation baseline. `tokens/tokens.json` is the token source. All classes are `bj-` prefixed.
- Warm editorial commerce: large product photography, generous space, short direct copy, restrained cards, 4px controls and 8px cards. Avoid generic SaaS gradients, blue/purple accents, glossy UI, heavy shadows, excessive pills, emojis and discount banners.
- Respect the charcoal material treatment: dark grey woven side panels and base, tonal stripes, cream sleeping top and piping, bone logo label. Charcoal is a product finish, not a dark-mode theme.
- The stripes are an accent, never a busy background behind text.

## Build behaviour
- Inspect the existing repository before choosing a framework; keep its framework, router, package manager and conventions. For a new repository choose a simple maintained stack appropriate to the requested site. Do not upgrade dependencies needlessly.
- Keep actual catalogue data separate from presentation. Use the supplied JSON as a starter, not hard-coded page prose.
- Implement finish selection as native radio inputs with visible labels and image + text updates. Selected finish must carry into enquiries and any future basket.
- Use one primary CTA per section. In the current data state, use an enquiry flow, not simulated checkout. Do not display an “Add to cart” button until pricing, availability and checkout are real.
- Use progressive enhancement and native `<details>` for FAQs. Keep layouts usable without JS. Code here is framework-neutral; translate it into components if the repository warrants it.
- All input labels must be visible. Include visible focus, keyboard operation, meaningful alt text and reduced-motion support. Target WCAG 2.2 AA; verify the complete implementation rather than assuming this kit confers compliance.
- At 320–767px use one column; at 768–1099px use compact two-column layouts where they fit; at 1100px+ use the full editorial composition. Never hide key product facts on mobile.
- Do not publish a demo form as an actual contact form. Connect it to a real approved destination, handle submission success/error, and disclose storage only as applicable.

## Claims, assets and publishing
- Brief-supplied: 160 × 210 cm; firm; about 25cm depth; heavy-duty matching base; Cape Town production; 3–5 working-day production target. Treat the production time as a target to confirm, not a delivery promise.
- 250kg per person is a supplied design rating pending manufacturer substantiation. Do not publish it as independently tested, certified or guaranteed.
- Do not invent price, VAT treatment, discounts, financing, reviews, warranty, trials, returns, stock counts, certifications, delivery regions, company contacts or payment providers.
- Use null for missing values. Ask the owner for commercial decisions only when needed; you can complete reversible layout work using labelled internal placeholders.
- AI product renders are concept imagery. They do not verify construction, cotton content, dimensions or final manufactured appearance. Headboard, pillows and room accessories are styling only; inclusion is unconfirmed. No product illustration should imply they are supplied.
- For a public launch, use verified product facts and current approved commercial policies. Do not expose internal “needs confirmation” notes to customers; omit unavailable claims and routes until resolved.
- Never pull the founder’s unrelated personal facts into brand copy. Founder name and Cape Town background in the brief are the relevant facts here.

## Definition of done
- Home, product, story, FAQ and contact layouts follow `docs/04-website-blueprint.md`.
- Both finish choices update the image, visible name and submitted product configuration.
- No broken asset paths; fonts are locally served; image dimensions are set; below-fold images are lazy loaded. Produce responsive WebP/AVIF assets in the website build pipeline while retaining source PNGs here.
- Keyboard and touch flows work; no horizontal page overflow at 320/390/768/1440px; no unexpected external requests from the kit.
- Real forms/checkout are tested against the actual integration, or clearly reported as unfinished; no fake success messages.
- Build/lint checks appropriate to the repository pass. Report what was built, what was checked and the precise missing commercial inputs.

## Content update — v1.1
Use the complete Home, Product, Our Story, FAQs and Contact copy supplied in `content/copy.json`. Do not rewrite it into generic luxury language. All five example pages are now supplied in `examples/`. The founder story contains no invented personal experience or quotations. Keep source and publication notes internal. Preserve finish selection in the enquiry link and contact form.
