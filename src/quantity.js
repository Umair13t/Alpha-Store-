/** Product-card stepper (before the item is in the cart). */
export const quantity = (event, id) => {
  const btn = event.target.closest("button");
  if (!btn) return;

  const card = document.querySelector(`#card${id}`);
  if (!card) return;

  const valueEl = card.querySelector(".qty__value");
  let count = Number(valueEl.textContent) || 1;

  if (btn.classList.contains("qty__plus")) count = Math.min(count + 1, 99);
  if (btn.classList.contains("qty__minus")) count = Math.max(count - 1, 1);

  valueEl.textContent = count;
};
