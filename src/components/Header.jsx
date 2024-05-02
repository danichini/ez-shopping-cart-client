export default function Header() {
  return (
    <header className="py-5 header">
      <div className="container-xl">
        <div className="row justify-content-center justify-content-md-between">
          <div className="col-8 col-md-3">
            <a href="index.html">
              <img
                className="img-fluid"
                src="/img/logo.svg"
                alt="image logo"
              />
            </a>
          </div>
          <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
            <div className="shopping-cart">
              <img
                className="img-fluid"
                src="/img/carrito.png"
                alt="image shopping cart"
              />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
