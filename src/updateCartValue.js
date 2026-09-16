import { addlocal } from "./localstorage.js";

/**
 * Updates every cart badge on the page.
 * Guarded so importing this module on a page without a badge no longer
 * throws "Cannot set properties of null".
 */
export const updateCartValue = () => {
  const badges = document.querySelectorAll(".cart-count");
  if (!badges.length) return;

  const total = addlocal().reduce((sum, item) => sum + Number(item.quantity || 0), 0);
  badges.forEach((badge) => {
    badge.textContent = total;
  });
};
