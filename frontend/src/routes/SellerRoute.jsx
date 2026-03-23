import { Route, Navigate } from "react-router-dom";
import SellerLayout from "../pages/seller/Index";

import ProductManagement from "../pages/seller/ProductManagement";
import AddProduct from "../pages/seller/AddProduct";
import ViewProduct from "../pages/seller/ViewProduct";
import Dashboard from "../pages/seller/Dashboard";
import SellerBids from "../pages/seller/SellerBids";
import SellerProfile from "../pages/seller/SellerProfile";
import ContactUs from "../pages/seller/ContactUs";
import CompletedAuctions from "../pages/seller/CompletedAuctions";

const SellerRoutes = () => {
  return (
    <>
      <Route path="/seller/*" element={<SellerLayout />}>
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="profile" element={<SellerProfile />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<ProductManagement />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="edit-product/:id" element={<AddProduct />} />
        <Route path="view-product/:id" element={<ViewProduct />} />
        <Route path="bids" element={<SellerBids />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="completed-auctions" element={<CompletedAuctions />} />
      </Route>
    </>
  );
};

export default SellerRoutes;