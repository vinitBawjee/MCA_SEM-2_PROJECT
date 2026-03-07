import Product from "../../models/Product.js";
import Auction from "../../models/Auction.js";

export const getActiveProducts = async (req, res) => {
  try {
    const products = await Product.find({ status: "active" })
      .populate("seller", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({ data: products });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

export const getPendingProducts = async (req, res) => {
  try {
    const products = await Product.find({ status: "pending" })
      .populate("seller", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({ data: products });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch pending products" });
  }
};

export const getCompleteProducts = async (req, res) => {
  try {
    const products = await Product.find({ status: "complete" })
      .populate("seller", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({ data: products });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch complete products" });
  }
};

export const getProductDetails = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "seller",
      "name"
    );

    const history = await Auction.find({ product: req.params.id })
      .populate("buyer", "name")
      .sort({ bidAmount: -1 });

    const highestBid = history.length ? history[0].bidAmount : product.price;

    res.status(200).json({
      product,
      history,
      currentBid: highestBid,
    });
  } catch {
    res.status(500).json({ message: "Failed to fetch product" });
  }
};
