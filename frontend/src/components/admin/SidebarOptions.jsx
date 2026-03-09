import { useNavigate, useLocation } from "react-router-dom";
import "./SidebarOptions.css";

const SidebarOptions = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const buttons = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Product", path: "/admin/products" },
    { name: "Seller", path: "/admin/sellers" },
    { name: "Buyer", path: "/admin/buyers" },
  ];

  return (
    <div className="sidebar">
      {buttons.map((btn) => (
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