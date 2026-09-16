import { addlocal, money } from "./localstorage.js";

export const TAX = 50;

/** Recomputes totals from the cart. Silently does nothing off the cart page. */
export const totalBill = () => {
  const subEl = document.querySelector(".subTotal");
  const taxEl = document.querySelector(".proTax");
  const finalEl = document.querySelector(".finalTotal");
  if (!subEl || !taxEl || !finalEl) return;

  const cart = addlocal();
  // Total is recalculated instead of trusted, so a stale stored value
  // can never desync the bill from the quantities on screen.
  const subTotal = cart.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0),
    0
  );
  const tax = cart.length ? TAX : 0;

  subEl.textContent = money(subTotal);
  taxEl.textContent = money(tax);
  finalEl.textContent = money(subTotal + tax);
};
