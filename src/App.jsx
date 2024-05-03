import { useEffect, useState } from "react";
import Guitar from "./components/Guitar";
import Header from "./components/Header";
import { db } from "./data/db";

function App() {
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

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        incleaseQuantity={incleaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar key={guitar.id} guitar={guitar} addToCart={addToCart} />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">Guitar Land</p>
        </div>
      </footer>
    </>
  );
}

export default App;
