# Big Jo’s Beds — Website Design System v1.1

A ready-to-use design handoff for Claude Code, based on the approved Flax / Charcoal identity board and the supplied brand background. Created 6 October 2026.

## Start here
1. Unzip this folder.
2. Open `index.html` in a browser. It works offline and shows the system, components and a live finish selector.
3. Open `examples/home.html` and `examples/product.html` for page compositions.
4. Put the whole folder in your website repository as `brand/`. In Claude Code, paste the prompt in `START-HERE.md`.

If your repository already has a root `CLAUDE.md`, do not overwrite it. Add a link to `brand/CLAUDE.md` or tell Claude to read it explicitly. This kit requires no package installation and imposes no framework or dependency versions.

## Included
| Path | Purpose |
|---|---|
| `CLAUDE.md` | Implementation rules for Claude Code |
| `START-HERE.md` | Copy-and-paste build prompt |
| `index.html` | Interactive visual design-system reference |
| `examples/` | Home, product, story, FAQ and contact examples |
| `tokens/` | CSS variables, JSON tokens, measured contrast ratios |
| `styles/brand.css` | Responsive, reusable CSS and local font setup |
| `components/brand.js` | Dependency-free finish selector and demo-form behaviour |
| `components/examples.html` | Reusable semantic HTML component examples |
| `content/` | Product data, copy bank and explicit unknowns |
| `assets/logos/` | Four outlined SVG lockups and a favicon |
| `assets/fonts/` | Local WOFF/TTF fonts and their OFL licences |
| `assets/images/` | Approved board plus matching Flax and Charcoal concept renders |
| `assets/patterns/` | Editable SVG ticking patterns |
| `docs/` | Brand, tokens, components, pages, content, asset and QA guidance |

## Integration
Copy assets to your chosen public/static directory. Preserve the relative paths or update the CSS font/pattern URLs and HTML image paths together. Import `brand.css` once globally; it imports the token sheet. Do not import it into isolated components repeatedly. Global reset and base elements are intentional; merge these with an existing reset when integrating into an existing app.

The standalone HTML files use local relative assets and a classic deferred script so `file://` works. They are examples, not a server or shop. Run `python3 -m http.server 8000` from the kit folder if you prefer `http://localhost:8000`.

## What is final versus provisional
The colours, type pairing, layout rules and two finish directions are the proposed web system derived from the approved visual. The logo is vector geometry reconstructed from the approved board, with its existing descriptor placement preserved. It is suitable for website use; a final manufacturing artwork pass is recommended for embroidery or very large print.

Product images are AI-generated concept renders, not product photographs or proof of physical specifications. Prices, policies and contact destinations remain unset. The new font pairing is an implementation choice for the website; it does not claim to identify the exact generated logo typeface.

See `docs/07-validation.md` for checks performed and remaining launch work.

## Website content update — v1.1
`content/website-copy.md` is the readable five-page copy deck. `content/copy.json` is the matching machine-readable source. The supplied background is preserved in `content/source/`. Separate `content/publication-notes.json` holds claims awaiting confirmation. `docs/08-authentic-content.md` gives editorial rules and a real-product photo brief. These replace the short v1.0 copy samples.
