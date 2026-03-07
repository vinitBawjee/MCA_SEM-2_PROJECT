import { Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/Home";
import AuctionsPage from "../pages/AuctionsPage";
import ProductDetails from "../pages/ProductDetails";

const PublicRoutes = () => {
  return (
    <Route element={<MainLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/auctions" element={<AuctionsPage />} />
      <Route path="/product/:id" element={<ProductDetails />} />
    </Route>
  );
};

export default PublicRoutes;