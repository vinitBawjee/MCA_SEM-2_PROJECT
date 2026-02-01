import { Routes, Route } from "react-router-dom";

import Index from "../pages/admin/Index";
import NewAdmin from "../pages/admin/NewAdmin";

const AdminRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />}>
        <Route index element={<div>Dashboard</div>} />
        <Route path="new-admin" element={<NewAdmin />} />*
      </Route>
    </Routes>
  );
};

export default AdminRoute;
