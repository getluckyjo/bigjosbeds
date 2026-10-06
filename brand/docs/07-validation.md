# 07 — Validation and launch checklist

## Completed in this handoff
- Local HTML and CSS asset references checked for existence.
- JSON files parsed and colour tokens checked against CSS.
- SVG assets parsed as XML; primary logo rendered for visual inspection.
- Main text pairs measured at >= 4.5:1; interactive boundary colour >= 3:1 against Paper. See the included numeric report.
- External and inline JavaScript syntax checked.
- Source image dimensions confirmed and explicit dimensions included in markup.
- Font binaries and both OFL files included; no external font dependency.
- Package manifest includes SHA-256 checksums for its deliverable files.

Re-run static checks with `node scripts/check.mjs` from the kit root. No npm installation required.

## Not completed here
Live browser layout, screen reader and interaction verification could not be run: the browser runtime was unavailable and its download did not complete successfully. These are mandatory implementation checks, not claimed passes. The responsive rules, progressive-enhancement script and examples are provided for that verification. This kit is not a WCAG certification or a tested checkout integration.

## Browser checks for Claude Code
1. Open all seven HTML references at 320, 390, 768 and 1440px. Verify no page overflow, clipped headings or obscured controls.
2. Confirm fonts load locally and logo/photographs render without missing assets.
3. Select Flax then Charcoal: radio selection, image, alt text and visible finish label must stay synchronized. Check keyboard arrow keys and focus visibility. Open product example with `?finish=charcoal`.
4. Open the mobile navigation with keyboard and touch. Ensure each route/anchor leads to the intended content.
5. Submit the demo form empty and malformed: error appears, field is focused and marked invalid. Valid example input should show the explicit demo completion message, with no network request.
6. Check native FAQ controls, 200% zoom, reduced-motion preference and reading order.
7. In the actual site, test submitted finish data, backend error/success, any configured checkout and metadata. No fake contact success or purchase confirmation.

## Owner inputs before launch
Confirm the actual product name, price/VAT, configurations/inclusions, final materials and imagery, weight-rating evidence, production capacity, delivery regions/prices, warranty/returns, real contact destination and any commerce provider. This list is consolidated in `content/product.json`; unset values are intentionally null.

## v1.1 content checks
All five page drafts are in structured JSON and a readable Markdown copy deck. The supplied background is preserved. Local references and script syntax were rechecked. The example enquiry route preserves the chosen finish in its URL and contact select; runtime browser verification remains outstanding. Demo contact submission is disabled.
