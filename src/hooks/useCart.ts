import { useEffect, useMemo, useState } from "react";
import { db } from "../data/db";
import type { CartItem, Guitar } from "../types";

export const useCart = () => {
  const initialCart = (): CartItem[] => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);

  const MAX_ITEMS = 5;

  useEffect(() => {
    saveLocalStorage();
  }, [cart]);

  function addToCart(guitar: Guitar) {
    const itemExists = cart.findIndex(({ id }) => guitar.id === id);

    if (itemExists >= 0) {
      const updatedCart = [...cart];
      updatedCart[itemExists].quantity++;
      setCart(updatedCart);
    } else {
      const newItem: CartItem = { ...guitar, quantity: 1 };
      setCart((prevCart) => [...prevCart, newItem]);
    }
  }

  function removeFromCart(id: Guitar["id"]) {
    setCart((prevCart) => prevCart.filter((item) => id !== item.id));
  }

  function incleaseQuantity(id: Guitar["id"]) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);
  }

  function decreaseQuantity(id: Guitar["id"]) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(updatedCart);
  }

  function clearCart() {
    setCart([]);
  }

  function saveLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  const cartTotal = useMemo(
    () =>
      cart.reduce(
        (prevTotal, { quantity, price }) => prevTotal + quantity * price,
        0
      ),
    [cart]
  );

  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    incleaseQuantity,
    decreaseQuantity,
    clearCart,
    cartTotal,
  };
};
