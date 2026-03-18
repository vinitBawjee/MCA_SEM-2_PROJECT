import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { protect, authorize } from "../middleware/authMiddleware.js";
import { sellerProductController, sellerDashboardController, sellerBidsController, sellerProfileController, sellerContactController } from "../controllers/index.js";

const router = express.Router();
router.post("/products", protect, authorize("seller"), upload.single("image"), sellerProductController.createProduct);
router.get("/products", protect, authorize("seller"), sellerProductController.getSellerProducts);
router.get("/products/:id", protect, authorize("seller"), sellerProductController.getSingleProduct);
router.put("/products/:id", protect, authorize("seller"), upload.single("image"), sellerProductController.updateProduct);
router.delete("/products/:id", protect, authorize("seller"), sellerProductController.deleteProduct);
router.get("/dashboard", protect, authorize("seller"), sellerDashboardController.getSellerDashboard);
router.get("/bids", protect, authorize("seller"), sellerBidsController.getSellerBids);
router.get("/profile", protect, authorize("seller"), sellerProfileController.getSellerProfile);
router.post("/contact", protect, authorize("seller"), sellerContactController.createContact);

export default router;