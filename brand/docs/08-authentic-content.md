# 08 — Making the site feel like a real business

The tone should sound like someone who knows the bed and can answer a straightforward question about it. Use the copy in `content/copy.json`; the readable version is `content/website-copy.md`. These supersede the short sample copy in version 1.0. The updated background is preserved in `content/source/design-brief-background.md`.

## Editorial rules
- Put a useful fact close to every broad claim. “160 × 210 cm” does more work than “generous proportions”.
- Say “dark grey woven fabric”, not “a deeper shade of comfort”.
- Explain the construction by naming layers and measurements. Do not rename foam as proprietary sleep technology.
- Keep the founder story factual. There is no supplied story about a bad night, an expensive mattress failing, a garage prototype, or years of product testing. Do not make one up.
- Use a little humour where it follows naturally from the problem. “Your feet shouldn’t have to hang off the end” is enough. Do not make every section a punchline or slogan.
- Vary paragraph length. Not every section needs an eyebrow, a two-sentence headline, three cards and a call to action.
- Do not manufacture reviews, “trusted by” logos, countdowns, low-stock banners, years of experience, badges or founder quotations.
- Avoid “redefine”, “elevate”, “uncompromising”, “meticulously crafted”, “sleep sanctuary”, “where X meets Y”, and generic promises of life-changing sleep.

## Photograph the real thing
The generated images are useful for choosing a finish. They are not enough for a trustworthy product page. Replace them with sample photography when available. Do not generate workshop scenes, test-lab images or founder portraits and present them as documentary evidence.

| Shot | What to capture | Where to use it |
|---|---|---|
| Full bed, three-quarter angle | The actual mattress and base, including feet, with uncluttered background | Homepage / product hero |
| Side-on bed | Real profile and depth; no wide-angle distortion | Product gallery |
| Both finishes | Same camera position and light; ideally physical swatches side by side | Finish selector |
| Cover and piping | Texture, seam, label and normal small fabric variations | Product detail |
| Base underside | Actual frame, joins and support construction | Explain the heavy-duty base |
| Mattress layers | A real sample or documented cutaway, with verified measurements | Construction section |
| Tape measure | Actual width and length, legible without perspective tricks | Sizing explanation |
| Founder | Johannes at the workshop or beside the actual bed, natural light | Our story |
| Making the bed | Real cutting, sewing or assembly, with the maker’s permission | Production story |

Use a clean, normal room. Daylight, an ordinary wall, a bedside table and a real floor are enough. Do not force Table Mountain, a sculptural lamp and an olive tree into every image. Avoid making everything beige. Keep wrinkles and textile texture that help customers understand what they are buying; remove only temporary distractions.

Show the product without a duvet for the main gallery. When a headboard or linen is included only for styling, say so. A real body can establish scale if the person agrees, without jokes about their size.

## Page rhythm
Homepage: product image + direct introduction; practical dimensions; two finish choices; short founder section; a small set of FAQs. Use the same warm palette and serif, but leave room for plain text. Avoid filling every empty area with a badge, pattern or another rounded card.

Product page: clear image, name, dimensions, selected finish and one next step. Put the layers in a readable table, not an invented exploding 3D diagram. Keep important dimensions as text so they remain accessible and easy to copy.

Story page: a few honest paragraphs and, later, a real founder photograph. No fabricated manifesto or customer narrative. The text can stand on its own until a photograph exists.

## What Claude Code should do
Use the supplied words without “polishing” them into generic luxury copy. Resolve content from stable JSON keys, not duplicated component strings. Keep `publication-notes.json` out of the public render path. Keep real product data separate from editorial copy. Replace concept images only when actual supplied photographs exist; update the alt text and concept caption at the same time.
