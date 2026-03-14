import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SidebarOptions.css";

const SidebarOptions = () => {
  const [active, setActive] = useState("BuyerManagement");
  const navigate = useNavigate();

  const buttons = [
    { name: "Dashboard", path: "/seller/products" },
    { name: "Product Management", path: "/seller/products" },
    { name: "Bidding History", path: "/seller/products" },
    { name: "Transaction History", path: "/seller/products" },
    { name: "Contact Us", path: "/seller/products" },
    { name: "Profile", path: "/seller/products" },
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