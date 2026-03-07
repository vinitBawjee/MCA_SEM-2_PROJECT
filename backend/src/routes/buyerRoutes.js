import express from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";
import { buyerBidController } from "../controllers/index.js";

const router = express.Router();

router.post("/bid/:id", protect, authorize("buyer"), buyerBidController.placeBid);

export default router;