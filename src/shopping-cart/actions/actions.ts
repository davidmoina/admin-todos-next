import { getCookie, hasCookie, setCookie } from "cookies-next";

export const getCookieCart = (): Record<string, number> => {
  if (hasCookie("cart")) {
    const cookieCart = JSON.parse(getCookie("cart") ?? "{}");

    return cookieCart;
  }

  return {};
};

export const addProductToCart = (id: string): void => {
  const cookieCart = getCookieCart();

  if (cookieCart[id]) {
    cookieCart[id] += 1;
  } else {
    cookieCart[id] = 1;
  }

  setCookie("cart", JSON.stringify(cookieCart));
};

export const removeProductFromCart = (id: string): void => {
  const cookieCart = getCookieCart();

  delete cookieCart[id];

  setCookie("cart", JSON.stringify(cookieCart));
};

export const removeSingleItemFromCart = (id: string): void => {
  const cookieCart = getCookieCart();

  if (!cookieCart[id]) return;

  const itemsInCart = cookieCart[id] - 1;

  if (itemsInCart <= 0) {
    delete cookieCart[id];
  } else {
    cookieCart[id] = itemsInCart;
  }

  setCookie("cart", JSON.stringify(cookieCart));
};
