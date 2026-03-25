import Product from "../../models/Product.js";
import Auction from "../../models/Auction.js";
import sendEmail from "../../utils/sendEmail.js";
import AuctionStatus from "../../models/AuctionStatus.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({
      status: { $in: ["pending", "active", "inactive", "complete", "rejected", "closed"] },
    })
      .populate("seller", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

export const getSingleProductWithBidsAdmin = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("seller", "name email");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const bids = await Auction.find({ product: product._id })
      .populate("buyer", "name email")
      .sort({ bidAmount: -1 });

    res.status(200).json({
      data: { product, bids },
    });
  } catch {
    res.status(500).json({ message: "Failed to fetch product" });
  }
};

export const updateProductStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const product = await Product.findById(req.params.id).populate("seller");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let auction = await AuctionStatus.findOne({ product: product._id });
    const now = new Date();

    if (status === "active") {
      if (!auction) {
        auction = await AuctionStatus.create({
          product: product._id,
          startTime: now,
          endTime: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
        });
      } else {
        if (!auction.startTime) {
          auction.startTime = now;
          auction.endTime = new Date(now.getTime() + auction.remainingTime);
        } else if (auction.lastPausedAt) {
          auction.endTime = new Date(now.getTime() + auction.remainingTime);
          auction.lastPausedAt = null;
        }
        await auction.save();
      }
    }

    if (status === "inactive") {
      if (auction && auction.endTime) {
        const remaining =
          new Date(auction.endTime).getTime() - now.getTime();
        auction.remainingTime = remaining > 0 ? remaining : 0;
        auction.lastPausedAt = now;
        await auction.save();
      }
    }

    if (status === "complete" || status === "closed") {
      if (auction) {
        auction.endTime = now;
        await auction.save();
      }
    }

    product.status = status;
    await product.save();

    await sendEmail({
      to: product.seller.email,
      subject: "Product Status Updated",
      text: `Hello ${product.seller.name}, your product "${product.title}" status is now "${status}".`,
    });

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteProductByAdmin = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "seller",
      "name email"
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    await sendEmail({
      to: product.seller.email,
      subject: "Product Deleted by Admin",
      text: `Hello ${product.seller.name}, your product "${product.title}" has been deleted by admin.`,
    });

    res.status(200).json({
      success: true,
      message: "Product deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("seller", "name email");
    res.status(200).json({ data: product });
  } catch {
    res.status(500).json({ message: "Failed" });
  }
};

export const getProductBids = async (req, res) => {
  try {
    const bids = await Auction.find({ product: req.params.id })
      .populate("buyer", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({ data: bids });
  } catch {
    res.status(500).json({ message: "Failed" });
  }
};