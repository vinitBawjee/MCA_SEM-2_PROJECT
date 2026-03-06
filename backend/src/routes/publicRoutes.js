import express from "express";
import { publicProductController } from "../controllers/index.js";

const router = express.Router();

router.get("/products", publicProductController.getActiveProducts);
router.get("/pending-products", publicProductController.getPendingProducts);
router.get("/complete-products", publicProductController.getCompleteProducts);

export default router;