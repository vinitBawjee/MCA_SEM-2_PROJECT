import Auction from "../../models/Auction.js";
import Product from "../../models/Product.js";

export const placeBid = async (req, res) => {
  try {
    const { amount } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    const highestBid = await Auction.findOne({ product: product._id }).sort({
      bidAmount: -1,
    });

    const currentBid = highestBid ? highestBid.bidAmount : product.price;

    if (amount <= currentBid) {
      return res
        .status(400)
        .json({ message: "Bid must be higher than current bid" });
    }

    const bid = await Auction.create({
      product: product._id,
      buyer: req.user.id,
      bidAmount: amount,
    });

    res.status(201).json({
      message: "Bid placed successfully",
      data: bid,
    });
  } catch {
    res.status(500).json({ message: "Bid failed" });
  }
};
