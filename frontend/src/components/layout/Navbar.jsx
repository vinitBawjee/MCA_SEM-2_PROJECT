import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import AuthModal from "../auth/AuthModal";
import AlertMessage from "./AlertMessage";
import { clearMessage } from "../../features/auth/authSlice";
import "./Navbar.css";

export default function Navbar() {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  const { user, message, error } = useSelector((state) => state.auth);

  return (
    <>
      <AlertMessage
        type={error ? "error" : message ? "success" : ""}
        message={error || message}
        onClose={() => dispatch(clearMessage())}
      />

      <nav className="navbar">
        <div className="nav-top">
          <div className="logo-group">
            <h2 className="brand-name">AuctionSite</h2>
          </div>

          <ul className="category-menu">
            <li className="menu-item">
              <Link to="/">Home</Link>
            </li>

            {/* <li className="menu-item">
              <Link to="/auctions">Auction</Link>
            </li> */}

            <li className="menu-item">
              <Link to="/about">About</Link>
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