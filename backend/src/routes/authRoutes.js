import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { protect, authorize } from "../middleware/authMiddleware.js";
import { register, login } from "../controllers/authController.js";
import { getAllBuyers } from "../controllers/buyerController.js";
import { getAllSellers } from "../controllers/sellerController.js";
import { createProduct, getSellerProducts, getSingleProduct, updateProduct, deleteProduct } from "../controllers/productController.js";

const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/login", login);

router.post("/products", protect, authorize("seller"), upload.single("image"), createProduct);
router.get("/products", protect, authorize("seller"), getSellerProducts);
router.get("/products/:id", protect, authorize("seller"), getSingleProduct);
router.put("/products/:id", protect, authorize("seller"), upload.single("image"), updateProduct);
router.delete("/products/:id", protect, authorize("seller"), deleteProduct);

router.get("/getbuyers", protect, authorize("admin"), getAllBuyers);
router.get("/getsellers", protect, authorize("admin"), getAllSellers);

export default router;