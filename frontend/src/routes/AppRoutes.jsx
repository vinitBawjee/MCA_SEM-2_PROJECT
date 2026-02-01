import { Routes, Route } from "react-router-dom";
import AdminRoute from "./AdminRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/admin/*" element={<AdminRoute />} />
    </Routes>
  );
};

export default AppRoutes;
