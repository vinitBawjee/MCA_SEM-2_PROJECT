import Auction from "../../models/Auction.js";
import Product from "../../models/Product.js";

export const getSellerBids = async (req, res) => {
  try {
    const sellerId = req.user.id;

    const products = await Product.find({ seller: sellerId });

    const result = [];

    for (let product of products) {
      const bids = await Auction.find({ product: product._id })
        .populate("buyer", "name email")
        .sort({ bidAmount: -1 })
        .limit(3);

      if (bids.length > 0) {
        result.push({
          product: {
            _id: product._id,
            title: product.title,
            image: product.image,
            price: product.price
          },
          topBids: bids
        });
      }
    }

    res.status(200).json({ data: result });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bids" });
  }
};