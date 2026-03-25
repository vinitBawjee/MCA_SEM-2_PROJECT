import express from "express";
import { adminProductController, adminBuyerController, adminSellerController, adminAuctionController, AuctionController, ContactController } from "../controllers/index.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/products", protect, authorize("admin"), adminProductController.getAllProducts);
router.put("/products/:id/status", protect, authorize("admin"), adminProductController.updateProductStatus);
router.delete("/products/:id", protect, authorize("admin"), adminProductController.deleteProductByAdmin);
router.get("/biddings", protect, authorize("admin"), adminAuctionController.getAllBiddings);
router.put("/biddings/complete/:id", protect, authorize("admin"), adminAuctionController.completeBidding);
router.get("/products/:id", protect, authorize("admin"), adminProductController.getSingleProduct);
router.get("/products/:id/bids", protect, authorize("admin"), adminProductController.getProductBids);
router.get("/all-bids", protect, authorize("admin"), AuctionController.getAllProductsWithTopBids);
router.get("/completed-winning-bids", protect, authorize("admin"), AuctionController.getCompletedWinningBids);
router.get("/contacts", protect, authorize("admin"), ContactController.getAllContacts);
router.get(
    "/contact/:id",
    protect,
    authorize("admin"),
    ContactController.getSingleContact
  );

router.get("/buyers", protect, authorize("admin"), adminBuyerController.getAllBuyers);
router.delete("/buyer/:id", protect, authorize("admin"), adminBuyerController.deleteBuyer);
router.put("/buyer/block/:id", protect, authorize("admin"), adminBuyerController.toggleBlockBuyer);

router.get("/sellers", protect, authorize("admin"), adminSellerController.getAllSellers);
router.delete("/seller/:id", protect, authorize("admin"), adminSellerController.deleteSeller);
router.put("/seller/block/:id", protect, authorize("admin"), adminSellerController.toggleBlockSeller);

export default router;