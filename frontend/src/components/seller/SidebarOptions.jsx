import { useNavigate, useLocation } from "react-router-dom";
import "./SidebarOptions.css";

const SidebarOptions = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const buttons = [
    // { name: "Dashboard", path: "/seller" },
    { name: "Product Management", path: "/seller/products" },
    { name: "Bidding", path: "/seller/bids" }
  ];

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <div className="sidebar">
      {buttons.map((btn) => (
        <button
          key={btn.name}
          className={`sidebar-btn ${
            location.pathname === btn.path ? "active" : ""
          }`}
          onClick={() => handleClick(btn.path)}
        >
          {btn.name}
        </button>
      ))}
    </div>
  );
};

export default SidebarOptions;