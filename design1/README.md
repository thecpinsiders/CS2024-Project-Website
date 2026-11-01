# RIVER 3 Plus · "Keep Home Close"

A 12-page static sales website (HTML, CSS, JavaScript) for the EcoFlow RIVER 3 Plus, built by **Kindling Studio** for a university web design project. No build tools, no frameworks: open `index.html` in a browser and it works.

## Pages (12 counted + Privacy Policy)

| # | File | Page |
|---|------|------|
| 1 | `index.html` | Home |
| 2 | `product.html` | Product and buy |
| 3 | `specs.html` | Tech specs and comparison |
| 4 | `outdoors.html` | Moment: family outdoors |
| 5 | `work-anywhere.html` | Moment: work anywhere |
| 6 | `home-backup.html` | Moment: home backup |
| 7 | `planner.html` | Power Planner (interactive calculator) |
| 8 | `accessories.html` | Extra batteries, solar, kits |
| 9 | `journal.html` | Three guides (SEO content) |
| 10 | `faq.html` | FAQ and support |
| 11 | `contact.html` | **Call-to-action form with PDPA consent** |
| 12 | `team.html` | **Group number, members, emails, responsibility matrix** |
| + | `privacy.html` | PDPA Privacy Policy (not counted) |

## Before you submit: 4 edits

1. **`team.html`**: replace every `[bracketed]` value (group number, tutorial group, module, names, emails). Also update the title line at the top of the file.
2. **Images**: every image slot is filled (see *Images* below). Optional: download them into `assets/img/` so the site doesn't depend on other servers.
3. **Buy links**: open `assets/js/main.js` and change `BUY_LINKS` at the top. Put your real Shopee listing URL in place of the Shopee search link. Every Buy button on the site updates.
4. **Form (optional)**: the form works in demo mode (validates, shows the thank-you, sends nothing). To receive real submissions, create a free form at formspree.io and paste its endpoint into `data-endpoint=""` on the `<form>` tag in `contact.html`.

## Images

Every image is saved in `assets/img/photos/`, so the site works offline and can't break if a listing changes. Fonts are self-hosted in `assets/fonts/`.

- **Product and accessory photos** (`lazada-*.webp`) come from the RIVER 3 Plus Lazada listing and EcoFlow's Lazada listings for the Extra Batteries and 220W solar panel.
- **Lifestyle photos** (`pexels-*.jpg`) come from Pexels (free licence, no attribution required, credited in the footer anyway):
  - Night tents: Matthew DeVries · Father and children in tent: Kampus Production
  - Laptop with sea view: mark chaves · Videographer on beach: Kyle Loftus
  - Lamp in dark room: George Shervashidze · Family picnic: Nataliya Vaitkevich
  - Tent by the sea: Mengliu Di · Desk lamp with bookshelves: Feyza Nur · Laptop on grass: Picography

## Publish on GitHub Pages

1. Create a new **public** repository on GitHub, for example `keep-home-close`.
2. Click **Add file > Upload files** and drag in **everything inside this folder** (so `index.html` sits at the top level of the repo, not inside a subfolder). Commit.
3. Go to **Settings > Pages**. Under *Build and deployment*, set Source to **Deploy from a branch**, Branch to **main** and folder to **/ (root)**. Save.
4. Wait a minute or two. Your site appears at `https://YOUR-USERNAME.github.io/keep-home-close/`. Submit that link on NTULearn.
5. In `sitemap.xml` and `robots.txt`, replace `YOUR-USERNAME.github.io/keep-home-close` with your real address, then upload again.

Guides: https://docs.github.com/en/pages/quickstart

## Folder structure

```
index.html … privacy.html     13 pages
assets/css/styles.css         all styling (design tokens at the top)
assets/js/main.js             nav, buy links, image placeholders, gallery
assets/js/planner.js          Power Planner logic
assets/js/form.js             form validation and PDPA consent record
assets/img/                   your photos + favicon.svg
sitemap.xml, robots.txt       SEO
.nojekyll                     tells GitHub Pages to serve files as-is
```

## Design system

- **Fonts** (Google Fonts): Newsreader (headlines), Geist (body), Geist Mono (numbers)
- **Colours**: Paper `#F3F0E8`, Stone `#E6E1D6`, Ink `#161614`, Graphite `#5C5850`, Ember `#C8461F` (buttons), Night `#12171C`
- Change any colour once in `:root` at the top of `styles.css`.

## Disclaimer

Student project. Not affiliated with or endorsed by EcoFlow. Product specifications come from public spec sheets; purchases happen on the official marketplace listings.
