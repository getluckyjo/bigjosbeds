# 02 — Tokens and layout

Exact web values are standardized from the visual direction, not presented as measured textile dye specifications. `tokens/tokens.json` is a simple documented JSON contract, not a claim of compatibility with any vendor’s token schema. CSS variables are the runtime output; keep the two in sync when changing values.

| Token | Hex | Role |
|---|---|---|
| Bone | #F4F0E7 | Main warm background; inverse type |
| Paper | #FFFCF6 | Fields and subtle cards |
| Clay | #A3442F | Logo, primary action, focus |
| Clay hover | #873724 | Primary interaction hover |
| Ink | #292C27 | Main copy and monochrome logo |
| Muted | #66635B | Secondary copy on light surfaces |
| Flax | #CDBA9E | Finish and restrained warm sections |
| Charcoal | #454541 | Finish and occasional dark section |
| Line | #D9D1C4 | Decorative dividers only |
| Control border | #817A6E | Interactive boundaries |
| Success | #3F634C | Confirmed success with text/icon |
| Error | #A12F2F | Errors with an explanation |

Use approximately 70% Bone/Paper, 20% imagery and material neutrals, 10% Clay/Ink accents in UI surfaces. This is a design balance, not an enforced ratio. Never use Flax as small text on Bone. Pale Line is not strong enough as the sole boundary of a form control; use Control border.

## Typography
DM Serif Display 400 for display/H1–H3; DM Sans 400 body, 500 labels, 600 buttons and emphasis. Body 16px / 1.6. Lead 18–22px / 1.55. Small 14px. Eyebrow 12px / 1.4, 600, uppercase with .15em tracking. Do not use the display serif for long body copy or tiny labels. Keep line length about 45–70 characters.

Fluid scales: display 48–108px; H1 44–88px; H2 32–60px; H3 24–32px. Headings use 1.04 line-height and −.025em tracking; check wraps at 320px and with enlarged text. Do not bold DM Serif Display to simulate a missing weight.

Fonts are locally supplied. Source: Google Fonts repository, DM Serif Display and DM Sans; licence files are included alongside font binaries. See `docs/06-assets.md`. The logo is separate artwork, not live type.

## Spacing and structure
4px base. Tokens: 4,8,12,16,20,24,32,40,48,64,80,96,128px. Default component gap 16/24px; desktop section 96px; mobile section 48px. Container max 1280px; reading column max 680px; responsive gutter `clamp(20px,4vw,64px)`.

Desktop: use a 12-column mental grid, hero roughly 5/7 and product page 7/5. Tablet: two columns only where content remains usable. Mobile: one column, clear reading order, full-width product imagery. Do not impose fixed heights on copy containers.

Breakpoints: 768px and 1100px. Breakpoint values are compile-time CSS boundaries, not CSS variables. Controls radius 4px, cards 8px; full pill reserved for genuine chips. Minimum action target 48px. No default card shadow; reserve soft shadows for overlays.

## Motion and accessibility
120ms fast; 200ms normal; 320ms slow. Hover changes colour without moving layout. Do not animate section entrances by default. Honour reduced motion. Focus outline 3px Clay + 4px offset and a Bone separation ring, so it remains visible around a Clay button.

Measured foreground/background contrast is in `tokens/contrast-report.json`: normal text pairs exceed 4.5:1; control borders exceed 3:1. This tests colour pairs, not the accessibility of a finished site. Always include labels and state indicators beyond colour.
