import { useState } from "react";

import AuthModal from "../auth/AuthModal";
import "./Navbar.css";

export default function Navbar() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="nav-top">
          <div className="logo-group">
            <div className="logo-box">USV</div>
            <h2 className="brand-name">AuctionSite</h2>
          </div>

          <div className="search-box">
            <input type="text" placeholder="Search for items..." />
          </div>

          <button
            className="login-btn"
            onClick={() => setShowModal(true)}
          >
            Sign in / Sign up
          </button>
        </div>

        <div className="nav-bottom">
          <ul className="category-menu">
            <li className="menu-item">
              Auction
              <ul className="dropdown-content">
                <li>Buy</li>
                <li>Sell</li>
              </ul>
            </li>

            <li className="menu-item">
              Department
              <ul className="dropdown-content">
                <li>Indian Art</li>
                <li>Electronics</li>
                <li>Jewellery</li>
              </ul>
            </li>

            <li className="menu-item">
              Series
              <ul className="dropdown-content">
                <li>Private Services</li>
                <li>Storage Series</li>
              </ul>
            </li>

            <li className="menu-item">About Us</li>
          </ul>
        </div>
      </nav>

      {showModal && <AuthModal close={() => setShowModal(false)} />}
    </>
  );
}