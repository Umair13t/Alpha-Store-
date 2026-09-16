/** Mobile menu toggle + active link highlighting. Safe on every page. */
export const initNav = () => {
  const burger = document.querySelector(".nav__burger");
  const menu = document.querySelector(".nav__menu");

  if (burger && menu) {
    burger.addEventListener("click", () => {
      const open = menu.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", String(open));
      burger.innerHTML = open
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });

    menu.querySelectorAll("a").forEach((link) =>
      link.addEventListener("click", () => menu.classList.remove("is-open"))
    );
  }

  const here = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav__links a").forEach((link) => {
    if (link.getAttribute("href") === here) link.setAttribute("aria-current", "page");
  });

  document.querySelector(".year") &&
    (document.querySelectorAll(".year").forEach((el) => {
      el.textContent = new Date().getFullYear();
    }));
};
