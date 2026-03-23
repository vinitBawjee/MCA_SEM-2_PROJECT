import { useNavigate, useLocation } from "react-router-dom";
import "./SidebarOptions.css";

const SidebarOptions = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const topButtons = [
    { name: "Dashboard", path: "/seller/dashboard" },
    { name: "Product Management", path: "/seller/products" },
    { name: "Bidding", path: "/seller/bids" },
    { name: "Winning Auctions", path: "/seller/completed-auctions" }
  ];

  const bottomButtons = [
    { name: "Profile", path: "/seller/profile" },
    { name: "Contact Us", path: "/seller/contact" }
  ];

  return (
    <div className="sidebar">
      {topButtons.map((btn) => (
        <button
          key={btn.name}
          className={`sidebar-btn ${
            location.pathname === btn.path ? "active" : ""
          }`}
          onClick={() => navigate(btn.path)}
        >
          {btn.name}
        </button>
      ))}

      <div className="divider"></div>

      {bottomButtons.map((btn) => (
        <button
          key={btn.name}
          className={`sidebar-btn ${
            location.pathname === btn.path ? "active" : ""
          }`}
          onClick={() => navigate(btn.path)}
        >
          {btn.name}
        </button>
      ))}
    </div>
  );
};

export default SidebarOptions;