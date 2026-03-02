import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";

import AuthModal from "../auth/AuthModal";
import "./Navbar.css";

export default function Navbar() {
  const [showModal, setShowModal] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <>
      <nav className="navbar">
        <div className="nav-top">
          <div className="logo-group">
            {/* <div className="logo-box">USV</div> */}
            <h2 className="brand-name">AuctionSite</h2>
          </div>

          {/* <div className="search-box">
            <input type="text" placeholder="Search for items..." />
          </div> */}

          <ul className="category-menu">
            <li className="menu-item">Home</li>
            <li className="menu-item">Auction</li>
            <li className="menu-item">Blog</li>
            <li className="menu-item">About</li>
            <li className="menu-item">Contact</li>
          </ul>

          {!user ? (
            <button
              className="login-btn"
              onClick={() => setShowModal(true)}
            >
              Sign in / Sign up
            </button>
          ) : (
            <div className="user-profile">
              <div className="profile-icon">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <span className="user-name">{user.name}</span>
            </div>
          )}
        </div>
      </nav>

      {showModal && <AuthModal close={() => setShowModal(false)} />}
    </>
  );
}