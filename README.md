# Alpha Store — fixed & responsive

Vite multi-page e-commerce demo.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Folder layout

```
index.html            home page
product_page.html     product listing (search / filter / sort)
product.html          cart page
vite.config.js        multi-page build config (all 3 pages)
public/               put ALL images here: logo.png, alpha.png, cell.png, Ps5.png ...
src/
  main.js             entry for index.html + product_page.html
  cart_page.js        entry for product.html
  style.css           one stylesheet for every page
  nav.js              mobile menu + active link
  cards.js            product grid rendering, search/filter/sort
  Addtocart.js        add item to cart
  quantity.js         stepper on a product card
  cartQuantity.js     stepper inside the cart
  removeFromCart.js   remove item
  totalBill.js        sub total / tax / final total
  updateCartValue.js  cart badge
  localstorage.js     safe cart storage helpers
  toast.js            toast notifications
  api/product.json    product data
```

Images are referenced from the site root (`/logo.png`, `/cell.png`), so every file in
`public/` is served at `/<filename>` by Vite. Keep the exact file names used in
`src/api/product.json`.
