import type { CartItem, Guitar } from "../types";

type HeaderProps = {
  cart: CartItem[];
  removeFromCart: (id: Guitar["id"]) => void;
  incleaseQuantity: (id: Guitar["id"]) => void;
  decreaseQuantity: (id: Guitar["id"]) => void;
  clearCart: () => void;
  cartTotal: number;
};

export default function Header({
  cart,
  removeFromCart,
  incleaseQuantity,
  decreaseQuantity,
  clearCart,
  cartTotal,
}: HeaderProps) {
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
                                onClick={() => removeFromCart(guitar.id)}
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
