import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const SellerRoute = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user || user.role !== "seller") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default SellerRoute;