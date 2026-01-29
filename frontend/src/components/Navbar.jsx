import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom py-3">
      <div className="container">

        {/* Logo */}
        <Link className="navbar-brand fw-bold fs-3" to="/">
          Auction
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#auctionNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="auctionNavbar">

          {/* Center Menu */}
          <ul className="navbar-nav mx-auto gap-4">

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
                Auctions
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Live Auctions</a></li>
                <li><a className="dropdown-item" href="#">Upcoming Auctions</a></li>
                <li><a className="dropdown-item" href="#">Past Auctions</a></li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
                Departments
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Art</a></li>
                <li><a className="dropdown-item" href="#">Jewellery</a></li>
                <li><a className="dropdown-item" href="#">Collectibles</a></li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
                About Us
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Company</a></li>
                <li><a className="dropdown-item" href="#">Contact</a></li>
              </ul>
            </li>

          </ul>

          {/* Right Side */}
          <div className="d-flex align-items-center gap-4">

            {/* Search icon */}
            <i className="fa-solid fa-magnifying-glass fs-5 cursor-pointer"></i>

            {/* Login Dropdown */}
            <div className="dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                data-bs-toggle="dropdown"
              >
                Login
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <Link className="dropdown-item" to="/auth?tab=login">
                    Login
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/auth?tab=register">
                    Signup
                  </Link>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
