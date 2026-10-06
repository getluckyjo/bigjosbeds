# 04 — Website blueprint

## Navigation and routes
| Route | Purpose | Primary action |
|---|---|---|
| `/` | Position the brand and introduce the product | Explore the bed |
| `/beds/big-jos-bed` | Detail, dimensions and finish selection | Enquire about this bed |
| `/our-story` | Founder motivation and Cape Town origin | Explore the bed |
| `/faqs` | Fit, product, manufacture and buying questions | Ask a question |
| `/contact` | Real enquiry form when connected | Send enquiry |

Policy routes belong in the footer after the actual text is provided. No empty legal pages. Add a cart route only once real commerce requirements exist.

## Homepage sequence (v1.1)
Use the exact section copy in `content/copy.json` rather than earlier sample lines.
1. Product hero: “A bed you fit in.” Exact size, firm feel, matching base, Cape Town production. CTA: Meet the bed.
2. The practical problem: feet off the end, mattress support and the base. Dimensions in plain text.
3. Flax and Charcoal finish choice with direct material descriptions.
4. Three mattress layers, described without invented technology.
5. Short, factual founder section; no fabricated first-person anecdote.
6. Three useful FAQs with a link to the full FAQ page.
7. Room-fit prompt and real enquiry route.
8. Footer with real contact/policy details only.

## Product page
Breadcrumbs → two-column image / details. Details: H1 “The Big Jo’s Bed” (working product name), concise description, dimensions and firmness, finish selector, inclusions clarification, enquiry CTA. If price is approved later, place it before the selector; format ZAR consistently with agreed VAT treatment. Preserve selected finish in a URL parameter or application state and in enquiry payloads.

Below the fold: dimensions; layers (180mm reinforced high-density support core, 50mm ultra-high-density foam, 20mm latex comfort layer, brief-supplied); material/finish detail; production information; FAQ. The approximately 250mm depth follows the stated layers; verify actual finished thickness before a diagram claims manufacturing precision.

Do not automatically call 160 × 210cm a standard queen. Use the exact dimensions and explain compatible linen requirements after confirmation. Do not imply headboard/linen are included because they appear in renders.

## Our story
Use supplied facts only: founded by Johannes le Roux in Cape Town; aimed at people who have outgrown standard beds. A short founder note can be drafted, but any first-person story or quote needs his sign-off. No medical, family or unrelated business details.

## Metadata and SEO
Suggested title: “Big Jo’s Beds | Best sleep for big people”. Description: “Meet Big Jo’s Beds: premium beds for big and tall people, with Flax and Charcoal finish options.” Use semantic headings and descriptive links. Do not publish offer/aggregate-rating structured data without real price, currency, availability and reviews. Add canonical URLs only after the real domain is known.

## Launch inputs still needed
Price and VAT; available purchase configurations; actual SKU/product name; physical weight-rating substantiation; confirmed fabric/top construction; base/headboard inclusion; lead times; delivery regions/costs; warranty, returns and any trial terms; contact destination; payment/checkout provider if selling online; approved policy copy; final manufacturing photos.
