/**
 * Toasts used to be appended to <body> and never removed, so they piled
 * up forever. Now they live in one stack and clean themselves up.
 */
const getStack = () => {
  let stack = document.querySelector(".toast-stack");
  if (!stack) {
    stack = document.createElement("div");
    stack.className = "toast-stack";
    document.body.appendChild(stack);
  }
  return stack;
};

export const toast = (message, type = "success") => {
  const stack = getStack();
  const el = document.createElement("div");
  el.className = `toast${type === "error" ? " toast--error" : ""}`;
  el.setAttribute("role", "status");

  const icon = document.createElement("i");
  icon.className =
    type === "error" ? "fa-solid fa-circle-exclamation" : "fa-solid fa-circle-check";

  const text = document.createElement("span");
  text.textContent = message;

  el.append(icon, text);
  stack.appendChild(el);

  setTimeout(() => {
    el.classList.add("is-hiding");
    el.addEventListener("animationend", () => el.remove(), { once: true });
    setTimeout(() => el.remove(), 600);
  }, 2400);
};
