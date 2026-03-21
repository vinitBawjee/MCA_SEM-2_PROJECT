import { Route, Navigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/Home";
import AuctionsPage from "../pages/AuctionsPage";
import ProductDetails from "../pages/ProductDetails";
import AccountLayout from "../pages/AccountLayout";
import ProductList from "../pages/ProductList";
import Bidding from "../pages/Bidding";
import WinningBids from "../pages/WinningBids";
import Profile from "../pages/Profile";
import BuyerDashboard from "../pages/BuyerDashboard";
import Contact from "../pages/Contact";

const PublicRoutes = () => {
  return (
    <Route element={<MainLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/auctions" element={<AuctionsPage />} />
      <Route path="/product/:id" element={<ProductDetails />} />

      <Route path="/account" element={<AccountLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<BuyerDashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="products" element={<ProductList />} />
        <Route path="bids" element={<Bidding />} />
        <Route path="winning-bids" element={<WinningBids />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Route>
  );
};

export default PublicRoutes;
