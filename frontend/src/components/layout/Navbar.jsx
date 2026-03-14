import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import AuthModal from "../auth/AuthModal";
import "./Navbar.css";

export default function Navbar() {
  const [showModal, setShowModal] = useState(false);

  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <nav className="navbar">
        <div className="nav-top">
          <div className="logo-group">
            <h2 className="brand-name">AuctionSite</h2>
          </div>

          <ul className="category-menu">
            <li className="menu-item">
              <Link to="/">Home</Link>
            </li>

            <li className="menu-item">
              <Link to="/auctions">Auction</Link>
            </li>

            <li className="menu-item">
              <Link to="/about">About</Link>
            </li>

            <li className="menu-item">
              <Link to="/contact">Contact</Link>
            </li>
          </ul>

          {!user ? (
            <button className="login-btn" onClick={() => setShowModal(true)}>
              Sign in / Sign up
            </button>
          ) : (
            <div className="flex">
              <span className="user-name">{user.name}</span>
              <Link to="/account" className="user-profile">
                <div className="profile-icon">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              </Link>
            </div>
          )}
        </div>
      </nav>

      {showModal && <AuthModal close={() => setShowModal(false)} />}
    </>
  );
}
