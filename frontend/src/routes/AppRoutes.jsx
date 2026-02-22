import { Routes, Route } from "react-router-dom";
import AdminRoute from "./AdminRoute";

import Home from "../pages/Home";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin/*" element={<AdminRoute />} />
    </Routes>
  );
};

export default AppRoutes;
