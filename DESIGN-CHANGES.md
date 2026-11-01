# Design review: changes log (Designs 1–3)

Date: 1 November 2026. This is for the team. It is separate from each design's README.

## All designs: dependencies saved locally
- **Photos.** Design 1's 18 photos (10 from Pexels, 8 from the Lazada listing) are now saved in `design1/assets/img/photos/`. Design 2 already had its photos locally; its Unsplash backup links and social-preview images now point to those local files.
- **Fonts.** Every design now uses its own copy of its fonts in `assets/fonts/` instead of Google Fonts:
  - Design 1: Geist, Geist Mono, Newsreader
  - Design 2: Barlow, Barlow Condensed
  - Design 3: Archivo
- **Result.** All three designs now work offline and on any host, and all their internal links resolve.

## Design 2 (Bluehour): changes made
Each design was reviewed twice: once by a design director against Nielsen's usability heuristics, and once with an automated design checker. Design 2 scored 28/40 on the heuristics. Everything below was fixed without changing its look or concept.

**Accuracy**
- Changed "9 outputs" to **7 outputs** (3 AC, 1 USB-C, 2 USB-A, 1 car) on the home page, Work anywhere and the product page.
- Fixed the kettle FAQ, which contradicted itself: it said "up to 1200W" and then "an 1800W kettle works". It now says kettles over 1200W won't run.
- Specs: removed "200–240V" and the car-charging "220W", which is actually the solar figure. Car charging now reads "full in about 3.3 h".
- Removed claims we couldn't verify: app "outage alerts", the moulded-handle durability claim, and the "Safety Mark" mention in image descriptions.
- The warranty now says it's "5 years on the official Lazada listing we checked. Confirm it on yours."

**Honesty of the form**
- The success message no longer says "your kit is on its way" or "check your inbox". It now says the site is a student demo and that nothing is sent.
- Removed the promise of replies "within two working days", and the fictional dpo@bluehour.studio address (now a placeholder).
- The privacy policy no longer says fonts and photos load from Google or Unsplash. They're self-hosted now.

**Team page**
- Changed from three placeholder members to **four: Geng Quan, Jemond, Ryan, Martin**. Roles, bios and emails are marked to confirm.
- Removed the "Who did what" matrix (the brief doesn't require it).

**Usability and accessibility**
- Replaced the dated "11.11 is almost here" bar and footer copy with evergreen wording.
- The cookie consent banner no longer covers the hero buttons. On desktop it sits at the bottom right; on phones it's a compact bottom sheet.
- Runtime calculator:
  - On phones, the result stays pinned to the bottom of the screen while you add devices.
  - The X-Boost kettle is now counted at about 600W, so it no longer triggers a false "over 600 W" warning.
  - Results are announced to screen readers once, not twice.
- The focus outline is now black with an orange halo, so it's visible on white and on orange. Form field borders are darker, so they meet contrast requirements.
- The Escape key no longer pulls focus away from the form.
- Fixed headings that skipped a level on Journal and Team.
- The home hero photo is re-cropped so the lit tent is in frame. The hero overlay is tinted toward dusk blue, to match the "Bluehour" name. The hero headline is capped at a maximum size.
- Removed the craft-floor patterns the review flagged: the thick coloured border on the PDPA notice and on the success box, and the hero animation that started from invisible.

**Still to do for Design 2**
- Fill in the group number, roles and emails.
- Replace the `YOUR-GITHUB-USERNAME` placeholder in the canonical and social tags once the site is hosted.
- Optional: add image width/height attributes.

## Design 1 (Keep Home Close): review findings, not yet fixed
The review scored it 30/40. Its writing and its local scenes were the strongest of the three designs. These are the review's findings to fix next, in priority order:
1. **P0: the mobile menu is broken.** `backdrop-filter` on `.site-header` clips the full-screen menu to the header's 72px. Fix: move the blur to a pseudo-element, and show a Buy button on phones.
2. **P1: remove unverified claims.**
   - "360W" AC input
   - "IP54" (4 places)
   - "more than 40 protections"
   - "fire-retardant shell"
   - "230V 50Hz pure sine wave"
   - solar "13A"
   - "GaN"
   - USB-B UPS port and cable
   - "UPS off during X-Boost"
   - Also reword the warranty to "confirm on your listing".
3. **P1: replace the Lazada marketing graphics.**
   - The home hero and the product page main image are retailer infographics with baked-in text.
   - The product image shows certification and "authorized store" logos.
   - Use a clean product shot instead.
4. **P1: team.html still has placeholders.** `Group [00]` and `[Member A full name]` need the four members and the group number.
5. **P2: the product page setup chooser doesn't work.** Picking Plus, Max or Max Plus doesn't change where the Buy button goes.
6. **P2: form field borders are too faint.** They measure 1.4:1 against the background; WCAG needs at least 3:1 for field borders. On phones, the planner's total scrolls out of view.
7. **P3:**
   - Add Specs to the main nav.
   - Remove the decorative "01 ·" numbering.
   - Remove the small labels that just repeat the heading below them.
8. **Copy contradictions:**
   - The outdoors page runs more USB devices than there are ports.
   - The FAQ uses a hair dryer as its X-Boost example, then says X-Boost isn't for motors. Hair dryers have motors.
   - The FAQ asks about running a fridge but never answers it.

## Design 3 (Runtime Rating Label)
It has already been through the full design review, and every finding was fixed. Fonts are now self-hosted, which closes the one item that was open. Still to fill in: the group number, roles and emails on team.html, and the DPO contact on privacy.html.
