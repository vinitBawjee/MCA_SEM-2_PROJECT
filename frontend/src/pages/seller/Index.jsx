import { Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useState } from "react";

import SidebarOptions from "../../components/seller/SidebarOptions";
import AlertMessage from "../../components/layout/AlertMessage";

import "./index.css";

const Index = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [alert, setAlert] = useState({
    type: "",
    message: ""
  });

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="container-fluid vh-100 p-0">

      <AlertMessage
        type={alert.type}
        message={alert.message}
        onClose={() => setAlert({ type: "", message: "" })}
      />

      <div className="row-1 d-flex justify-content-between align-items-center">
        <div className="row-1-logo">
          <h5 className="mb-0 brand-title">
            Auction Seller
          </h5>
        </div>

        <div className="logout">
          <span className="user-name">{user.name}</span>
          <button
            className="btn btn-danger"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="row-2">
        <div className="col-1">
          <SidebarOptions />
        </div>

        <div className="col-2">
          <Outlet context={{ setAlert }} />
        </div>
      </div>
    </div>
  );
};

export default Index;