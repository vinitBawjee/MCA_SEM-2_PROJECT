import Sidebar from "../components/layout/Sidebar";
import { Outlet } from "react-router-dom";
import "./AccountLayout.css";

function AccountLayout() {
  return (
    <div className="userdash-layout">
      <Sidebar />

      <div className="userdash-content">
        <Outlet />
      </div>
    </div>
  );
}

export default AccountLayout;