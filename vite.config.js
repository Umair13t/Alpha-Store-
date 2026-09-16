import { defineConfig } from "vite";
import { resolve } from "path";

// Multi-page build: every HTML file must be listed or it is dropped from dist/.
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        products: resolve(__dirname, "product_page.html"),
        cart: resolve(__dirname, "product.html"),
      },
    },
  },
});
