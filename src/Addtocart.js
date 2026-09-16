import { addlocal, saveLocal, sameId } from "./localstorage.js";
import { updateCartValue } from "./updateCartValue.js";

/** Adds the card's chosen quantity to the cart and resets the stepper. */
export const Addtocart = (event, product) => {
  const { id, name, image, company, color, category, price } = product;

  const card = document.querySelector(`#card${id}`);
  const valueEl = card ? card.querySelector(".qty__value") : null;
  const qty = Math.max(1, Number(valueEl ? valueEl.textContent : 1) || 1);

  const cart = addlocal();
  const existing = cart.find((item) => sameId(item.id, id));

  if (existing) {
    existing.quantity = Number(existing.quantity || 0) + qty;
    existing.Total = existing.quantity * Number(existing.price);
  } else {
    cart.push({
      id,
      name,
      image,
      company,
      color,
      category,
      price: Number(price),
      quantity: qty,
      Total: qty * Number(price),
    });
  }

  saveLocal(cart);
  updateCartValue();

  // reset the card stepper so the next add starts from 1
  if (valueEl) valueEl.textContent = 1;

  return qty;
};
