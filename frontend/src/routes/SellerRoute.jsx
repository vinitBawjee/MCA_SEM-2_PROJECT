import { Route } from "react-router-dom";
import SellerLayout from "../pages/seller/Index";

import ProductManagement from "../pages/seller/ProductManagement";
import AddProduct from "../pages/seller/AddProduct";
import ViewProduct from "../pages/seller/ViewProduct";
// import Dashboard from "../pages/seller/Dashboard";

const SellerRoutes = () => {
  return (
    <>
      <Route path="/seller/*" element={<SellerLayout />}>
        {/* <Route index element={<Dashboard />} /> */}
        <Route path="products" element={<ProductManagement />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="edit-product/:id" element={<AddProduct />} />
        <Route path="view-product/:id" element={<ViewProduct />} />
      </Route>
    </>
  );
};

export default SellerRoutes;