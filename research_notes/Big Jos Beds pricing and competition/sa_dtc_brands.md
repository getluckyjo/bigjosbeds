# South African DTC and bed-in-a-box mattress brands: pricing, positioning and customer promises (observed 6 Oct 2026)

Method note for the report writer: prices were captured on 6 Oct 2026 ("observed 6 Oct 2026"). Where possible they come straight from the brands' store data feeds rather than from rendered pages. Those feeds are Shopify `products.json` and the WooCommerce Store API (`/wp-json/wc/store/v1/products?type=variation`), which give exact variant prices and regular-vs-sale ("compare-at") prices. All prices are ZAR and VAT-inclusive as displayed to SA consumers, unless flagged otherwise. Some qualitative fields came from an automated page-extraction tool. Those are marked "(automated extraction, not manually verified)". That tool got at least one price badly wrong (see SleepSport), so treat those fields as lower confidence. `sloom.co.za` and `bizcommunity.com` were blocked for the plain web fetcher but loaded via Firecrawl.

## 1. Which DTC / online mattress brands operate in SA (incl. newer and defunct ones)?

### Takeaway
The true DTC "bed-in-a-box" category in SA is small. **Sloom** (Cape Town, est. 2016) is the clear category leader and closest model for Big Jo's Beds. Behind it are **Meelu** (KZN, est. 2017), **Mr Mattress** (factory-direct omnichannel, Cape Town facility, the most aggressive on heavy-sleeper marketing), **Inofia**, **SleepSport** (newer, athlete-founded) and a few small or regional factory-direct sellers. Several early entrants are now dormant or gone: Ideo, Genie Beds, myBeddie (low activity) and Natural Beds Direct. I found no "Sleep Easy" brand, no Edblo or Sealy online-only bed-in-a-box line, and no "Mohair Mill"-type premium DTC maker.

### Cited Findings
**Active DTC / factory-direct brands (observed 6 Oct 2026)**
- **Sloom**: "South Africa's First & Only Modular Mattress", sold online with free nationwide delivery and a 100-night trial. Its range now also includes bed frames, pedestals, bedding, toppers and pillows. — [Sloom home](https://sloom.co.za/)
- Sloom was founded in 2016 by Rudo Kemp, starting in his garage. It describes itself as "one of South Africa's best-known direct-to-consumer mattress businesses". — [Bizcommunity, 5 Aug 2026](https://www.bizcommunity.com/article/sloom-founder-shares-10-lessons-from-building-south-africas-mattress-disruptor-967404a)
- Sloom opened its own factory in Cape Town during the 2020 lockdown, and "all Sloom products are manufactured in South Africa". It describes itself as "an online-only mattress brand". — [SA Decor & Design, 24 Aug 2020](https://www.sadecor.co.za/interior-design-blog/bedrooms/furniture-mattresses/years-of-rejection-rockets-sloom-into-a-sleeping-success/)
- **Meelu** (meelusleep.com): "South Africa's first mattress in a box". The current range is the Hybrid (pocket spring + foam) and the Life (foam), plus a topper and pillow, all "Proudly made in RSA". — [Meelu home](https://meelusleep.com/); [Meelu Hybrid page](https://meelusleep.com/product/meelu-hybrid/)
- Meelu was founded in 2017. — [Business Insider SA, 28 Jul 2019 (Wayback)](https://web.archive.org/web/20191208120110/https://www.businessinsider.co.za/we-compare-south-africas-mattresses-that-arrive-at-your-home-in-a-box-2019-7)
- Meelu's store feed still lists a "Meelu Original Mattress", but its homepage shows only the Hybrid and Life. — [Meelu Store API](https://meelusleep.com/wp-json/wc/store/v1/products?type=variation&per_page=100); [Meelu home](https://meelusleep.com/)
- **Mr Mattress** (mrmattress.co.za): calls itself a manufacturer selling "in our stores and online". It has its "own facility in Cape Town, alongside Gauteng, the Free State, East London, KwaZulu-Natal and Mpumalanga". The founder is Andries Taljaard. — [Mr Mattress Cape Town page](https://www.mrmattress.co.za/pages/best-mattress-online-cape-town)
- Classified-ad listings attribute to Mr Mattress stores in Bloemfontein, Welkom, Kroonstad and Upington (secondary source, self-published ads). — [Gumtree mattresses listing (search snippet)](https://www.gumtree.co.za/s-mattresses/v1c9700p1)
- **SleepSport** (sleepsport.co.za): "Adjustable Recovery Mattresses", "Inspired by athletes, designed for everyone". The co-founders are Christo, Gerda, Wiehan and Yolandy, described as athletes and professionals. The mattresses are made locally. — [SleepSport home](https://www.sleepsport.co.za/); [SleepSport about (automated extraction)](https://www.sleepsport.co.za/about/)
- **Inofia** (inofia.co.za): an online WooCommerce store with about 17 mattress models, from the Roxy and Rio up to the Bellagio and Bentley, plus a wooden base. It offers a 100-night trial. — [Inofia Store API](https://www.inofia.co.za/wp-json/wc/store/v1/products?type=variation&per_page=100); [Inofia 100 Night Trial (search snippet)](https://www.inofia.co.za/100-night-trial/)
- **Designer Sleep** (designersleep.co.za): a small owner-led seller in Benoni, Gauteng (owner Ebrahim Akoodie). Its best seller is a compressed "Orthoflex" mattress. It claims "+2K mattresses sold" and shows 84 Google reviews. — [Designer Sleep home](https://designersleep.co.za/)
- **Techra Bed Factory** (techrabedfactory.co.za): a factory-direct Shopify store with a showroom that delivers only in Gauteng (automated extraction). It sells the "Weight Master" 200 kg-per-side mattress. — [Techra home](https://www.techrabedfactory.co.za/); [Techra Weight Master JSON](https://www.techrabedfactory.co.za/products/ortho-weight-master-mattress.json)
- **The Bed Guy** (thebedguy.co.za): a Johannesburg online bed seller with a "Mattresses for heavy people" range rated up to 180 kg, delivering in Gauteng (automated extraction). — [The Bed Guy heavy-people page](https://thebedguy.co.za/mattress-sale/mattresses-for-heavy-people/)
- Marginal or marketplace bed-in-a-box offerings:
  - MFA Online, a furniture and appliance retailer, sells three bed-in-a-box models (CozyComfort, KarooComfort, ProteaPlush); no prices are stated on its Aug 2024 page. — [MFA Online](https://mfaonline.co.za/bed-in-a-box/)
  - Mewer bed-in-a-box is sold through Bed King at R5,299–R8,899 with a 2-year guarantee (search snippet). — [Bed King bed-in-a-box](https://www.bedking.co.za/mattresses/bed-in-a-box)
  - Ulanda mattress-in-a-box is sold through Beds R Us, Cape Town. — [Beds R Us](https://bedsrus.co.za/product/ulanda-mattress-in-a-box-cape-town/)
  - Rainbow Home bed-in-a-box is sold on Takealot, queen R2,699 (search snippet from a news site, not verified on Takealot). — [Briefly](https://briefly.co.za/people/208195-woman-unboxes-mattress-a-box-bought-takealot/)

**Dormant, closed or exited**
- **Ideo** (ideo.co.za): a 2016 bootstrapped online mattress startup. It promised factory-to-door free delivery "at a third of the price you would pay retail" with a 60-night free-return trial. — [Ventureburn, Feb 2016 (search snippet)](https://ventureburn.com/2016/02/ideo-the-mattress-startup-that-wants-to-look-after-your-sleep/); [visi.co.za (search snippet)](https://visi.co.za/the-ideo-mattress/)
- On 6 Oct 2026 the domain ideo.co.za failed DNS resolution, so the site no longer exists (observed via Firecrawl).
- **Genie Beds** (geniebeds.co.za): a latex + pocket-coil bed-in-a-box sold mainly through traditional retailers at RRP. — [BI SA 2019 (Wayback)](https://web.archive.org/web/20191208120110/https://www.businessinsider.co.za/we-compare-south-africas-mattresses-that-arrive-at-your-home-in-a-box-2019-7)
- Genie's site metadata shows its last modification in Jan 2021. On 6 Oct 2026 **every product in its store feed was out of stock**. — [Genie home](https://geniebeds.co.za/); [Genie Store API](https://geniebeds.co.za/wp-json/wc/store/v1/products?per_page=50)
- **myBeddie** (The Point Bureau (Pty) Ltd): a budget pocket-spring bed-in-a-box sold via Makro, Takealot, bidorbuy and Loot. The homepage was last modified Oct 2022 and carries a ©2023 footer. Its YouTube channel shows 6 subscribers. — [myBeddie](https://mybeddie.co.za/)
- **Natural Beds Direct** (naturalbedsdirect.co.za): it appeared in search for a "Heavy Duty De luxe" mattress. On 6 Oct 2026 its Shopify product feed returned HTTP 402 "Unavailable Shop". — [Natural Beds Direct product JSON](https://naturalbedsdirect.co.za/products/heavy-duty-deluxe.json)
- **Simba** (UK) had "a limited presence in South Africa" in 2019 via Takealot. — [BI SA 2019 (Wayback)](https://web.archive.org/web/20191208120110/https://www.businessinsider.co.za/we-compare-south-africas-mattresses-that-arrive-at-your-home-in-a-box-2019-7)

**Big incumbents online (not DTC bed-in-a-box)**
- Searches found Edblo, Sealy and Restonic sold online only through retailers such as Sleepmasters, The Mattress Warehouse and Bradlows, as traditional bed sets. None of the results showed a manufacturer-owned online-only bed-in-a-box line. — [Mattress Warehouse Edblo](https://www.themattresswarehouse.co.za/edblo/); [Sleepmasters](https://www.sleepmasters.co.za/base-sets); [Bradlows](https://www.bradlows.co.za/bedroom/bedding/bed-sets/sealy-and-edblo)
- The Mattress Warehouse, a retailer with 15+ stores including Cape Town, advertises free delivery, a 100-night trial and buy-now-pay-later (search snippet). This shows the DTC-style promises have spread to omnichannel retail. — [The Mattress Warehouse](https://www.themattresswarehouse.co.za/)
- **MojoBeds** is a recent TFG retail rebrand of "The Bed Store", selling Dunlopillo, Sealy, Forty Winks, Henwood and Restonic, with TFG credit. It is retail, not DTC. — [What's On in Joburg](https://whatsoninjoburg.com/mojobeds-shop-quality-sleep-essentials/)

### Inferences
- The DTC field Big Jo's would enter has one scaled specialist (Sloom, ~22,000 customers) and one fast-growing factory-direct challenger with explicit heavy-sleeper products (Mr Mattress). Everything else is small, regional or dormant.
- The roster of failed or dormant brands (Ideo, Genie online, myBeddie, Natural Beds Direct) suggests that low-price positioning or retailer-dependent models did not sustain. The survivors either own manufacturing (Sloom since 2020, Mr Mattress) or have a clear product hook (adjustable layers, spec transparency).
- Sloom's own manufacturing and warehouse are in Cape Town, so Big Jo's would be competing on the home turf of the category leader.

### Gaps
- No brand called "Sleep Easy" was found in any search. No Edblo or Sealy online-only DTC line was found. No "Mohair Mill"-type premium natural-fibre DTC mattress maker was found. These may not exist, or may use names I did not search.
- I could not confirm whether Simba still sells in SA in 2026.
- I could not confirm Takealot listings directly (no Takealot page was fetched).
- I could not confirm why Ideo or Genie stopped trading. "Dormant/closed" is inferred from a dead domain and an all-out-of-stock store, not from press reports.

## 2. Prices: queen (152×188), king (183×188), extra-length and custom sizes, mattress-only and with bases; does anyone offer custom or 210 cm lengths?

### Takeaway
Premium DTC queen mattresses cost about R9,999–R19,200 and kings about R11,999–R21,599. The common "extra length" is 200 cm, and **no SA DTC brand lists a 210 cm length**. The largest standard DTC size is Sloom's **"Cape Town King" (214 × 200 cm) at R23,900** (mattress-only). Sloom and Mr Mattress offer custom sizes; Sloom says "upon request" and Mr Mattress makes custom caravan and bakkie mattresses. Big Jo's 160 × 210 cm would be a genuinely non-standard size: wider than a queen and 10 cm longer than any listed XL.

### Cited Findings
**Sloom Original Mattress** (adjustable modular foam, single model; no sale prices, compare-at = none) — [Sloom products.json](https://sloom.co.za/products.json); [Sloom product page](https://sloom.co.za/products/sloom-original-mattress)
- Single 188×91 R9,500; Single XL 200×91 R10,500; ¾ 188×107 R10,900; ¾ XL 200×107 R11,900; Double 188×137 R12,900; Double XL 200×137 R13,900.
- **Queen 188×152 R14,500; Queen XL 200×152 R15,500; King 188×182 R16,900; King XL 200×182 R17,900; Cape Town King 200×214 R23,900.** Dimensions are from the product page (automated extraction); prices are from products.json. Note that Sloom's king is 182 cm wide, not 183.
- "Custom sizes: Available upon request" (automated extraction of the product page). — [Sloom product page](https://sloom.co.za/products/sloom-original-mattress)
- Sloom sells no traditional base, only frames:
  - Upholstered "Bed Frame With Headboard": Queen R9,000, Queen XL R9,500, King R10,000, King XL R10,500, Cape Town King R12,000.
  - "Oak Bed Frame with Headboard": Queen R13,000, Queen XL R13,500, King R14,000, King XL R14,500, Cape Town King R16,000.
  - A 6-leg set for the Cape Town King costs R200. — [Sloom products.json](https://sloom.co.za/products.json)
- Sloom bundles (sale vs compare-at): Cape Town King Bundle R27,910 (was R30,910); Easy Sleep Bundle R26,230 (was R29,730); Ready To Sleep Bundle R17,530 (was R20,030); Comfort Bundle R2,730 (was R3,230). The homepage advertises savings of R3,000, R1,500, R2,500 and R500 respectively. — [Sloom products.json](https://sloom.co.za/products.json); [Sloom home](https://sloom.co.za/)
- Sloom add-ons: topper Queen R3,400, King R4,100, Cape Town King R6,800; oak pedestal R4,500. — [Sloom products.json](https://sloom.co.za/products.json)
- **Price history:** Sloom's 2019 prices were Queen R8,000, Queen XL R8,800, King R9,000 and King XL R9,900. — [BI SA 2019 (Wayback)](https://web.archive.org/web/20191208120110/https://www.businessinsider.co.za/we-compare-south-africas-mattresses-that-arrive-at-your-home-in-a-box-2019-7)

**Meelu** (regular prices, no sale flagged; no size dimensions given per variant except the single, 1880×910×280 mm) — [Meelu Store API](https://meelusleep.com/wp-json/wc/store/v1/products?type=variation&per_page=100); [Meelu Hybrid page](https://meelusleep.com/product/meelu-hybrid/)
- Hybrid (28 cm, pocket springs + foam): Queen R9,999; Queen XL R10,799; King R11,999; King XL R12,999 (Single R7,499; Double R9,499).
- Life (foam): Queen R4,999; Queen XL R5,499; King R5,999; King XL R6,499.
- "Original" (still in the store feed): Queen R9,199; Queen XL R9,999; King R10,699; King XL R11,199.
- Meelu 2019 prices: Queen R7,299, King R8,499, King XL R8,999. — [BI SA 2019 (Wayback)](https://web.archive.org/web/20191208120110/https://www.businessinsider.co.za/we-compare-south-africas-mattresses-that-arrive-at-your-home-in-a-box-2019-7)
- No bases were found in Meelu's store feed. — [Meelu Store API](https://meelusleep.com/wp-json/wc/store/v1/products?type=variation&per_page=100)

**SleepSport "Adjustable Recovery Mattress"** (regular prices, no sale) — [SleepSport queen page](https://www.sleepsport.co.za/product/queen-adjustable-recovery-mattress/); [SleepSport Store API](https://www.sleepsport.co.za/wp-json/wc/store/v1/products?type=variation&per_page=100)
- Queen R19,200; Queen XL R20,999; King R21,599; King XL R23,599 (Single R14,899; ¾ R15,899; Double R18,200).
- Conflict: an automated extraction of the SleepSport homepage reported Queen R8,999 "was R10,499". The product page and store API both show R19,200, so treat the homepage extraction as wrong.
- Several SKUs showed stock of only 1–6 units. Some were on backorder with "Estimated delivery: 3–4 weeks". — [SleepSport Store API](https://www.sleepsport.co.za/wp-json/wc/store/v1/products?type=variation&per_page=100)

**Inofia** (sizes stated in mm: Queen 1520×1880, Queen XL 1520×2000, King 1830×1880, King XL 1830×2000; regular prices) — [Inofia Store API](https://www.inofia.co.za/wp-json/wc/store/v1/products?type=variation&per_page=100)
- Queen prices run from R3,999 (Roxy) to R15,999 (Bentley). King prices run from R4,999 (Roxy) to R18,999 (Bentley).
- Mid-premium models: Opal Q R9,499 / K R10,999; Remy Q R9,499 / K R11,999; Jasper and Stella Q R9,999 / K R10,999; "2 in 1 – 25 cm" Q R10,499 / K R12,999; Bellagio Q R13,999 / K R17,599.
- Extra length (XL) costs roughly R500–R1,500 more than the standard length.
- The Mila comes in a "Super King 200 x 200" at R9,999 (out of stock).
- Tripoli Wooden Base: Queen R6,499; King R7,499; Queen XL R6,999; King XL R7,999.
- Many variants were out of stock on 6 Oct 2026.

**Mr Mattress** (Shopify; every product shows a sale price against a higher "regular" compare-at price) — [Mr Mattress products.json](https://www.mrmattress.co.za/products.json)
- **Ultra 200** (200 kg/sleeper), mattress-only, sale (regular): Queen R9,199 (R12,899); King R11,199 (R15,699); Queen XL R10,999 (R15,399); King XL R13,499 (R18,899); Super King XL R16,598 (R23,349).
- Ultra 200 **base set**, sale (regular): Queen R10,999 (R15,399); King R12,199 (R17,099); Queen XL R13,199 (R18,499); King XL R14,699 (R20,599); Super King XL R17,998 (R25,299).
- Revive, mattress-only: Queen R7,199 (R9,999); King R8,999 (R12,999); Queen XL R8,639; King XL R10,799. Base set: Queen R7,999; King R9,999.
- Active foam: Queen R5,199 mattress-only. Comfort Foam from R2,399 (single).
- Ultra 200 standard sizes per the product page: Queen 152×188, King 183×188; height 30 cm. "Super King: 183 x 200 cm" also appears there (automated extraction; looks inconsistent and unverified). — [Mr Mattress Ultra 200](https://www.mrmattress.co.za/products/ultra-200-memory-foam-mattress)
- Mr Mattress also lists made-to-measure-type products ("Custom Caravan Mattress", "Bakkie Mattress"), showing custom-cut capability. — [Mr Mattress products.json](https://www.mrmattress.co.za/products.json)

**Techra Bed Factory, Weight Master (200 kg p/p per side)**, sale (compare-at) — [Techra JSON](https://www.techrabedfactory.co.za/products/ortho-weight-master-mattress.json)
- Double R12,183 (R14,333); Queen R13,685 (R16,100); King R14,790 (R17,400); Queen XL R15,728 (R18,504); King XL R17,009 (R20,010); Super King R15,385 (R18,100).
- XL variants were added in Jun–Jul 2026. The Shopify variants are flagged "taxable": false, so VAT treatment is unclear.

**Others**
- Genie (all out of stock): Original Mattress R5,499–R10,750; Genie Base R1,625–R3,260. — [Genie Store API](https://geniebeds.co.za/wp-json/wc/store/v1/products?per_page=50)
- The Bed Guy (automated extraction): Supreme Support Queen R5,250–R5,799 (160 kg); Ortho Tech Gel King R7,899–R8,699 (180 kg). — [The Bed Guy](https://thebedguy.co.za/mattress-sale/mattresses-for-heavy-people/)
- Custom made-to-measure beds are offered by the retailer Bedworld (search snippet). — [Bedworld custom sizes](https://bedworld.co.za/need-custom-size-beds-bedworld-can-help/)
- SA "extra length" is 200 cm versus the standard 188 cm (search summary of retailer size guides). — [Bed King size guide](https://www.bedking.co.za/mattress-and-base-sizes.php); [Sloom size guide](https://sloom.co.za/mattress-size-guide/)

### Inferences
- **Price ladder for a premium big bed (mattress-only):**
  - Mr Mattress Ultra 200 King XL: R13,499 sale / R18,899 "regular".
  - Techra Weight Master King XL: R17,009.
  - Sloom King XL: R17,900.
  - SleepSport King XL: R23,599.
  - Sloom Cape Town King: R23,900.
  - Big Jo's 160 × 210 cm sits physically between a Queen XL and a King XL in area. It is the only option longer than 200 cm, which supports pricing at or above Sloom's King XL (about R17,900) for the mattress alone.
- **Mattress + frame/base:** Sloom Queen + upholstered frame comes to about R23,500, King XL + frame about R28,400, and Cape Town King + frame about R35,900 (all at list price). The Cape Town King bundle is R27,910. Mr Mattress Ultra 200 King XL base set is R14,699 sale. A "heavy-duty base" bundle from Big Jo's would therefore compete against R15k (sale-led factory-direct) to R36k (Sloom premium) all-in.
- **DTC price inflation is steep:** Sloom's Queen rose from R8,000 (2019) to R14,500 (2026), +81%. Its King rose from R9,000 to R16,900 (+88%) and its King XL from R9,900 to R17,900 (+81%). Meelu's Original Queen rose only +26% (R7,299 to R9,199). Sloom has moved upmarket while Meelu stayed mid-market.
- Mr Mattress uses a "permanent sale" display: every product shows a sale price below a "regular" compare-at price. Most mattresses are about 28–31% off (e.g., Ultra 200 Queen R9,199 vs R12,899), Comfort Foam is about 40% off and some base sets about 20% off. Sloom, Meelu, SleepSport and Inofia show a single price with no strike-through. Sloom uses bundles rather than discounts to signal savings.
- Extra length adds about R1,000 at Sloom, about R800–R1,000 at Meelu, about R1,800–R2,000 at SleepSport, and about R1,800–R2,300 (sale) at Mr Mattress Ultra 200. This is a useful benchmark for a length premium.

### Gaps
- No SA DTC brand lists a 210 cm length or a 160 cm width. Sloom's "custom sizes upon request" pricing is not published.
- The contents of Sloom's Cape Town King Bundle (R27,910) were not captured.
- SleepSport's exact dimensions were not captured; its size chart is a PDF that I did not open.
- Takealot prices for bed-in-a-box brands were not directly verified.
- Mr Mattress "Super King" dimensions are unclear (the extraction said 183×200, which equals a King XL).

## 3. Weight ratings and marketing to heavier or taller people

### Takeaway
Weight ratings are now a visible selling point. The mainstream DTC premium norm is **150 kg per person/side** (Sloom, Meelu Hybrid, and reportedly SleepSport and Inofia). Only factory-direct heavy-duty players go to **200 kg per sleeper**: Mr Mattress Ultra 200 and Techra Weight Master (Genie also claimed 200 kg in 2019). **Nobody found advertises 250 kg**, and no brand targets *tall* men beyond offering 200 cm XL lengths. Mr Mattress is already running explicit heavy-sleeper content marketing that names Sloom's 150 kg limit.

### Cited Findings
- Sloom: "Weight rating: 150kg per person" (automated extraction of the product page, 2026). The same 150 kg per person was reported in 2019. — [Sloom product page](https://sloom.co.za/products/sloom-original-mattress); [BI SA 2019](https://web.archive.org/web/20191208120110/https://www.businessinsider.co.za/we-compare-south-africas-mattresses-that-arrive-at-your-home-in-a-box-2019-7)
- Meelu Hybrid: "150kg per side" icon on the product page. — [Meelu Hybrid](https://meelusleep.com/product/meelu-hybrid/)
- SleepSport: "engineered for durability to withstand up to 150kg" (automated extraction, not manually verified). — [SleepSport home](https://www.sleepsport.co.za/)
- Inofia: "150 kg weight limit" (automated extraction, not manually verified). — [Inofia home](https://www.inofia.co.za/)
- **Mr Mattress Ultra 200**: "rated to 200kg per sleeper (400kg total on Queen) on 60-density open-cell SABS-certified foam", with a "Chip 65 foundation core", double-sided 300 mm, and a "full-perimeter high-density foam edge". — [Mr Mattress heavy-sleeper guide](https://www.mrmattress.co.za/pages/best-mattress-for-heavy-sleepers-in-south-africa); [Ultra 200 page](https://www.mrmattress.co.za/products/ultra-200-memory-foam-mattress)
- Mr Mattress's other ratings: the Revive (65 kg/m³ core) is rated to 140 kg, and the standard range uses 50 kg/m³ SABS-approved foam. — [Mr Mattress heavy-sleeper guide](https://www.mrmattress.co.za/pages/best-mattress-for-heavy-sleepers-in-south-africa)
- Mr Mattress's heavy-sleeper page targets people "over 90 kg" and recommends the Ultra 200 for "sleepers over 120kg". It explicitly names a competitor: "Sloom publishes a weight limit of 150 kg per person… Most brands, including Cloud Nine, do not publish a uniform weight limit." It also claims its 365-night trial "applies identically at 200kg… no weight exclusions". — [Mr Mattress heavy-sleeper guide](https://www.mrmattress.co.za/pages/best-mattress-for-heavy-sleepers-in-south-africa)
- Techra Weight Master: "can take up to 200kg p/p per side", firm, "5 layers of high-density foam", 300 mm, turnable, 10-year warranty. — [Techra JSON](https://www.techrabedfactory.co.za/products/ortho-weight-master-mattress.json)
- The Bed Guy: "Mattresses for heavy people – 130kg, 140kg, 160kg, 180kg", "up to 180 kg per person for us healthy South Africans" (page meta description). — [The Bed Guy](https://thebedguy.co.za/mattress-sale/mattresses-for-heavy-people/)
- Historic 2019 ratings: Genie "200kg per person", Simba "114kg per person", myBeddie "120kg per person". — [BI SA 2019](https://web.archive.org/web/20191208120110/https://www.businessinsider.co.za/we-compare-south-africas-mattresses-that-arrive-at-your-home-in-a-box-2019-7)
- For tall sleepers, extra length is the only offer: Sloom offers XL (200 cm) in every size, and Meelu, SleepSport, Inofia, Mr Mattress and Techra all sell XL variants. — [Sloom products.json](https://sloom.co.za/products.json); [Meelu Store API](https://meelusleep.com/wp-json/wc/store/v1/products?type=variation&per_page=100); [SleepSport Store API](https://www.sleepsport.co.za/wp-json/wc/store/v1/products?type=variation&per_page=100); [Inofia Store API](https://www.inofia.co.za/wp-json/wc/store/v1/products?type=variation&per_page=100); [Techra JSON](https://www.techrabedfactory.co.za/products/ortho-weight-master-mattress.json)

### Inferences
- A 250 kg-per-person rating would be the highest published rating in SA DTC, 25% above the 200 kg ceiling (Mr Mattress, Techra). Combined with a 210 cm length, that forms a clear white space. No competitor combines high weight capacity with extra length for "big and tall men" as a brand identity.
- Mr Mattress is the most direct threat on the "heavy" axis. It already owns SEO content for "best mattress for heavy sleepers in South Africa", publishes foam densities, and sells the Ultra 200 King XL base set at R14,699 sale. Big Jo's would need to justify a premium through length (210 cm), latex and a cotton cover, higher rated capacity (250 kg), a purpose-built heavy-duty base, and brand.
- Sloom's 150 kg cap and 200 cm maximum length mean the category leader does not serve Big Jo's core customer, despite naming its largest size "Cape Town King".

### Gaps
- No DTC brand publishes test methodology for its weight rating (e.g., SABS or ISO durability test). Mr Mattress cites "SABS-certified foam", not a certified bed load test.
- Inofia's and SleepSport's 150 kg claims were not manually verified.
- I found no SA brand marketing specifically to tall or big men as a demographic, and no brand using athletes or rugby players for big-body positioning. SleepSport uses athletes, but for "recovery".

## 4. Trial periods, return mechanics, warranties, delivery (esp. Cape Town) and financing

### Takeaway
The DTC "table stakes" in SA are a **100-night trial, free nationwide delivery and a long warranty**. Mr Mattress has escalated to **365 nights with no minimum hold** and a 10-year non-pro-rated warranty. Sloom pairs a 100-night trial (return window day 60–100) with a 25-year "service warranty", but Hellopeter reviewers report return and exchange service fees. Delivery to Cape Town is free from all national DTC players. Sloom and Mr Mattress both ship from Cape Town facilities. Interest-free instalments (Float; PayJustNow, Payflex, Mobicred) are standard.

### Cited Findings
**Sloom**
- "100-Night Risk-Free Trial… Not in love? We'll collect & refund the mattress." The site also advertises free nationwide delivery and a "25-Year Service Warranty". — [Sloom home](https://sloom.co.za/)
- Mechanics: "If not satisfied, return anytime between 60–100 days for a full refund". Warranty is a "2 Year guarantee against product faults; 25 Year service warranty". Delivery takes "2–5 working days". Finance is "Interest-free… through Float, allowing payments over 6 months". A free quilted protector comes with purchase. (All automated extraction of the product page.) — [Sloom product page](https://sloom.co.za/products/sloom-original-mattress)
- Orders ship "from either Cape Town or Johannesburg warehouses within 24 hours" with free courier delivery in 1–3 working days to main centres (search-result snippet of the Sloom product page). — [Sloom product page](https://sloom.co.za/products/sloom-original-mattress)
- A customer review reports the box "arrived 26 hours after order placement and we live 450km from the Cape Town warehouse". — [Sloom home (review widget)](https://sloom.co.za/)
- The trial was the same in 2019: "claimable between day 60 and 100. Free pickup and refund." — [BI SA 2019](https://web.archive.org/web/20191208120110/https://www.businessinsider.co.za/we-compare-south-africas-mattresses-that-arrive-at-your-home-in-a-box-2019-7)
- Sloom's return rate is "less than a 3% return rate" despite the 100-night trial (founder quote). — [Bizcommunity, 5 Aug 2026](https://www.bizcommunity.com/article/sloom-founder-shares-10-lessons-from-building-south-africas-mattress-disruptor-967404a)
- Hellopeter's review summary lists criticism of "return and exchange service fees", "bed base quality" and "an email-only support channel"; "return fee" is a tagged theme. — [Hellopeter Sloom](https://www.hellopeter.com/sloom)
- Sloom's refund-policy page rendered empty (JavaScript) and its /pages/faq returned 404, so the formal terms were not readable. — [Sloom refund policy](https://sloom.co.za/policies/refund-policy)

**Meelu**
- "100 Night Risk-Free Trial. Should you not be entirely satisfied, return your mattress to us within 100 days" ("Ts and Cs apply"). — [Meelu Hybrid](https://meelusleep.com/product/meelu-hybrid/)
- Warranty: "15 Year Warranty" on the Hybrid. — [Meelu Hybrid](https://meelusleep.com/product/meelu-hybrid/)
- Delivery: "Free delivery & returns, nationwide… free… to any location in South Africa within 3–7 working days", with a tracking number on dispatch "from the factory". The product-page icon says 3–5 working days. — [Meelu home](https://meelusleep.com/); [Meelu Hybrid](https://meelusleep.com/product/meelu-hybrid/)
- The meelusleep.com/100-night-trial/ page returned 404, so the full T&Cs were not read. — [Meelu trial URL](https://meelusleep.com/100-night-trial/)

**Mr Mattress**
- "365 nights at home, no minimum hold period, on every mattress". Every mattress is "delivered free nationwide, including Cape Town", and is made in "our own Cape Town facility". — [Mr Mattress Cape Town page](https://www.mrmattress.co.za/pages/best-mattress-online-cape-town)
- Warranty: "10-year manufacturing warranty… never pro-rated". The budget Comfort Foam carries 3 years. — [Mr Mattress heavy-sleeper guide](https://www.mrmattress.co.za/pages/best-mattress-for-heavy-sleepers-in-south-africa); [Mr Mattress Cape Town page](https://www.mrmattress.co.za/pages/best-mattress-online-cape-town)
- The Ultra 200 page describes the trial as a "365-night sleep trial with no questions asked exchange". Finance options are "PayJustNow, Payflex, Mobicred, split payments from R1,066.50/month over 2–6 months" (automated extraction). The product cards also show a "Money Back Guarantee" badge, so whether the 365 nights means refund or exchange is ambiguous. — [Ultra 200](https://www.mrmattress.co.za/products/ultra-200-memory-foam-mattress); [Mr Mattress heavy-sleeper guide](https://www.mrmattress.co.za/pages/best-mattress-for-heavy-sleepers-in-south-africa)
- Customers can contact Mr Mattress pre-purchase through a WhatsApp chat ("Need help? Chat with us"). — [Mr Mattress heavy-sleeper guide](https://www.mrmattress.co.za/pages/best-mattress-for-heavy-sleepers-in-south-africa)

**SleepSport**
- 100-night home trial with a full refund (about-page extraction). Delivery is "within 3–7 working days" (product page). Warranty is "2-year warranty on mattress" (homepage extraction, unverified). — [SleepSport about](https://www.sleepsport.co.za/about/); [SleepSport queen page](https://www.sleepsport.co.za/product/queen-adjustable-recovery-mattress/); [SleepSport home](https://www.sleepsport.co.za/)
- SleepSport also has a dedicated "Guarantee & Warranty" page, which was not read. — [SleepSport queen page (nav)](https://www.sleepsport.co.za/product/queen-adjustable-recovery-mattress/)

**Inofia**
- "Test the Inofia mattress for 100 days… we will give you a refund for 100% of the purchase price" (search snippet of its trial page). — [Inofia 100 Night Trial](https://www.inofia.co.za/100-night-trial/)
- Also a "10-year limited warranty", "free non-contact delivery" for SA customers, and "interest-free monthly instalments using existing credit cards" (automated extraction, unverified). — [Inofia home](https://www.inofia.co.za/)

**Others**
- Designer Sleep offers a 100-Night Comfort Trial and recommends at least 60 nights before deciding (search snippet). — [Designer Sleep trial](https://designersleep.co.za/100-night-trial/)
- Techra Weight Master has a 10-year warranty, with deliveries in Gauteng only (extraction). — [Techra JSON](https://www.techrabedfactory.co.za/products/ortho-weight-master-mattress.json); [Techra home](https://www.techrabedfactory.co.za/)
- The Bed Guy offers "Sleep Now, Pay Later" and delivers in Johannesburg and Gauteng (extraction). — [The Bed Guy](https://thebedguy.co.za/mattress-sale/mattresses-for-heavy-people/)
- Historic: myBeddie's 100-night trial was a **paid add-on** (R450 single to R1,000 king), with a minimum delivery fee of R200. Ideo offered a 60-night free-return trial. — [BI SA 2019](https://web.archive.org/web/20191208120110/https://www.businessinsider.co.za/we-compare-south-africas-mattresses-that-arrive-at-your-home-in-a-box-2019-7); [visi.co.za (snippet)](https://visi.co.za/the-ideo-mattress/)
- Retail has copied the promises: The Mattress Warehouse offers a 100-night trial, free delivery and buy-now-pay-later (snippet). — [The Mattress Warehouse](https://www.themattresswarehouse.co.za/)

### Inferences
- For Big Jo's, a 100-night trial and free Cape Town delivery are the minimum to be credible. A custom 160 × 210 cm mattress complicates refunds because a returned non-standard unit has little resale value. The return-fee complaints seen at Sloom show that customers punish fine print. Big Jo's could consider a comfort exchange (layer swap or firmness adjustment) rather than an open refund, stated plainly up front.
- Sloom's "60-night minimum" mirrors adjustment periods and keeps returns under 3%, which is a useful benchmark for trial cost modelling.
- Warranty claims run from 10 years (Mr Mattress, Techra, Inofia) to 15 years (Meelu Hybrid) to Sloom's "25-year service warranty", which sits on top of only a 2-year fault guarantee. Long headline numbers are marketing devices, so Big Jo's warranty should state clearly what is covered (e.g., sag depth at 250 kg).
- Financing via Float, PayJustNow, Payflex or Mobicred is expected at the R15k+ ticket.

### Gaps
- I could not read the full trial T&Cs for Sloom (JS-rendered), Meelu (404) or Mr Mattress. The exact return fees, collection charges and condition requirements are unknown.
- Delivery lead times for custom or oversized sizes (e.g., Sloom Cape Town King) were not found.
- Meelu's financing options were not identified.

## 5. Positioning and marketing (tone, social proof, review volumes, showrooms vs online, influencers)

### Takeaway
Sloom sells **innovation + local pride + "premium without the markup"** (modular, adjustable, "Proudly SA", Cape Town-made), backed by about 330 platform reviews and a "22,000+ happy Sloomers" claim. Mr Mattress sells **spec transparency + guarantees** (densities, weight per sleeper, SABS, 365 nights, "world record" base strength), backed by heavy SEO "answer" pages and 523 Google reviews. Meelu sells **"first mattress in a box" + science**, and SleepSport sells **athlete recovery**. Most are online-first. Mr Mattress mixes stores and online, Meelu has used mall stands, and Sloom gets exposure through hotel and lodge placements. I found no evidence of paid celebrity or influencer campaigns in SA DTC mattresses.

### Cited Findings
**Sloom**
- Taglines include "Premium sleep without the markup… By selling directly to you, Sloom makes premium, locally crafted mattresses accessible", "Modular sleep solution" and "Tailor your space and sleep to suit(e) your lifestyle". — [Sloom home](https://sloom.co.za/)
- Social proof on the homepage: Hellopeter 4.7 (39 reviews), Google 4.8 (222), Facebook 4.8 (67), and "22 000+ happy Sloomers". — [Sloom home](https://sloom.co.za/)
- On Hellopeter itself, Sloom has a TrustIndex of 6.3/10 from 15 reviews in the last 12 months (39 total), an average of 4.5, NPS 75, ranks #17 in Retail, and has an average reply time of 119h50m. — [Hellopeter Sloom](https://www.hellopeter.com/sloom)
- A Hellopeter reviewer first encountered Sloom at Becks Safari lodge. This shows hospitality placement acting as a trial channel. — [Hellopeter Sloom](https://www.hellopeter.com/sloom)
- Early growth: a loan was spent "on marketing Sloom with the online press and some Facebook and Google ads… the catalyst". — [SA Decor & Design 2020](https://www.sadecor.co.za/interior-design-blog/bedrooms/furniture-mattresses/years-of-rejection-rockets-sloom-into-a-sleeping-success/)
- Sloom uses founder-led PR (e.g., 10-year anniversary lessons) and lists press on its site. — [Bizcommunity 2026](https://www.bizcommunity.com/article/sloom-founder-shares-10-lessons-from-building-south-africas-mattress-disruptor-967404a); [Sloom home](https://sloom.co.za/)
- Sloom uses a WhatsApp widget (Zoko) on site, and reviewers praise its "WhatsApp order updates". — [Sloom home](https://sloom.co.za/); [Hellopeter Sloom](https://www.hellopeter.com/sloom)

**Mr Mattress**
- Proof points: "We publish the numbers most mattress retailers leave out: foam density in kg/m3, weight capacity per sleeper, and SABS certification"; "Rated 4.7 out of 5 by 523 Mr Mattress customers on Google"; "Over 25,000 Mr Mattress beds delivered"; "Official world record holder for bed base strength"; and a "verified government and Parliament track record". — [Mr Mattress heavy-sleeper guide](https://www.mrmattress.co.za/pages/best-mattress-for-heavy-sleepers-in-south-africa)
- Mr Mattress publishes many SEO comparison and location pages: best mattress online Cape Town, Western Cape, Free State, heavy sleepers, and a "Best Mattress in South Africa (2026): An Honest Shortlist" dated 4 Oct 2026. That shortlist positions Sloom at "R10,000+… over double the price of a comparable foam bed". — [Mr Mattress Cape Town page](https://www.mrmattress.co.za/pages/best-mattress-online-cape-town); [Mr Mattress shortlist (automated extraction)](https://www.mrmattress.co.za/blogs/news/best-mattress-in-south-africa)
- Positions itself against Cape Town retailers Bed King, The Sleep Gallery, Beds4U and Beds R Us as mere "retailers reselling other brands". — [Mr Mattress Cape Town page](https://www.mrmattress.co.za/pages/best-mattress-online-cape-town)

**Meelu**
- Messaging: "Unbox perfect sleep", "South Africa's first mattress in a box", "World-class sleep science", "Unsurpassed value… We ship directly from the factory floor to you, eliminating brick-and-mortar overheads". — [Meelu home](https://meelusleep.com/)
- "As featured in" Estates Magazine, Get It, Living Space, Sunday Tribune, Your Family, Mamas and Papas. Testimonials are mainly from KZN (Ballito, Durban, Umhlanga). — [Meelu home](https://meelusleep.com/)
- A testimonial mentions trying the mattress "at your stand in La Lucia Mall", showing physical pop-up stands. — [Meelu Hybrid](https://meelusleep.com/product/meelu-hybrid/)

**SleepSport**
- Messaging: "Inspired by athletes, designed for everyone", recovery/performance. It claims prices "nearly 50% less than typical high-end mattresses" and a "25-year lifespan" (about-page extraction). — [SleepSport home](https://www.sleepsport.co.za/); [SleepSport about](https://www.sleepsport.co.za/about/)
- Its store data shows "review_count": 0 on every product. — [SleepSport Store API](https://www.sleepsport.co.za/wp-json/wc/store/v1/products?type=variation&per_page=100)

**Others**
- Designer Sleep: "Sleep in Royalty", owner-led, 84 Google reviews via Trustindex, WhatsApp contact. — [Designer Sleep](https://designersleep.co.za/)
- The 2019 comparison framed DTC brands as cutting out "commission-hungry salespeople" and noted that international brands used paid influencers (e.g., Kylie Jenner). It cited no SA influencer use. — [BI SA 2019](https://web.archive.org/web/20191208120110/https://www.businessinsider.co.za/we-compare-south-africas-mattresses-that-arrive-at-your-home-in-a-box-2019-7)

### Inferences
- Two proven positioning routes exist in SA DTC. One is innovation plus lifestyle (Sloom: adjustable, design-led, bundles, bedroom furniture). The other is engineering plus proof (Mr Mattress: densities, weight ratings, guarantees, aggressive comparisons). Big Jo's "built for big men, 250 kg, 210 cm" story naturally fits the engineering-plus-proof route but at a premium price. That means borrowing Sloom's premium design tone while publishing Mr Mattress-style hard specs.
- Review volumes are modest, at hundreds rather than thousands: Sloom about 330 across platforms, Mr Mattress 523 on Google. A new brand could reach credible social proof with about 50–100 genuine reviews in a niche segment.
- Hospitality placements (Sloom at a safari lodge) and mall stands (Meelu) are low-cost try-before-you-buy channels. For big and tall men, placements in places they frequent (e.g., rugby clubs, gyms, guest lodges catering to sports teams) could be analogous. This is speculative.
- Sloom's Hellopeter TrustIndex (6.3) is driven by slow replies (119h) and fee complaints rather than product quality, which shows that service speed is a competitive gap.

### Gaps
- I found no data on ad spend, Instagram/TikTok follower counts or influencer partnerships for any SA DTC mattress brand.
- I did not capture Google review counts for Meelu, SleepSport or Inofia, or Hellopeter profiles for Meelu and Mr Mattress (search did not return them).
- I found no Trustpilot presence for SA DTC mattress brands.

## 6. Scale, funding and performance, including failures and closures

### Takeaway
SA DTC mattress brands are **bootstrapped and modest in scale**. Sloom, the leader, claims 22,000+ customers over 10 years and took about 3 years to make money, funded by the founder's provident fund and a family loan. Mr Mattress claims 25,000+ beds delivered. No VC funding for any SA DTC mattress brand was found. Several entrants have faded: Ideo's domain is dead, Genie is fully out of stock, myBeddie is low-activity and Natural Beds Direct's store is unavailable. The pattern suggests thin margins and long payback periods.

### Cited Findings
- Sloom founder Rudo Kemp quit his job and "tak[ing] his provident fund to start Sloom". Minimum order quantities meant "R1MIL in the bank to manufacture 1000" zip covers. "I never thought it would take three years to start making any money". Initial stock "sat in Rudo's garage for almost a year". His wife took a loan "in her name" to fund marketing. — [SA Decor & Design, 24 Aug 2020](https://www.sadecor.co.za/interior-design-blog/bedrooms/furniture-mattresses/years-of-rejection-rockets-sloom-into-a-sleeping-success/)
- Sloom lessons in 2026: "Treat capital as your most valuable resource"; "Find suppliers that can grow with you" (large manufacturers require volumes startups cannot support); "Earn the right to scale". The return rate is <3%. — [Bizcommunity, 5 Aug 2026](https://www.bizcommunity.com/article/sloom-founder-shares-10-lessons-from-building-south-africas-mattress-disruptor-967404a)
- Sloom claims "22 000+ happy Sloomers". — [Sloom home](https://sloom.co.za/)
- Mr Mattress claims "Over 25,000 Mr Mattress beds delivered across South Africa" and has factories in six regions. — [Mr Mattress heavy-sleeper guide](https://www.mrmattress.co.za/pages/best-mattress-for-heavy-sleepers-in-south-africa); [Mr Mattress Cape Town page](https://www.mrmattress.co.za/pages/best-mattress-online-cape-town)
- Designer Sleep claims "+2K Mattresses Sold". — [Designer Sleep](https://designersleep.co.za/)
- SleepSport's inventory showed 1–6 units per SKU, with several SKUs on 3–4-week backorder. — [SleepSport Store API](https://www.sleepsport.co.za/wp-json/wc/store/v1/products?type=variation&per_page=100)
- Ideo was a "bootstrapped startup" in 2016. ideo.co.za no longer resolves (DNS failure, 6 Oct 2026). — [Ventureburn 2016 (snippet)](https://ventureburn.com/2016/02/ideo-the-mattress-startup-that-wants-to-look-after-your-sleep/)
- Genie's site was last modified in 2021. All store products were out of stock on 6 Oct 2026, and its Original Mattress top price (R10,750) equals its 2019 King XL RRP. — [Genie Store API](https://geniebeds.co.za/wp-json/wc/store/v1/products?per_page=50); [BI SA 2019](https://web.archive.org/web/20191208120110/https://www.businessinsider.co.za/we-compare-south-africas-mattresses-that-arrive-at-your-home-in-a-box-2019-7)
- myBeddie's homepage was last modified Oct 2022, and it relies on marketplaces (Makro, Takealot, Loot, bidorbuy). — [myBeddie](https://mybeddie.co.za/)
- Natural Beds Direct's Shopify store returned "Unavailable Shop" (HTTP 402) on 6 Oct 2026. — [Natural Beds Direct](https://naturalbedsdirect.co.za/products/heavy-duty-deluxe.json)
- Adjacent retail failure: Beds for Africa, a national bed retailer with at least 14 branches, was liquidated (search snippet). — [ECR ConsumerWatch](https://ecr.co.za/news/consumerwatch/listen-sleepless-nights-customers-after-bed-store-closes)
- Business Insider SA's 2019 comparison URL now redirects to the BI US homepage, so the 2019 article is only available via the Wayback Machine. — [BI SA 2019 (Wayback)](https://web.archive.org/web/20191208120110/https://www.businessinsider.co.za/we-compare-south-africas-mattresses-that-arrive-at-your-home-in-a-box-2019-7)

### Inferences
- Of the five brands in the 2019 Business Insider SA comparison, only Sloom and Meelu are clearly still trading DTC in 2026. Genie is all out of stock, myBeddie is low-activity and Simba's SA presence is unconfirmed. That is a survival rate of about 2 in 5 for SA bed-in-a-box brands over seven years.
- The survivors share a pattern: (a) control of manufacturing, as with Sloom's own Cape Town factory and Mr Mattress's own facilities, (b) a distinctive product hook, and (c) steady price increases (Sloom +81–88% since 2019). This suggests that pricing too low was a failure mode. Big Jo's premium pricing is consistent with the survivors.
- A custom 160 × 210 cm product amplifies the MOQ and supplier problem Sloom describes, because foam, latex and cover suppliers will not easily make small runs. Supplier flexibility should be a key feasibility checkpoint.

### Gaps
- I found no revenue, profit, employee or funding figures for any SA DTC mattress brand, and no evidence of VC or angel rounds.
- I found no press coverage explaining why Ideo, Genie or myBeddie declined.
- No market-size data for SA online mattress sales was found in this pass.
