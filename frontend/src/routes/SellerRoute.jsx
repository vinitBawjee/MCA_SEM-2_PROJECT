import { Route } from "react-router-dom";
import SellerLayout from "../pages/seller/Index";

import ProductManagement from "../pages/seller/ProductManagement";
import AddProduct from "../pages/seller/AddProduct";

const SellerRoutes = () => {
  return (
    <>
      <Route path="/seller/*" element={<SellerLayout />}>
        <Route path="products" element={<ProductManagement />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="edit-product/:id" element={<AddProduct />} />
      </Route>
    </>
  );
};

export default SellerRoutes;