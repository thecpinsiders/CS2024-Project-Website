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
| 12 | `team.html` | Team | Group number, names, emails and role matrix |
| + | `privacy.html` | Privacy policy | PDPA policy (not counted in the 12) |
| + | `404.html` | Not found | GitHub Pages error page |

## Before you submit: edit these

1. **`team.html`**: replace `Group [No.]`, `[TXX]`, the three member names, initials (the two letters in the circle), roles and emails. To add a fourth member, copy one `<article class="member">` block and add a column to the table.
2. **`sitemap.xml`, `robots.txt` and the `<link rel="canonical">` / `og:image` tags**: replace `YOUR-GITHUB-USERNAME` and `river3plus` with your real GitHub Pages address. A quick find-and-replace across the folder does it.
3. **Footer**: optionally add your course code to the disclaimer.

## Deploy to GitHub Pages

1. Create a new **public** repository on GitHub, for example `river3plus`.
2. Click **Add file > Upload files**, then drag in **everything inside this folder** (not the folder itself), so `index.html` sits at the top level. Commit.
3. Go to **Settings > Pages**. Under *Build and deployment*, choose **Deploy from a branch**, branch **main**, folder **/ (root)**. Save.
4. Wait a minute or two, then refresh. Your link appears at the top: `https://YOUR-USERNAME.github.io/river3plus/`.
5. Submit that link with your PowerPoint on NTULearn.

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

## Photos: do this once before uploading

All picture cards use real stock photos from Unsplash (free Unsplash License; credits on `team.html#credits`).

1. **Windows:** double-click `get-photos.bat`. **Mac:** open Terminal, drag `get-photos.sh` into it and press Enter.
2. Wait for "Done". The photos are now saved in `assets/img/photos/` (about 16 files).
3. Upload the whole folder to GitHub as usual.

Each image looks for its local copy first. If the copy is missing, it loads the same photo straight from Unsplash, and if that also fails, it shows an on-brand illustration, so the page never shows a broken image. Saving the photos locally (step 1) means they also appear offline and in file previews.

To use your own photos, see `IMAGES.md`.

## Tech notes

- Fonts: Barlow Condensed (headlines, buttons) and Barlow (body) from Google Fonts.
- Accessible by default: skip link, visible focus, semantic landmarks, labelled form errors, reduced-motion support.
- SEO: unique titles and descriptions, canonical URLs, Open Graph, `sitemap.xml`, `robots.txt`, and JSON-LD for Product, FAQPage and BreadcrumbList.
- PDPA: purpose-specific notice at the point of collection, separate required and optional consents, a DNC clause for marketing, a DPO contact, a retention period, withdrawal instructions and opt-in analytics.
