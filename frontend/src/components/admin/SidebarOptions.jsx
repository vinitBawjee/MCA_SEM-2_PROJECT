import { useNavigate, useLocation } from "react-router-dom";
import "./SidebarOptions.css";

const SidebarOptions = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const topButtons = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Product Management", path: "/admin/products" },
    { name: "Bids", path: "/admin/bids" },
    { name: "Winning Bids", path: "/admin/winning-bids" },
  ];

  const bottomButtons = [
    { name: "Seller", path: "/admin/sellers" },
    { name: "Buyer", path: "/admin/buyers" },
    { name: "Contact", path: "/admin/contacts" },
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