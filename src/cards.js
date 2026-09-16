import { Addtocart } from "./Addtocart.js";
import { quantity } from "./quantity.js";
import { toast } from "./toast.js";
import { money } from "./localstorage.js";

const grid = () => document.querySelector(".js_products");
const tpl = () => document.querySelector("#template");

const stars = (rating = 4) => {
  let out = "";
  for (let i = 1; i <= 5; i++) {
    out += i <= rating ? '<i class="fa-solid fa-star"></i>' : '<i class="fa-regular fa-star"></i>';
  }
  return out;
};

/** Renders a list of products into .js_products. */
export const showcards = (products) => {
  const box = grid();
  const template = tpl();
  if (!box || !template) return false;
  if (!Array.isArray(products)) return false;

  box.innerHTML = "";

  if (!products.length) {
    box.innerHTML =
      '<div class="empty"><i class="fa-solid fa-magnifying-glass"></i>No products match your search.</div>';
    return true;
  }

  const frag = document.createDocumentFragment();

  products.forEach((crnt) => {
    const { id, price, color, image, company, description, name, category, rating } = crnt;
    const clone = document.importNode(template.content, true);

    clone.querySelector(".card").id = `card${id}`;
    clone.querySelector(".card__title").textContent = name;
    clone.querySelector(".card__cat").textContent = category;
    clone.querySelector(".chip--color").textContent = color;
    clone.querySelector(".chip--company").textContent = company;
    clone.querySelector(".card__desc").textContent = description;
    clone.querySelector(".price-value").textContent = money(price);
    clone.querySelector(".rating__stars").innerHTML = stars(rating);
    clone.querySelector(".rating span").textContent = `(${(rating || 4).toFixed(1)})`;

    const img = clone.querySelector(".card__media img");
    img.src = image;
    img.alt = name;
    // Broken image files no longer leave an empty box with "Noimg".
    img.addEventListener("error", () => {
      img.src =
        "data:image/svg+xml;utf8," +
        encodeURIComponent(
          `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="150"><rect width="100%" height="100%" fill="#e6ebf7"/><text x="50%" y="52%" font-family="Arial" font-size="14" fill="#8794b3" text-anchor="middle">${name}</text></svg>`
        );
    });

    const fav = clone.querySelector(".card__fav");
    fav.addEventListener("click", () => {
      fav.classList.toggle("is-active");
      fav.setAttribute("aria-pressed", String(fav.classList.contains("is-active")));
    });

    clone.querySelector(".qty").addEventListener("click", (event) => quantity(event, id));

    clone.querySelector(".addtocart").addEventListener("click", (event) => {
      const added = Addtocart(event, crnt);
      toast(`${name} × ${added} added to your cart`);
    });

    frag.appendChild(clone);
  });

  box.appendChild(frag);
  return true;
};

/** Wires up the search / category / sort toolbar if the page has one. */
export const initToolbar = (products) => {
  const search = document.querySelector("#searchInput");
  const cat = document.querySelector("#categoryFilter");
  const sort = document.querySelector("#sortSelect");
  if (!search && !cat && !sort) return;

  if (cat) {
    [...new Set(products.map((p) => p.category))].sort().forEach((c) => {
      const opt = document.createElement("option");
      opt.value = c;
      opt.textContent = c;
      cat.appendChild(opt);
    });
  }

  const apply = () => {
    const term = (search?.value || "").trim().toLowerCase();
    const category = cat?.value || "all";
    const order = sort?.value || "default";

    let list = products.filter((p) => {
      const matchesText =
        !term ||
        p.name.toLowerCase().includes(term) ||
        p.company.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term);
      const matchesCat = category === "all" || p.category === category;
      return matchesText && matchesCat;
    });

    if (order === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (order === "high") list = [...list].sort((a, b) => b.price - a.price);
    if (order === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));

    showcards(list);
  };

  search?.addEventListener("input", apply);
  cat?.addEventListener("change", apply);
  sort?.addEventListener("change", apply);
};
