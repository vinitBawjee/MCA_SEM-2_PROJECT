import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import PublicRoutes from "./PublicRoute";
import AdminRoutes from "./AdminRoute";
import SellerRoutes from "./SellerRoute";

const AppRoutes = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Routes>

      {PublicRoutes()}

      {user?.role === "admin" ? (
        AdminRoutes()
      ) : (
        <Route path="/admin/*" element={<Navigate to="/" />} />
      )}

      {user?.role === "seller" ? (
        SellerRoutes()
      ) : (
        <Route path="/seller/*" element={<Navigate to="/" />} />
      )}

    </Routes>
  );
};

export default AppRoutes;