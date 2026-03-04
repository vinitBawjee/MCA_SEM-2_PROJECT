import { Routes, Route } from "react-router-dom";

import AdminRoute from "./AdminRoute";
import SellerRoute from "./SellerRoute";
import Home from "../pages/Home";
import AdminLayout from "../pages/admin/Index";
import SellerLayout from "../pages/seller/Index";

import BuyerManagement from "../pages/admin/BuyerManagement";
import SellerManagement from "../pages/admin/SellerManagement";
import AdminProductManagement from "../pages/admin/ProductManagement";

import ProductManagement from "../pages/seller/ProductManagement";
import AddProduct from "../pages/seller/AddProduct";

const AppRoutes = () => {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route element={<AdminRoute />}>
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route path="buyers" element={<BuyerManagement />} />
          <Route path="sellers" element={<SellerManagement />} />
        </Route>
      </Route>

      <Route element={<SellerRoute />}>
        <Route path="/seller/*" element={<SellerLayout />}>
          <Route path="products" element={<ProductManagement />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="edit-product/:id" element={<AddProduct />} />
          <Route path="products" element={<AdminProductManagement />} />
        </Route>
      </Route>

    </Routes>
  );
};

export default AppRoutes;