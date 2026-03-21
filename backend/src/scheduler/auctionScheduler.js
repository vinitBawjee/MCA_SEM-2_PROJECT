import Auction from "../models/Auction.js";
import AuctionStatus from "../models/AuctionStatus.js";
import sendEmail from "../utils/sendEmail.js";

export const runAuctionScheduler = () => {
  setInterval(async () => {
    const now = new Date();

    try {
      const auctions = await AuctionStatus.find().populate({
        path: "product",
        populate: { path: "seller" },
      });

      for (const auction of auctions) {

        if (!auction.product || auction.product.status !== "active") continue;

        if (!auction.endTime) continue;

        if (now >= new Date(auction.endTime)) {

          const product = auction.product;

          const highestBid = await Auction.findOne({ product: product._id })
            .sort({ bidAmount: -1 })
            .populate("buyer");

          product.status = "complete";
          await product.save();

          const sellerEmail = product.seller?.email;
          const sellerName = product.seller?.name;
          const productTitle = product.title;

          let buyerEmail = null;
          let buyerName = null;

          if (highestBid?.buyer) {
            buyerEmail = highestBid.buyer.email;
            buyerName = highestBid.buyer.name;
          }

          try {
            if (sellerEmail) {
              await sendEmail({
                to: sellerEmail,
                subject: "Auction Completed",
                text: `Hello ${sellerName}, your auction for "${productTitle}" has been completed.`,
              });
            }

            if (buyerEmail) {
              await sendEmail({
                to: buyerEmail,
                subject: "Congratulations! You won the auction",
                text: `Hello ${buyerName}, you won the auction for "${productTitle}" with the highest bid.`,
              });
            }

            if (process.env.ADMIN_EMAIL) {
              await sendEmail({
                to: process.env.ADMIN_EMAIL,
                subject: "Auction Completed",
                text: `Auction completed for product: ${productTitle}`,
              });
            }

          } catch (error) {
            console.log(error.message);
          }
        }
      }
    } catch (err) {
      console.log(err.message);
    }

  }, 60000);
};