# 03 — Component contract

The runnable examples in `components/examples.html` are the source reference for markup. `styles/brand.css` supplies visuals; `components/brand.js` is progressive enhancement. In React/Vue/etc., map the HTML and CSS to native components without copying DOM listeners into the component lifecycle.

| Component | Required content | Behaviour / states |
|---|---|---|
| Header | SVG logo + accessible home link; 3–4 main links | 104px desktop, compact mobile; native disclosure menu on mobile |
| Button / link | Clear verb and target | Primary, secondary, text, hover, focus, disabled, `aria-busy` loading. Use an anchor for navigation and button for actions |
| Hero | Eyebrow, H1, short supporting copy, primary action, image | One primary action; mobile text then image; never bake heading into the image |
| Product card | Image, title, finish, short descriptor, product link | Same visual dimensions; image alt describes finish; no fake price or review |
| Finish selector | `fieldset`/`legend`, visible labelled radio inputs | Flax / Charcoal; selected border + radio + name; keyboard arrow keys; image and live text update |
| Specification list | `dl`, label/value rows | Preserve units; value may wrap; internal uncertain claims must not render publicly |
| Accordion | Native `details` + `summary` | Keyboard native; plus/minus decorative sign; allow multiple open FAQs |
| Text field | Visible label; input; hint and error IDs | 48px minimum; error sets `aria-invalid`; hint/error via `aria-describedby`; focus first invalid field |
| Notice | Concise text, optional labelled action | Status via `role=status` only when dynamically changing; do not announce static content unnecessarily |
| Badge | Short meaningful status | Small neutral label; never claim “best seller” or “verified” without evidence |
| Footer | Logo/name, short line, real navigation and contact/policy links | No invented address, badges, secure-payment icons or social links |

## Finish-selector API for a framework implementation
Inputs: `value: 'flax' | 'charcoal'`, `onChange(finish)`, unique radio `name`, `disabled?`. Product gallery consumes the same controlled value. When a finish changes, update the displayed image, alt text, visible finish name and selected product configuration. Do not shift focus. Use an `aria-live=polite` status for the name, not for the entire gallery.

The plain HTML demo uses capitalized finish values for display only. Normalize them to the lowercase `content/product.json` IDs in your application. Never use colours alone as product identifiers.

## Forms and commerce
The kit's email form is visibly marked as a demo and never sends data. For a real enquiry form add name, email, optional phone, selected finish and message, using validated backend submission. Preserve user input on error; show a success message only after the backend confirms receipt. Do not expose a nonfunctional delivery checker or checkout control.

Cart/checkout is a later integration, not a ready feature in this kit. When enabled it must support quantities, removal, totals in ZAR, loading, errors, empty state and the actual selected variant. Do not infer price, tax or availability from a render.

## Responsive and empty states
Cards stack on mobile. Keep product image above buying controls and specification details. Empty content should be omitted or replaced with a useful real action; do not ship lorem ipsum. Image errors should show a neutral reserved image area and accessible product text, never collapse the page. Network actions need retry/error and disabled/busy states that do not erase the button label.
