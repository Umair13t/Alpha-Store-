import { addlocal, saveLocal, sameId } from "./localstorage.js";
import { toast } from "./toast.js";
import { totalBill } from "./totalBill.js";
import { updateCartValue } from "./updateCartValue.js";

export const removeFromCart = (id, name) => {
  // `!==` compared a number id against a string id and silently removed
  // nothing. sameId() normalises both sides.
  const updated = addlocal().filter((item) => !sameId(item.id, id));

  saveLocal(updated);
  updateCartValue();
  totalBill();
  toast(`${name} removed from your cart`, "error");

  return updated;
};
