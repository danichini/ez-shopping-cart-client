import { useEffect, useReducer } from "react";
import Guitar from "./components/Guitar";
import Header from "./components/Header";
import { cartReducer, initialState } from "./reducers/cart-reducer";

function App() {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    dispatch({ type: "local-storage" });
  }, [state?.cart]);

  return (
    <>
      {state?.cart && <Header cart={state.cart} dispatch={dispatch} />}
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
          {state &&
            state.guitar.map((guitar) => (
              <Guitar key={guitar.id} guitar={guitar} dispatch={dispatch} />
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
