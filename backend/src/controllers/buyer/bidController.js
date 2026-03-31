import Auction from "../../models/Auction.js";
import Product from "../../models/Product.js";
import sendEmail from "../../utils/sendEmail.js";
import Buyer from "../../models/Buyer.js";

export const placeBid = async (req, res) => {
  try {
    const { amount } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    const highestBid = await Auction.findOne({ product: product._id })
      .sort({ bidAmount: -1 })
      .populate("buyer");

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

    if (highestBid && highestBid.buyer && highestBid.buyer._id.toString() !== req.user.id) {
      const subject = "You have been outbid";

      const text = `Hello ${highestBid.buyer.name}, your bid of ${highestBid.bidAmount} has been surpassed by a higher bid of ${amount}.`;

      try {
        await sendEmail({
          to: highestBid.buyer.email,
          subject,
          text,
        });
      } catch {}
    }

    res.status(201).json({
      message: "Bid placed successfully",
      data: bid,
    });
  } catch {
    res.status(500).json({ message: "Bid failed" });
  }
};