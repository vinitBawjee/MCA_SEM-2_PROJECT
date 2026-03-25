import { Route, Navigate } from "react-router-dom";

import AdminLayout from "../pages/admin/Index";
import AdminDashboard from "../pages/admin/Dashboard";
import BuyerManagement from "../pages/admin/BuyerManagement";
import SellerManagement from "../pages/admin/SellerManagement";
import ProductManagement from "../pages/admin/ProductManagement";
import ViewProduct from "../pages/admin/ViewProduct";
import RejectProduct from "../pages/admin/RejectProduct";

const AdminRoutes = () => {
  return (
    <Route path="/admin" element={<AdminLayout />}>
      <Route index element={<Navigate to="dashboard" />} />
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="buyers" element={<BuyerManagement />} />
      <Route path="sellers" element={<SellerManagement />} />
      <Route path="products" element={<ProductManagement />} />
      <Route path="products/:id" element={<ViewProduct />} />
      <Route path="products/reject/:id" element={<RejectProduct />} />
    </Route>
  );
};

export default AdminRoutes;