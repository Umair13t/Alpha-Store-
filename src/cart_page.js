import "./style.css";
import { addlocal, money } from "./localstorage.js";
import { cartQuantity } from "./cartQuantity.js";
import { removeFromCart } from "./removeFromCart.js";
import { totalBill } from "./totalBill.js";
import { updateCartValue } from "./updateCartValue.js";
import { initNav } from "./nav.js";
import { toast } from "./toast.js";

const render = () => {
  const list = document.querySelector(".cartElementContainer");
  const template = document.querySelector("#cartTemplate");
  if (!list || !template) return;

  const cart = addlocal();
  list.innerHTML = "";

  if (!cart.length) {
    list.innerHTML = `
      <div class="empty">
        <i class="fa-solid fa-cart-shopping"></i>
        <h3>Your cart is empty</h3>
        <p>Browse the store and add something you like.</p>
        <p style="margin-top:14px">
          <a class="btn btn--primary" href="product_page.html">Shop products</a>
        </p>
      </div>`;
    totalBill();
    return;
  }

  cart.forEach((item) => {
    const { id, name, image, category, price, quantity } = item;
    const clone = document.importNode(template.content, true);
    const row = clone.querySelector(".cart-item");

    row.id = `card${id}`;
    clone.querySelector(".cart-item__title").textContent = name;
    clone.querySelector(".card__cat").textContent = category;
    clone.querySelector(".unit-price").textContent = `${money(price)} each`;
    clone.querySelector(".qty__value").textContent = quantity;
    clone.querySelector(".price-value").textContent = money(price * quantity);

    const img = clone.querySelector(".cart-item__img img");
    img.src = image;
    img.alt = name;

    clone.querySelector(".qty").addEventListener("click", (event) => {
      const updated = cartQuantity(event, id);
      if (!updated) return;
      const card = document.querySelector(`#card${id}`);
      card.querySelector(".qty__value").textContent = updated.quantity;
      card.querySelector(".price-value").textContent = money(updated.Total);
    });

    clone.querySelector(".removeCart").addEventListener("click", () => {
      removeFromCart(id, name);
      render(); // re-render so the empty state appears when the last item goes
    });

    list.appendChild(clone);
  });

  totalBill();
};

const boot = () => {
  initNav();
  render();
  updateCartValue();

  document.querySelector(".checkout")?.addEventListener("click", () => {
    if (!addlocal().length) {
      toast("Your cart is empty.", "error");
      return;
    }
    toast("Checkout is a demo — no payment was taken.");
  });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
