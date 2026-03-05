import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { protect, authorize } from "../middleware/authMiddleware.js";
import { register, login } from "../controllers/authController.js";
import { getAllBuyers, deleteBuyer, toggleBlockBuyer } from "../controllers/buyerController.js";
import { getAllSellers, deleteSeller, toggleBlockSeller } from "../controllers/sellerController.js";
import { createProduct, getSellerProducts, getSingleProduct, updateProduct, deleteProduct } from "../controllers/productController.js";
import { getAllProducts, updateProductStatus, deleteProductByAdmin } from "../controllers/admin/productController.js";
import { getActiveProducts, getPendingProducts, getCompleteProducts } from "../controllers/public/ProductController.js";

const router = express.Router();

router.get("/public/products", getActiveProducts);
router.get("/public/pending-products", getPendingProducts);
router.get("/public/complete-products", getCompleteProducts);

router.post("/auth/register", register);
router.post("/auth/login", login);

router.post("/products", protect, authorize("seller"), upload.single("image"), createProduct);
router.get("/products", protect, authorize("seller"), getSellerProducts);
router.get("/products/:id", protect, authorize("seller"), getSingleProduct);
router.put("/products/:id", protect, authorize("seller"), upload.single("image"), updateProduct);
router.delete("/products/:id", protect, authorize("seller"), deleteProduct);

router.get("/getbuyers", protect, authorize("admin"), getAllBuyers);
router.get("/getsellers", protect, authorize("admin"), getAllSellers);
router.delete("/buyer/:id", protect, authorize("admin"), deleteBuyer);
router.put("/buyer/block/:id", protect, authorize("admin"), toggleBlockBuyer);
router.delete("/seller/:id", protect, authorize("admin"), deleteSeller);
router.put("/seller/block/:id", protect, authorize("admin"), toggleBlockSeller);
router.get("/admin/products", protect, authorize("admin"), getAllProducts);
router.put("/admin/products/:id/status", protect, authorize("admin"), updateProductStatus);
router.delete("/admin/products/:id", protect, authorize("admin"), deleteProductByAdmin);

export default router;