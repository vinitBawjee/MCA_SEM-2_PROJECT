import Auction from "../../models/Auction.js";
import sendEmail from "../../utils/sendEmail.js";

export const getAllBiddings = async (req, res) => {
  try {
    const { status } = req.query;

    const auctions = await Auction.find().populate("buyer", "name").populate({
      path: "product",
      select: "title status",
    });

    const filtered = status
      ? auctions.filter((a) => a.product?.status === status)
      : auctions;

    res.json(filtered);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const completeBidding = async (req, res) => {
  try {
    const auction = await Auction.findOne({ product: req.params.id }).populate({
      path: "product",
      populate: { path: "seller" },
    });

    if (!auction) {
      return res.status(404).json({ message: "Auction not found" });
    }

    const sellerEmail = auction.product.seller.email;
    const sellerName = auction.product.seller.name;

    const productTitle = auction.product.title;

    auction.status = "completed";
    await auction.save();

    auction.product.status = "complete";
    await auction.product.save();

    const highestBid = await Auction.findOne({ product: req.params.id })
      .sort({ bidAmount: -1 })
      .populate("buyer");

    let buyerEmail = null;
    let buyerName = null;

    if (highestBid && highestBid.buyer) {
      buyerEmail = highestBid.buyer.email;
      buyerName = highestBid.buyer.name;
    }

    try {
      await sendEmail({
        to: sellerEmail,
        subject: "Auction Completed",
        text: `Hello ${sellerName}, your auction for "${productTitle}" has been completed.`,
      });

      if (buyerEmail) {
        await sendEmail({
          to: buyerEmail,
          subject: "Congratulations! You won the auction",
          text: `Hello ${buyerName}, you won the auction for "${productTitle}" with the highest bid.`,
        });
      }

      await sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: "Auction Completed",
        text: `Auction completed for product: ${productTitle}`,
      });
    } catch (mailError) {
      console.log("Email failed but auction completed:", mailError.message);
    }

    res.json({ message: "Auction Completed Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
