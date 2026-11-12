# Handoff: River 3 Plus product website (Group X, T1)

Last updated: 12 November 2026 (Malaysia update). The live site still shows the Singapore version until these changes are pushed. This file is for anyone picking it up next: a teammate, the tutor, or a future Claude session.

## In one paragraph

This is a university web design assignment. It's a product website (not a store) for the **EcoFlow RIVER 3 Plus** portable power station, aimed at **Malaysia**. Every Buy button sends people to a Lazada Malaysia or Shopee Malaysia search. The brief's goal is +20% marketplace sales in 3 months. The team, "Bluehour Studio", compared three designs and chose **Design 2 ("Bluehour", tagline "Stay a little longer")**. It's live on GitHub Pages and there's a 20-slide pitch deck alongside it.

## Links and people

- **Live site:** https://thecpinsiders.github.io/CS2024-Project-Website/
- **Repo:** github.com/thecpinsiders/CS2024-Project-Website. The leader's account owns it and teammates are collaborators. Only the owner can change the GitHub Pages settings, which are set to the `main` branch, `/ (root)`.
- **Team:** Group X, tutorial group T1.
  - Geng Quan: SUNG0014@e.ntu.edu.sg
  - Jemond: hlee059@e.ntu.edu.sg
  - Ryan: RYAP010@e.ntu.edu.sg
  - Martin: mart0032@e.ntu.edu.sg
- **Studio contact on the site:** dpo@bluehourstudio.sg. This is a demo address; the domain isn't registered, so nobody's real inbox receives it.

## Status against the brief

| Requirement | Where it is |
|---|---|
| Product site for a Lazada/Shopee product; buying happens on the marketplace | Every page; `where-to-buy.html` |
| HTML and CSS | Plain HTML/CSS with a little vanilla JS, and no build step |
| At least 9 pages, excluding privacy | 14 pages (plus `privacy.html` and `404.html`) |
| CTA form | `get-the-kit.html`: required consent box, separate optional marketing opt-in |
| PDPA | `privacy.html`: Malaysia PDPA 2010 (as amended 2024): purposes, consent and withdrawal, direct-marketing opt-out, access, correction and portability (21 days), 12-month retention, breach notification, DPO, Bahasa Malaysia summary |
| `team.html` with group number, all names and emails | Done (Group X) |
| Original, accurate research and copy | Every spec is sourced (see Sources below) |
| PowerPoint covering the nine planning items | `Bluehour-Pitch-Deck.pptx` (see below) |

Last full check (9–10 November, before the Malaysia update): all 13 live pages scored **100** for SEO, accessibility and best practices in Lighthouse, all 1,782 internal links resolved, and the live files matched the repo exactly.

## What's in the repo

```
index.html … work-anywhere.html   The live site (Design 2), at the top level so Pages serves it
assets/css/style.css              All styling
assets/js/main.js                 Menu, consent banner, runtime calculator, form validation
assets/fonts/                     Barlow and Barlow Condensed, self-hosted (no Google requests)
assets/img/photos/                Unsplash lifestyle photos (saved locally)
assets/img/product/               EcoFlow product photos (UK product shot + Lazada listing crops)
sitemap.xml, robots.txt           SEO files, pointing at the live address
archive/                          Designs 1 and 3, plus a page linking all three (all noindex)
Bluehour-Pitch-Deck.pptx          The 20-slide pitch deck
Design-Review-Changes.docx        Change log for the team (the only one)
README.md, IMAGES.md              Design 2's own notes on pages, deploying and photos
HANDOFF.md                        This file
```

Kept local only (git-ignored): `PRODUCT.md`, `.impeccable/` (design-tool notes, which still describe Design 3), `.claude/` and Office lock files (`~$*`).

## The site at a glance (14 pages)

| Page | Job |
|---|---|
| `index.html` | Hook: "Stay a little longer", moment tiles, spec strip |
| `river-3-plus.html` | Product features as benefits, gallery, sticky buy bar |
| `specs.html` | Every number, plus a comparison with a power bank and a generator |
| `camping.html`, `work-anywhere.html`, `home-backup.html` | Three "moments", one per persona: Hulu Langat / Cameron Highlands camping plus road trips; Sekinchan / Putrajaya shoots; monsoon and TNB-shutdown backup. Home backup includes "Medical equipment at home" |
| `runtime-calculator.html` | The decision tool (see below) |
| `journal.html` | Three original guides (SEO content) |
| `support.html` | FAQ, with FAQ data for search engines |
| `where-to-buy.html` | Lazada MY / Shopee MY links, the ST-SIRIM safety-mark section (`#safety-mark`) and a "before you pay" checklist |
| `get-the-kit.html` | The lead form (CTA) with PDPA consent. Demo only: nothing is sent or stored |
| `team.html` | Group, members, emails, photo credits |
| `reviews.html` | Four **sample** testimonials, labelled as written by the team, plus links to real marketplace ratings |
| `services.html` | **Proposed** services: Stay Longer Care, rentals (weekend, event, pasar malam stall kit), bundles, trade-in. Labelled as not yet available, no prices |

**Runtime calculator:** you pick a moment or set hours per device (with the buttons or by typing), and it shows the % of one charge used and a verdict. The maths is 286 Wh × 85% ≈ 243 Wh usable, and watts × hours = energy used. An X-Boost kettle counts as about 600 W. The plan is saved in the page address (`?h=router-6,laptop-1.5`) and can be shared with "Copy link to this plan". On phones the result stays pinned to the bottom of the screen.

## The pitch deck (20 slides, about 12 minutes, speaker notes on every slide)

1. Title
2. The opportunity (market research)
3. The product in five numbers
4. What we learned
5. **Target personas**
6. When you need it, and what it can run (including medical equipment)
7. **User journey map**
8. **Creative brief concept**
9. **Theme**
10. **Fonts**
11. **Sitemap**
12. **Pages breakdown**
13. The calculator feature
14. **SEO**
15. **Website marketing strategy**
16. Revenue streams beyond the first sale (protection plan, rentals, stall plans, bundles, trade-in)
17. Making it easier to say yes (price, calculator pick, comparison, less risk, phone bar, offers)
18. New buyers the site now speaks to (night markets, medical users, crews, flood-prone towns, gifts, partner campsites)
19. How we prove the +20%
20. Close, with the live link

Malaysia update (12 Nov 2026): slides 2, 4, 7, 8, 11–15 and 17 were edited in place (the slide XML, not regenerated), slide 16 was added, and the two calculator screenshots on slide 13 had their preset button relabelled "A night by the river". Slide 2 now uses TMO Group's December 2024 traffic (Shopee MY about 57M visits a month, Lazada MY about 12M), The Star (Dec 2023) on fully booked campsites and Standard Insights (2024) on 55% preferring hybrid work.

Bold items are the nine the brief requires.

- **Personas:**
  - Nur Aisyah, 36, Petaling Jaya, Malaysia (primary, a camper mum)
  - Daniel, 27, a freelance creator
  - Ravi, 38, who works from home
  - Photos are from Unsplash (free licence) by Ainur Iman, Sanket Mishra and Vitaly Gariev, credited in the notes.
- **Tone** (creative brief): warm, local, honest.
- **Editing:** edit the deck **in PowerPoint**. The team has made manual edits in it. Don't regenerate it from a script, or those edits get overwritten (this happened once and was fixed).

## Decisions worth keeping

- **Prices are shown, dated** (changed 12 Nov 2026 after feedback): "From RM 2,099 at EcoFlow Malaysia · checked 12 Nov 2026", next to "check today's price" links. Bundles: + extra battery about RM 2,999 (RM 900 battery), + 110W solar RM 2,799. Re-check before presenting. Proposed services still show no prices.
- **Only sourced claims.** Unverified specs were removed: IP ratings, "40 protections", exact AC input watts, certification marks. Keep it that way.
- **Medical equipment, stated honestly:**
  - A CPAP machine runs about 10–24 h with the humidifier off, or about 4.5 h with it on.
  - A home oxygen concentrator (250–350 W) would run under an hour, so the site says it isn't a backup plan for one.
- **Target market: Malaysia only** (tutor feedback, 12 Nov 2026). Language tags are `en-MY`, the form accepts Malaysian mobiles (01x), and the privacy policy follows Malaysia's PDPA 2010.
- **Malaysian storefront links** are searches (lazada.com.my, shopee.com.my). EcoFlow Malaysia's site suggests the "ECOFLOW Official Store" marketplace listings aren't run by EcoFlow Malaysia, so the copy tells buyers to pick EcoFlow or an authorised reseller.
- **Warranty wording:** EcoFlow Malaysia lists 2 years on the RIVER 3 Plus page (its general terms say 24 months unit / 60 months battery), and resellers such as CT Hardware advertise 5 years. The site says "local warranty" and explains the range; don't put back a flat "5-year" claim.
- **SIRIM:** only a general EcoFlow Malaysia statement ("certified by SIRIM QAS and Suruhanjaya Tenaga") was found, with no certificate naming RIVER 3 Plus. So the badge is a buyer check ("Look for the ST-SIRIM label"), not a certification claim. The big seal (`assets/img/safety-mark.svg`, our own design, not the official ST-SIRIM label artwork) sits in a band under the spec strip on Tech specs and in the Where to buy safety section. Smaller mentions are in the home trust strip, by the product page buy buttons, in the specs warranty card and in the FAQ.
- **Model comparison** (`specs.html#compare-models`): River 3 UPS vs River 3 Plus vs Jackery Explorer 300 Plus, from ecoflow.com.my and my.jackery.com (12 Nov 2026). Jackery's page lists two cycle counts (1,500 and 3,000) and no RM price; the table says so.
- **Calculator pick:** after devices are entered it names the smallest kit that covers the plan (Essential, + extra battery, + 2 batteries, or a larger station) with price and a Buy on Lazada link. Logic in `assets/js/main.js` (`PICKS`).
- **Phones:** `main.js` adds a sticky "Shop now" bar on every page except where-to-buy, get-the-kit, 404 and pages with their own bar; the cookie banner is compact on phones.
- **Proposed offers** on `services.html`: rent-first with the fee deducted, free gift instead of a discount, referral vouchers, festive and company gifts, business package, partner campsites and roadshows, flood-ready group orders. All labelled as proposals.
- **Journal buyer guides:** best power station for camping, Wi-Fi in a blackout, vs a generator, CPAP.
- **Services on the product page:** `river-3-plus.html#own-it-longer` links to Care, rentals and trade-in.
- **No written reviews.** The sample testimonials were removed after feedback. `reviews.html` links to real Lazada/Shopee ratings and proposes the #StayALittleLonger photo contest. To show the real rating and "sold" count, copy them from the listing into the commented slot in `reviews.html`.
- **Services are proposals.** Marked "Proposed services", with no prices; "Register interest" goes to the kit form.

## Sources behind the numbers

- StorageReview's RIVER 3 Plus review: the spec table, a measured 9 ms UPS switchover and the app features.
- The official EcoFlow RIVER 3 Plus listing on Lazada Singapore: the product photos (its 5-year warranty applies to Singapore, not Malaysia).
- NParks camping permits: about 68,000 in 2023, up about 50% from 2019 (The New Paper / Stomp, 2024).
- Statista (July 2024): Shopee.sg gets about 13.2M visits a month, Lazada about 6M.
- MOM (2022): 34% of employed residents worked from home at some point in the month surveyed.
- Grand View Research forecast (seen through a secondary source): about 17% yearly category growth to 2030.
- ResMed AirSense 10 power spec (CPAP), and the CAIRE Companion 5 spec (oxygen concentrator).
- A Straits Times report via OpenVan (March 2026): Malaysia has 250+ campsites, and not all have power hook-ups.
- EcoFlow Malaysia (ecoflow.com.my, checked 12 Nov 2026): SIRIM QAS / Suruhanjaya Tenaga statement, warranty terms, 60W/110W solar bundles, distributor's Care+ plan and trade-in.
- MDEC's DE Rantau programme (digital nomad pass, launched 2022), used on Work anywhere.
- The Singapore stats (NParks permits, MOM, Logitech/Milieu, Statista's Singapore traffic) were removed from the site and the deck.
- TMO Group (Dec 2024 traffic): Shopee MY about 57M visits a month, Lazada MY about 11.6M. The Star (Dec 2023): campsite operators fully booked on weekends. Standard Insights (2024): 55% of Malaysian professionals prefer hybrid work.

## How to check it still works

- **Lighthouse (SEO and accessibility scores):** open the live site in Chrome, press ⌘⌥I, go to the **Lighthouse** tab, and click **Analyze page load**. Or use pagespeed.web.dev.
- **Structured data:** Google's Rich Results Test (search.google.com/test/rich-results).
- **Local preview:** run `python3 -m http.server 8765` in the repo folder, then open http://127.0.0.1:8765/.

## Known limits and optional next steps

- **Performance:** scores 74–100 on mobile, held back by the large photos. Compressing them or serving WebP would help. SEO and accessibility are unaffected.
- **robots.txt:** Google only reads it at the domain root (thecpinsiders.github.io/robots.txt), so the repo's copy is ignored. The archive is kept out of search with `noindex` tags instead.
- **Group number:** "Group X" is deliberate. If the real group number is needed, change it in `team.html` (3 places) and on deck slides 1 and 20.
- **Form:** demo only. To receive real submissions, see "Making the form actually send" in `README.md`.
- **Change log:** `Design-Review-Changes.docx` doesn't list the last small fixes or the Malaysia update. Nothing in the brief requires them to be logged.
- **Bahasa Malaysia summary** on `privacy.html#bm` is written in plain formal Malay, but no native speaker has checked it yet.
- **Lighthouse (local, 12 Nov):** reviews, services, where-to-buy, camping, privacy, get-the-kit and home all scored 100 for accessibility, SEO and best practices. Re-check on the live site after pushing; local performance numbers (60–86) aren't comparable because the test server doesn't compress files.

## Revenue streams for the +20% goal (proposed; slide 16 of the deck)

| Stream | How it adds sales | What to measure |
|---|---|---|
| Stay Longer Care (protection plan) | Lowers the risk of a big purchase; attach-rate revenue on each unit | Attach rate per order; claims rate |
| Rentals: weekend, event, stall kit | Lets hesitant buyers try first; the rental fee comes back as a voucher if they buy within 30 days | Rentals, then rent-to-buy conversion |
| B2B stall plans with battery swaps | Recurring monthly revenue from pasar malam vendors, food trucks and event crews replacing gensets | Active stall plans; monthly churn |
| Bundles (solar, extra battery, road-trip kit) | Raises average order value at checkout | Share of orders that are bundles |
| Trade-in towards a bigger station | Brings owners back in 2–3 years | Trade-ins redeemed |

The marketplace sale itself stays the main +20% lever. These streams add trial (rentals), confidence (Care and reviews) and repeat purchases (trade-in).
