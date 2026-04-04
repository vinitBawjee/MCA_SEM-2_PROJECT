import Product from "../../models/Product.js";
import Auction from "../../models/Auction.js";

export const getBuyerDashboard = async (req, res) => {
  try {
    const buyerId = req.user.id;

    const products = await Product.find();
    const bids = await Auction.find({ buyer: buyerId });

    const totalProducts = products.length;

    const activeAuctions = products.filter(p => p.status === "active").length;
    const completedAuctions = products.filter(p => p.status === "complete").length;

    const totalBids = bids.length;

    const weekly = [0,0,0,0,0,0,0];

    bids.forEach(b => {
      const day = new Date(b.createdAt).getDay();
      weekly[day]++;
    });

    res.json({
      totalProducts,
      activeAuctions,
      completedAuctions,
      totalBids,
      weekly
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};