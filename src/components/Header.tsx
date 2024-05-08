import { useMemo } from "react";
import type { CartItem, Guitar } from "../types";
import { CartActions } from "../reducers/cart-reducer";

type HeaderProps = {
  cart: CartItem[];
  incleaseQuantity: (id: Guitar["id"]) => void;
  decreaseQuantity: (id: Guitar["id"]) => void;
  clearCart: () => void;
  dispatch: React.Dispatch<CartActions>;
};

export default function Header({
  cart,
  dispatch,
  incleaseQuantity,
  decreaseQuantity,
  clearCart,
}: HeaderProps) {
  const cartTotal = useMemo(
    () =>
      cart.reduce(
        (prevTotal, { quantity, price }) => prevTotal + quantity * price,
        0
      ),
    [cart]
  );

  return (
    <header className="py-5 header">
      <div className="container-xl">
        <div className="row justify-content-center justify-content-md-between">
          <div className="col-8 col-md-3">
            <a href="index.html">
              {/* <img className="img-fluid" src="/img/logo.svg" alt="image logo" /> */}
            </a>
          </div>
          <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
            <div className="shopping-cart">
              <img
                className="img-fluid"
                src="/img/carrito.png"
                alt="image shopping cart"
              />
              <div id="shopping-cart" className="bg-white p-3">
                {cart.length ? (
                  <>
                    <table className="w-100 table">
                      <thead>
                        <tr>
                          <th>Imagen</th>
                          <th>Nombre</th>
                          <th>Precio</th>
                          <th>Cantidad</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map((guitar) => (
                          <tr key={guitar.id}>
                            <td>
                              <img
                                className="img-fluid"
                                src={`/img/${guitar.image}.jpg`}
                                alt="imagen guitarra"
                              />
                            </td>
                            <td>SRV</td>
                            <td className="fw-bold">${guitar.price}</td>
                            <td className="flex align-items-start gap-4">
                              <button
                                type="button"
                                className="btn btn-dark"
                                onClick={() => decreaseQuantity(guitar.id)}
                              >
                                -
                              </button>
                              {guitar.quantity}
                              <button
                                type="button"
                                className="btn btn-dark"
                                onClick={() => incleaseQuantity(guitar.id)}
                              >
                                +
                              </button>
                            </td>
                            <td>
                              <button
                                className="btn btn-danger"
                                type="button"
                                onClick={() =>
                                  dispatch({
                                    type: "remove-from-cart",
                                    payload: { id: guitar.id },
                                  })
                                }
                              >
                                X
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p className="text-end">
                      Total to pay:{" "}
                      <span className="fw-bold">${cartTotal}</span>
                    </p>
                  </>
                ) : (
                  <p className="text-center">Cart is empty</p>
                )}

                <button
                  className="btn btn-dark w-100 mt-3 p-2"
                  onClick={clearCart}
                >
                  Empty Cart
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
