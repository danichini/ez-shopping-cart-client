import { db } from "../data/db";
import type { Guitar, CartItem } from "../types";

const MAX_ITEMS = 5;

export type CartActions =
  | { type: "add-to-cart"; payload: { guitar: Guitar } }
  | { type: "remove-from-cart"; payload: { id: Guitar["id"] } }
  | { type: "increase-quantity"; payload: { id: Guitar["id"] } }
  | { type: "decrease-quantity"; payload: { id: Guitar["id"] } }
  | { type: "clear-cart" };

export type CartState = {
  guitar: Guitar[];
  cart: CartItem[];
};
export const initialState: CartState = {
  guitar: db,
  cart: [],
};

export const cartReducer = (
  state: CartState = initialState,
  action: CartActions
) => {
  if (action.type === "add-to-cart") {
    const { cart } = state;

    const itemExists = cart.find(({ id }) => action.payload.guitar.id === id);

    let updatedCart: CartItem[] = [];
    if (itemExists) {
      updatedCart = cart.map((cartItem) => {
        if (cartItem.id === action.payload.guitar.id) {
          if (cartItem.quantity < MAX_ITEMS) {
            return { ...cartItem, quantity: cartItem.quantity + 1 };
          } else {
            return cartItem;
          }
        } else {
          return cartItem;
        }
      });
    } else {
      const newItem: CartItem = { ...action.payload.guitar, quantity: 1 };
      updatedCart = [...cart, newItem];
    }
    console.log("???????", updatedCart);

    return {
      ...state,
      cart: updatedCart,
    };
  }
  if (action.type === "remove-from-cart") {
    const { cart } = state
    const updatedCart = cart.filter((item) => action.payload.id !== item.id)
    return {
      ...state,
      cart: updatedCart,
    };
  }
  if (action.type === "increase-quantity") {
    return {
      ...state,
      cart: [...state.cart, action.payload],
    };
  }
  if (action.type === "decrease-quantity") {
    return {
      ...state,
      cart: [...state.cart, action.payload],
    };
  }
  if (action.type === "clear-cart") {
    return {
      ...state,
      cart: [],
    };
  }
};
