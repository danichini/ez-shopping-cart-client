import { useEffect, useMemo, useState } from "react";
import { db } from "../data/db";

export const useCart = () => {
  const initialCart = () => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);

  const MAX_ITEMS = 5;

  useEffect(() => {
    saveLocalStorage();
  }, [cart]);

  function addToCart(guitar) {
    const itemExists = cart.findIndex(({ id }) => guitar.id === id);

    if (itemExists >= 0) {
      const updatedCart = [...cart];
      updatedCart[itemExists].quantity++;
      setCart(updatedCart);
    } else {
      guitar.quantity = 1;
      setCart((prevCart) => [...prevCart, guitar]);
    }
  }

  function removeFromCart(id) {
    setCart((prevCart) => prevCart.filter((item) => id !== item.id));
  }

  function incleaseQuantity(id) {
    const updatedCart = cart.map((item) => {
      if ((item.id === id) & (item.quantity < MAX_ITEMS)) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);
  }

  function decreaseQuantity(id) {
    const updatedCart = cart.map((item) => {
      if ((item.id === id) & (item.quantity > 1)) {
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
