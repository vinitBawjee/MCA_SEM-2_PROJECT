import { useState } from "react";
import "./SidebarOptions.css";

const SidebarOptions = () => {
  const [active, setActive] = useState("Dashboard");

  const buttons = ["Dashboard", "Settings"];

  return (
    <div className="sidebar">
      {buttons.map((btn) => (
        <button
          key={btn}
          className={`sidebar-btn ${active === btn ? "active" : ""}`}
          onClick={() => setActive(btn)}
        >
          {btn}
        </button>
      ))}
    </div>
  );
};

export default SidebarOptions;
