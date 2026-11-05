# River 3 Plus: "Stay a little longer"

A 12-page campaign website (plus a PDPA privacy policy) for the EcoFlow River 3 Plus portable power station, by **Bluehour Studio**.
It's plain HTML, CSS and JavaScript with no build step, so it runs on GitHub Pages as-is.

## The 12 pages

| # | File | Page | Job in the user journey |
|---|------|------|-------------------------|
| 1 | `index.html` | Home | Awareness: the emotional hook ("Stay a little longer") |
| 2 | `river-3-plus.html` | Product | Consideration: features as benefits, with a sticky buy bar |
| 3 | `specs.html` | Tech specs | Evaluation: every number, plus a comparison with a power bank and a generator |
| 4 | `camping.html` | Moment: camping | Persona 1 (young families), Singapore campsite rules |
| 5 | `work-anywhere.html` | Moment: work anywhere | Persona 2 (hybrid workers) |
| 6 | `home-backup.html` | Moment: home backup | Persona 3 (peace of mind, UPS) |
| 7 | `runtime-calculator.html` | Runtime calculator | Interactive tool that removes the "is it enough?" doubt |
| 8 | `journal.html` | Journal | SEO content: three original guides |
| 9 | `support.html` | Support and FAQ | Objection handling, with FAQPage schema |
| 10 | `where-to-buy.html` | Where to buy | Conversion: hands off to Lazada and Shopee |
| 11 | `get-the-kit.html` | **Form (CTA)** | Lead capture with PDPA notice and separate marketing consent |
| 12 | `team.html` | Team | Group number, the four members and their emails |
| + | `privacy.html` | Privacy policy | PDPA policy (not counted in the 12) |
| + | `404.html` | Not found | GitHub Pages error page |

## Before you submit: edit these

1. **`team.html`**: replace `Group [No.]`, `[TXX]`, each `[Role to confirm]`, the one-line descriptions and `[email to be added]` for Geng Quan, Jemond, Ryan and Martin.
2. **`get-the-kit.html` and `privacy.html`**: replace `[team email to be added]` with the team's contact email.
3. **Footer**: optionally add your course code to the disclaimer.

The site address is already set to `https://thecpinsiders.github.io/CS2024-Project-Website/` in every canonical tag, social-preview tag, `sitemap.xml` and `robots.txt`. If the address changes, find-and-replace that one string.

## Repository layout

- The live site (Design 2, "Bluehour") is at the top level, so the GitHub Pages link opens it directly.
- `archive/` keeps the two designs the team didn't choose (Design 1 "Keep Home Close", Design 3 "Runtime Rating Label") and a page that links all three. Archived pages are marked `noindex` so they don't compete with the live site in search results.

## Deploy to GitHub Pages

The repository owner (only they, or someone with the Maintain or Admin role, can do this):

1. Go to **Settings > Pages**. Under *Build and deployment*, choose **Deploy from a branch**, branch **main**, folder **/ (root)**. Save.
2. Wait a minute or two, then refresh. The site appears at `https://thecpinsiders.github.io/CS2024-Project-Website/`.
3. Submit that link with your PowerPoint on NTULearn.

GitHub Pages on a free account needs the repository to be **public**.

Guides: https://docs.github.com/en/pages/quickstart

## Making the form actually send (optional)

GitHub Pages can't run server code, so the form validates in the browser and shows a confirmation without storing anything. To receive real submissions:

1. Create a free form on a form service such as Formspree and copy its endpoint URL.
2. In `get-the-kit.html`, change `<form class="form" id="kit-form" novalidate` to
   `<form class="form" id="kit-form" action="https://formspree.io/f/XXXX" method="POST" novalidate`.
3. The script posts automatically when `action` starts with `http`.

## Adding real product photos

See `IMAGES.md`. Every image is a single `<img>` tag, so swapping in a photo is a one-line change.

## Design (v2)

The site's style is based on outdoor-power e-commerce sites (Jackery, SOK Battery, SparkPlug Gear, EVMize): an orange promo bar, a black header, full-bleed lifestyle photos with bold uppercase headlines, a spec strip, "Find your moment" photo tiles, a product spotlight with badges, "Ways to own it" cards, trust icons, journal story cards and a dark footer.

## Photos

All photos are saved in the repository, so the site works offline and on any host:

- Lifestyle photos in `assets/img/photos/` are from Unsplash (free Unsplash License; credits on `team.html#credits`). `get-photos.sh` / `get-photos.bat` can re-download them if one goes missing.
- Product photos in `assets/img/product/` are from EcoFlow: the clean product shot from EcoFlow's UK product page, and the lifestyle shots cropped from the full-size images on the official Lazada listing.

If a photo is missing, the page shows an on-brand illustration instead of a broken image.

To use your own photos, see `IMAGES.md`.

## Tech notes

- Fonts: Barlow Condensed (headlines, buttons) and Barlow (body), self-hosted in `assets/fonts/` (SIL Open Font License).
- Accessible by default: skip link, visible focus, semantic landmarks, labelled form errors, reduced-motion support.
- SEO: unique titles (under 60 characters) and descriptions, canonical URLs, Open Graph, `sitemap.xml`, `robots.txt`, and JSON-LD for WebSite, Product, FAQPage and BreadcrumbList. The keyword plan is in the pitch deck.
- PDPA: purpose-specific notice at the point of collection, separate required and optional consents, a DNC clause for marketing, a DPO contact, a retention period, withdrawal instructions and opt-in analytics.
