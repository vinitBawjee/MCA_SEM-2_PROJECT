import * as authController from "./authController.js";

import * as adminProductController from "./admin/productController.js";
import * as adminBuyerController from "./admin/buyerController.js";
import * as adminSellerController from "./admin/sellerController.js";
import * as adminAuctionController from "./admin/adminAuctionController.js";
import * as AuctionController from "./admin/AuctionController.js";
import * as ContactController from "./admin/ContactController.js";

import * as sellerProductController from "./seller/productController.js";
import * as sellerDashboardController from "./seller/dashboardController.js";
import * as sellerBidsController from "./seller/sellerBidsController.js";
import * as sellerProfileController from "./seller/profileController.js";
import * as sellerContactController from "./seller/contactController.js";
import * as sellerCompletedAuctionsController from "./seller/CompletedAuctionsController.js";

import * as buyerBidController from "./buyer/bidController.js"
import * as buyerAccountController from "./buyer/accountController.js";
import * as accountController from "./buyer/accountController.js";
import * as buyerContactController from "./buyer/accountController.js";
import * as buyerDashboardController from "./buyer/dashboardController.js";

import * as publicProductController from "./public/ProductController.js";

export {
  authController,
  adminProductController,
  adminBuyerController,
  adminSellerController,
  sellerProductController,
  publicProductController,
  buyerBidController,
  adminAuctionController,
  buyerAccountController,
  accountController,
  sellerDashboardController,
  sellerBidsController,
  sellerProfileController,
  sellerContactController,
  buyerContactController,
  sellerCompletedAuctionsController,
  AuctionController,
  ContactController,
  buyerDashboardController
};