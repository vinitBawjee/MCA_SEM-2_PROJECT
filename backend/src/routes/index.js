import authRoutes from "./authRoutes.js";
import publicRoutes from "./publicRoutes.js";
import sellerRoutes from "./sellerRoutes.js";
import adminRoutes from "./adminRoutes.js";
import buyerRoutes from "./buyerRoutes.js";

const routes = (app) => {
  app.use("/api/public", publicRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/seller", sellerRoutes);
  app.use("/api/admin", adminRoutes);
  app.use("/api/buyer", buyerRoutes);
};

export default routes;