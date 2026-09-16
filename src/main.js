import "./style.css";
import product from "./api/product.json";
import { showcards, initToolbar } from "./cards.js";
import { updateCartValue } from "./updateCartValue.js";
import { initNav } from "./nav.js";

const boot = () => {
  initNav();
  showcards(product);   // no-ops on pages without a product grid
  initToolbar(product);
  updateCartValue();
};

// Scripts are modules (deferred), but this keeps it safe if the tag is moved.
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
