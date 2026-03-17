import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { protect, authorize } from "../middleware/authMiddleware.js";
import { sellerProductController } from "../controllers/index.js";
import { sellerDashboardController } from "../controllers/index.js";

const router = express.Router();

router.post("/products", protect, authorize("seller"), upload.single("image"), sellerProductController.createProduct);
router.get("/products", protect, authorize("seller"), sellerProductController.getSellerProducts);
router.get("/products/:id", protect, authorize("seller"), sellerProductController.getSingleProduct);
router.put("/products/:id", protect, authorize("seller"), upload.single("image"), sellerProductController.updateProduct);
router.delete("/products/:id", protect, authorize("seller"), sellerProductController.deleteProduct);
router.get("/dashboard", protect, authorize("seller"), sellerDashboardController.getSellerDashboard);

export default router;