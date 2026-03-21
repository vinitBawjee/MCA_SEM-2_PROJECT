import Product from "../../models/Product.js";
import sendEmail from "../../utils/sendEmail.js";
import AuctionStatus from "../../models/AuctionStatus.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("seller", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
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

    product.status = status;
    await product.save();

    await sendEmail({
      to: process.env.EMAIL,
      subject: "Product Status Updated",
      text: `Product "${product.title}" status changed to "${status}" by admin for seller ${product.seller.name} (${product.seller.email}).`,
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

    const emailText = `Hello ${product.seller.name},

Your product "${product.title}" has been DELETED by the admin.

If you have any questions, please contact support.`;

    await sendEmail({
      to: product.seller.email,
      subject: "Product Deleted by Admin",
      text: emailText,
    });

    res.status(200).json({
      success: true,
      message: "Product deleted and email sent",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
