# Reference material (not part of the website)

Nothing in this folder is built or served. It is kept here so the source material stays with the project.

> **This repository is public.** `supplier-pbs/` contains supplier pricing and bank details. Make the repository private (GitHub → Settings → General → Danger zone → Change visibility). Moving or deleting files does not remove them from git history.

| Folder | What it is | Why it is not on the site |
|---|---|---|
| `supplier-pbs/` | Peninsula Bed Sales quote QUO0010447 (6 Oct 2026), Gary's WhatsApp mock-up and four voice notes from the PBS chat | Supplier cost and commercial details. The mock-up is PBS's own product with a garbled logo |
| `competitors/sloom-mattress-reference.webp` | Sloom product photo | Reference for the preferred flat knitted top only. Third-party image; never publish |
| `renders-not-used/` | Two Big Jo's concept renders | The mattress label reads "BDDS" instead of "BEDS". Uploads 5 and 6 have the same framing with the correct label and are used instead |

The design-system kit's own `brand/assets/images/bed-flax.png` and `bed-charcoal.png` have the same "BDDS" label problem. The site uses `src/assets/images/` instead.

## Facts from the PBS quote that matter for the site

The quote states "250kgs per person", "Latex top", "20 year warranty" and "2 year guarantee" for the mattress. None of these are published on the site. Each needs the owner's approval of the wording and the supplier's written terms before it can be shown, per `brand/docs/05-content-and-claims.md`. The flags live in `src/data/catalogue.json` under `claims`.
