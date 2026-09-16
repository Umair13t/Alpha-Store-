/**
 * Single source of truth for the cart in localStorage.
 * Every read is guarded: a corrupted / non-array value can no longer
 * crash the whole page the way `JSON.parse` did before.
 */
const KEY = "local_pro_ls";

export const addlocal = () => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn("Cart storage unreadable, starting empty.", err);
    return [];
  }
};

export const saveLocal = (cart) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(cart));
  } catch (err) {
    console.warn("Could not save cart.", err);
  }
};

/** Ids coming from HTML attributes are strings, ids from JSON are numbers. */
export const sameId = (a, b) => String(a) === String(b);

export const money = (n) => `$${Number(n || 0).toFixed(2)}`;
