import Product from "../../models/Product.js";
import Auction from "../../models/Auction.js";

export const getSellerDashboard = async (req, res) => {
  try {

    const sellerId = req.user._id;

    const totalProducts = await Product.countDocuments({
      seller: sellerId
    });

    const activeProducts = await Product.countDocuments({
      seller: sellerId,
      status: "active"
    });

    const completedProducts = await Product.countDocuments({
      seller: sellerId,
      status: "complete"
    });

    const products = await Product.find({
      seller: sellerId
    }).select("_id title");

    const productIds = products.map((p) => p._id);

    const totalBids = await Auction.countDocuments({
      product: { $in: productIds }
    });

    const bidStats = await Auction.aggregate([
      {
        $match: {
          product: { $in: productIds }
        }
      },
      {
        $group: {
          _id: "$product",
          totalBids: { $sum: 1 }
        }
      }
    ]);

    res.json({
      totalProducts,
      activeProducts,
      completedProducts,
      totalBids,
      bidStats
    });

  } catch (error) {
    res.status(500).json({
      message: "Dashboard data fetch failed"
    });
  }
};