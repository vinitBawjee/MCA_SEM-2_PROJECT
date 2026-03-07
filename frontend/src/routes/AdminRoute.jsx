import { Route } from "react-router-dom";
import AdminLayout from "../pages/admin/Index";

import BuyerManagement from "../pages/admin/BuyerManagement";
import SellerManagement from "../pages/admin/SellerManagement";
import AdminProductManagement from "../pages/admin/ProductManagement";

const AdminRoutes = () => {
  return (
    <>
      <Route path="/admin/*" element={<AdminLayout />}>
        <Route path="buyers" element={<BuyerManagement />} />
        <Route path="sellers" element={<SellerManagement />} />
        <Route path="products" element={<AdminProductManagement />} />
      </Route>
    </>
  );
};

export default AdminRoutes;