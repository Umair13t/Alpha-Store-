import { addlocal, saveLocal, sameId } from "./localstorage.js";
import { totalBill } from "./totalBill.js";
import { updateCartValue } from "./updateCartValue.js";

/** Stepper inside the cart page — writes straight to storage. */
export const cartQuantity = (event, id) => {
  const btn = event.target.closest("button");
  if (!btn) return null;

  const cart = addlocal();
  const product = cart.find((item) => sameId(item.id, id));
  if (!product) return null;

  if (btn.classList.contains("qty__plus")) {
    product.quantity = Math.min(Number(product.quantity) + 1, 99);
  }
  if (btn.classList.contains("qty__minus")) {
    product.quantity = Math.max(Number(product.quantity) - 1, 1);
  }

  product.Total = Number(product.price) * Number(product.quantity);

  saveLocal(cart);
  totalBill();
  updateCartValue();

  return product;
};
