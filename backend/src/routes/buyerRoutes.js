import express from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";
import { buyerBidController, buyerAccountController } from "../controllers/index.js";

const router = express.Router();
router.get("/profile", protect, authorize("buyer"), buyerAccountController.getProfile);
router.get("/winning-bids", protect, authorize("buyer"), buyerAccountController.getWinningBids);
router.get("/bids", protect, authorize("buyer"), buyerAccountController.getBuyerBids);
router.get("/products", protect, authorize("buyer"), buyerAccountController.getBuyerProducts);
router.post("/bid/:id", protect, authorize("buyer"), buyerBidController.placeBid);

export default router;