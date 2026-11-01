# Images: what goes where

## Lifestyle photos (already in the site)

All lifestyle photos load from Unsplash under the free Unsplash License. The full list and photographers are on `team.html#credits`. To find them, search the HTML files for `images.unsplash.com`.

To swap a photo, replace its `images.unsplash.com/photo-...` address in the page (in both `src` and `srcset`), or point it at your own file in `assets/img/`.

## Product photos (from your Lazada listing)

The River 3 Plus photos are in `assets/img/product/`, taken from the EcoFlow Authorized Store listing on Lazada. They're bundled with the site, so they work offline and need no download.

| File | Used for |
|------|----------|
| `product-white.jpg` | Clean product shot (cut out onto white): home product card, Essential card, product page main image, Tech specs banner |
| `official.jpg`, `carry.jpg`, `tent-table.jpg`, `beach.jpg`, `lamp.jpg`, `ups-desk.jpg` | Full Lazada listing images, shown as the product page gallery |
| `crop-carry.jpg`, `crop-tent.jpg`, `crop-ups.jpg`, `crop-beach.jpg`, `crop-lamp.jpg` | The same photos cropped to remove text, used in feature sections, the Explorer card, Camping and Home backup |

The originals are about 430 px wide, so they're upscaled and look softest when shown large. If you can save larger versions from Lazada (open the image in a new tab first), save them over these files with the same names.

Product photos belong to EcoFlow. They're credited on `team.html`; mention it in your presentation too.
