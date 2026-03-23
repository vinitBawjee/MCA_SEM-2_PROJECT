import Product from "../../models/Product.js";
import Auction from "../../models/Auction.js";

export const getCompletedAuctions = async (req, res) => {
  try {
    const sellerId = req.user.id;

    const products = await Product.find({
      seller: sellerId,
      status: "complete"
    });

    const productIds = products.map((p) => p._id);

    const auctions = await Auction.aggregate([
      {
        $match: {
          product: { $in: productIds }
        }
      },
      {
        $sort: { bidAmount: -1 }
      },
      {
        $group: {
          _id: "$product",
          highestBid: { $first: "$bidAmount" },
          buyer: { $first: "$buyer" }
        }
      }
    ]);

    const result = await Auction.populate(auctions, {
      path: "buyer",
      select: "name email"
    });

    const finalData = result.map((item) => {
      const product = products.find(
        (p) => p._id.toString() === item._id.toString()
      );

      return {
        productId: item._id,
        productTitle: product?.title,
        highestBid: item.highestBid,
        buyerName: item.buyer?.name,
        buyerEmail: item.buyer?.email
      };
    });

    res.status(200).json({
      success: true,
      data: finalData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching completed auctions"
    });
  }
};