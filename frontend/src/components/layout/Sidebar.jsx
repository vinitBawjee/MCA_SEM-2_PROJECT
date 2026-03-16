import "./Sidebar.css";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";

const Sidebar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const active = (path) => {
    if (path === "/account/profile" && location.pathname === "/account") {
      return "dash-menu-item dash-active";
    }
    return location.pathname === path
      ? "dash-menu-item dash-active"
      : "dash-menu-item";
  };

  return (
    <div className="dash-sidebar">

      <ul className="dash-menu">
        <li>
          <Link to="/account/profile" className={active("/account/profile")}>
            Profile
          </Link>
        </li>

        <li>
          <Link to="/account/products" className={active("/account/products")}>
            Auctions
          </Link>
        </li>

        <li>
          <Link to="/account/bids" className={active("/account/bids")}>
            Bidding
          </Link>
        </li>

        <li>
          <Link to="/account/winning-bids" className={active("/account/winning-bids")}>
            Winning Bids
          </Link>
        </li>
      </ul>

      <div className="dash-logout">
        <button className="dash-logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

    </div>
  );
};

export default Sidebar;