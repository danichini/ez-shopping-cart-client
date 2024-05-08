import { db } from "../data/db";
import { Guitar, CartItem } from "../types";

export type CardAction =
  | { type: "add-to-cart"; payload: { guitar: Guitar } }
  | { type: "remove-from-cart"; payload: { id: Guitar["id"] } }
  | { type: "increase-quantity"; payload: { id: Guitar["id"] } }
  | { type: "decrease-quantity"; payload: { id: Guitar["id"] } }
  | { type: "clear-cart"; payload: { id: Guitar["id"] } };

type CartState = {
  data: Guitar[];
  cart: CartItem[];
};
export const initialState: CartState = {
  data: db,
  cart: [],
};

export function cartReducer(
  state: CartState = initialState,
  action: CardAction
) {
  if (action.type === "add-to-cart") {
    return {
      ...state,
      cart: [...state.cart, action.payload],
    };
  }
}
