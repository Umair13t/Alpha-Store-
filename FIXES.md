# What was broken and what changed

## 1. Critical: the cart page could never work
`cart_page.js` looked for `.cartElementContainer`, `.cartTemplate`, `#removeCart`,
`.subTotal`, `.proTax`, `.finalTotal`. **None of those existed in `product.html`**,
which instead had `.cartContainer`, `.prosubtotal`, `.total_tax`, `.final_total` and
no cart template at all. The script threw on line 1 of `totalBill()` and nothing
rendered. The cart page markup and the JS now use one matching set of names, and a
real `#cartTemplate` exists.

## 2. `index.html` had no stylesheet
`<link rel="stylesheet" href="style.css">` was commented out, and the `<script>` tag
sat **after `</html>`**. CSS is now imported through `src/main.js` (the Vite way) and
the script tag is in `<head>` with `type="module"`.

## 3. Unhandled null DOM lookups
`updateCartValue()` and `totalBill()` wrote to elements without checking they exist,
so importing them on the wrong page crashed the bundle. Both now return early.

## 4. Broken localStorage parsing
`JSON.parse` ran unguarded — one malformed value and every page died. Reads are
wrapped in try/catch and always return an array.

## 5. Id type mismatch
`removeFromCart` used `item.id !== id` with a number from JSON versus a string from
the DOM, so remove often deleted nothing. All comparisons go through `sameId()`.

## 6. Toasts never disappeared
`toast()` appended a div to `<body>` and left it there forever. Toasts now stack in
one container and remove themselves after the animation.

## 7. Duplicate IDs everywhere
`id="btn"`, `id="buy"`, `id="addtocart"`, `id="git"`, `id="cardid"` were repeated on
every card and list item — invalid HTML, and `querySelector` only ever found the
first one. All are classes now (`.addtocart`, `.btn`, ...); ids are unique per card.

## 8. Inconsistent image paths
`index.html` used `logo.png`, the other pages used `public/logo.png`, and
`product.json` used `cell.png`. In Vite, `public/` is served from `/`, so
`public/logo.png` is a 404. Everything is `/logo.png`, `/cell.png` now, plus an
`onerror` fallback that draws a placeholder instead of a broken-image icon.

## 9. Quantity never reset
After adding to the cart the card stepper stayed at the old number, so clicking twice
silently added 3 + 3. It resets to 1 after each add, and is clamped to 1–99.

## 10. Totals trusted stale data
`totalBill` summed the stored `Total` field. It now recomputes `price × quantity`, so
the bill can never drift from what's on screen. Tax is 0 on an empty cart instead of
showing $50 for nothing.

## 11. Layout bugs in the old CSS
- `.template_img { position: relative; left: 40px }` pushed every card image out of
  its box; `.category { right: 190px }` broke at any width other than the author's.
- `.temp_img img` targeted an `<img>` inside an `<img>` — it never applied.
- Two separate stylesheets (`style.css`, `product.css`, ~2,100 lines) defined the same
  classes differently, so the cart page and home page disagreed. One 900-line
  stylesheet now covers all pages.

## 12. Responsiveness
- Real mobile menu (hamburger) instead of nav links wrapping into three rows.
- Fluid type with `clamp()`, `min()` containers, no fixed pixel widths.
- Grids auto-fit: 4 → 3 → 2 → 1 columns. Cart goes two-column → stacked at 980px.
- Breakpoints at 980 / 860 / 620 / 420px, plus `prefers-reduced-motion` support.

## 13. New (small) features
- Search, category filter and price/name sorting on the products page.
- Working wishlist heart toggle, empty-cart and empty-search states.
- Per-item line totals, unit price, and a demo checkout button.
- Accessibility: `aria-label`s on icon buttons, `aria-current` on the active nav link,
  real `<h1>/<h2>/<h3>` order, focus styles on inputs.

## Removed
`tempCodeRunnerFile.js` (contained the single word `products`) and `product.css`
(merged into `style.css`).
