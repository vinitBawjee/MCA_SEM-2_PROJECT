import Auction from "../../models/Auction.js";

export const getAllBiddings = async (req, res) => {
  try {

    const { status } = req.query;

    const auctions = await Auction.find()
      .populate("buyer", "name")
      .populate({
        path: "product",
        select: "title status"
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

    const auction = await Auction.findById(req.params.id).populate("product");

    if (!auction) {
      return res.status(404).json({ message: "Auction not found" });
    }

    auction.product.status = "complete";
    await auction.product.save();

    res.json({ message: "Auction Completed" });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};