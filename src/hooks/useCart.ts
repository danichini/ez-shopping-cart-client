import { useEffect, useState } from "react";
import type { CartItem, Guitar } from "../types";

export const useCart = () => {
  const initialCart = (): CartItem[] => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

  const [cart, setCart] = useState(initialCart);

  const MAX_ITEMS = 5;

  useEffect(() => {
    saveLocalStorage();
  }, [cart]);

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

  

  return {
    cart,
    incleaseQuantity,
    decreaseQuantity,
    clearCart,
  };
};
