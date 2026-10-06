# 06 — Asset manifest and provenance

| Asset | Purpose | Notes |
|---|---|---|
| `big-jos-primary.svg` | Main logo on light backgrounds | Clay wordmark + Ink BEDS; outlined vector geometry |
| `big-jos-ink.svg` | Single colour | Ink paths |
| `big-jos-bone.svg` | Reverse logo | Bone paths on Clay/Charcoal |
| `big-jos-clay.svg` | Single colour | Clay paths |
| `favicon.svg` | Browser/app utility initial | Outlined J derived from supplied DM Serif Display |
| `approved-identity-board.png` | Visual source reference | Previously approved AI-generated board; do not use as a web hero |
| `bed-flax.png` | Product/hero concept | AI-generated, 1536 × 1024 |
| `bed-charcoal.png` | Product/hero concept | AI variant matched to Flax image, 1536 × 1024 |
| `ticking-flax.svg` | Small repeat accent | Editable 96px tile |
| `ticking-charcoal.svg` | Small repeat accent | Editable 96px tile |

All paths above are under their matching `assets/` subdirectories. Raster source files are included unchanged. Product labels inside raster images are illustrative; use the actual SVG for interface branding. Logo vectors are reconstructed from the approved board, not a purchased font recreation or a claimed trademark registration.

## Fonts
Included: DM Serif Display Regular and DM Sans variable (weight/optical-size axes), as original TTF and WOFF web copies. No live font CDN request is required. Keep each font’s OFL licence when distributing the kit or font binaries.

Primary sources retrieved 6 October 2026:
- https://github.com/google/fonts/tree/main/ofl/dmserifdisplay
- https://github.com/google/fonts/tree/main/ofl/dmsans
- https://github.com/googlefonts/dm-fonts

The heading pairing is chosen to complement the logo, not to match its letterforms exactly. Fonts and logos must remain separate. WOFF is broadly usable; the website build may convert to WOFF2 for additional compression, preserving the licences.

## Production export guidance
Create responsive image derivatives in the website build (480, 800, 1200, 1536px). Use WebP/AVIF where supported with a fallback. Do not upscale the source. Product photos use 3:2; lifestyle hero may use a mild crop as shown in the example. Check product edges and visible material at each breakpoint. Keep explicit width/height to prevent layout shift; lazy-load only below-fold assets.

Suggested alt text: “Big Jo’s mattress and matching base in Charcoal, styled in a bedroom.” In prototypes append “Concept render; headboard and accessories shown for styling.” Do not put marketing paragraphs, colour hex values or file names in alt text.
