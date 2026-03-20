import Product from "../models/Product.js";
import Auction from "../models/Auction.js";
import sendEmail from "../utils/sendEmail.js";

export const runAuctionScheduler = () => {
  setInterval(async () => {
    const now = new Date();

    try {
      const products = await Product.find({ status: "active" }).populate("seller");

      for (const product of products) {

        if (!product.startTime) continue;

        const start = new Date(product.startTime);

        let end = new Date(start.getTime() + 7 * 24 * 60 * 60 * 1000);
        end.setHours(16, 0, 0, 0);

        const lastBid = await Auction.findOne({ product: product._id })
          .sort({ createdAt: -1 });

        let finalEnd = end;

        if (lastBid) {
          const diff = end.getTime() - new Date(lastBid.createdAt).getTime();

          if (diff <= 60000 && diff >= 0) {
            finalEnd = new Date(end.getTime() + 2 * 60 * 1000);
          }
        }

        if (now >= finalEnd) {

          const highestBid = await Auction.findOne({ product: product._id })
            .sort({ bidAmount: -1 })
            .populate("buyer");

          product.status = "complete";
          await product.save();

          const sellerEmail = product.seller.email;
          const sellerName = product.seller.name;
          const productTitle = product.title;

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

          } catch (error) {
            console.log("Email Error:", error.message);
          }
        }
      }
    } catch (err) {
      console.log("Scheduler Error:", err.message);
    }

  }, 60000);
};