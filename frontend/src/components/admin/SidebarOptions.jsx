import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SidebarOptions.css";

const SidebarOptions = () => {
  const [active, setActive] = useState("BuyerManagement");
  const navigate = useNavigate();

  const buttons = [
    { name: "BuyerManagement", path: "/admin/buyers" },
    { name: "SellerManagement", path: "/admin/sellers" },
    { name: "ProductManagement", path: "/admin/products" },
  ];

  const handleClick = (btn) => {
    setActive(btn.name);
    navigate(btn.path);
  };

  return (
    <div className="sidebar">
      {buttons.map((btn) => (
        <button
          key={btn.name}
          className={`sidebar-btn ${active === btn.name ? "active" : ""}`}
          onClick={() => handleClick(btn)}
        >
          {btn.name}
        </button>
      ))}
    </div>
  );
};

export default SidebarOptions;