import express from "express";
import { adminProductController, adminBuyerController, adminSellerController } from "../controllers/index.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/products", protect, authorize("admin"), adminProductController.getAllProducts);
router.put("/products/:id/status", protect, authorize("admin"), adminProductController.updateProductStatus);
router.delete("/products/:id", protect, authorize("admin"), adminProductController.deleteProductByAdmin);

router.get("/buyers", protect, authorize("admin"), adminBuyerController.getAllBuyers);
router.delete("/buyer/:id", protect, authorize("admin"), adminBuyerController.deleteBuyer);
router.put("/buyer/block/:id", protect, authorize("admin"), adminBuyerController.toggleBlockBuyer);

router.get("/sellers", protect, authorize("admin"), adminSellerController.getAllSellers);
router.delete("/seller/:id", protect, authorize("admin"), adminSellerController.deleteSeller);
router.put("/seller/block/:id", protect, authorize("admin"), adminSellerController.toggleBlockSeller);

export default router;