import "./DashboardSidebar.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";

const Sidebar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="dash-sidebar">

      <ul className="dash-menu">
        <li className="dash-menu-item dash-active">Dashboard</li>
        <li className="dash-menu-item">Product List</li>
        <li className="dash-menu-item">Bidding</li>
        <li className="dash-menu-item">Winning Bids</li>
        <li className="dash-menu-item">Transaction</li>
        <li className="dash-menu-item">Profile</li>
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