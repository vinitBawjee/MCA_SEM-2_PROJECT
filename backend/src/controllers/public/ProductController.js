import Product from "../../models/Product.js";
import Auction from "../../models/Auction.js";

export const getActiveProducts = async (req, res) => {
  try {
    const products = await Product.find({ status: { $in: ["active", "inactive"] } })
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

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const history = await Auction.find({ product: req.params.id })
      .populate("buyer", "name")
      .sort({ createdAt: -1 });

    const highestBid = history.length
      ? Math.max(...history.map((h) => h.bidAmount))
      : product.price;

    let endTime = null;

    if (product.startTime) {
      const end = new Date(
        new Date(product.startTime).getTime() + 7 * 24 * 60 * 60 * 1000
      );
      end.setHours(16, 0, 0, 0);
      endTime = end;
    }

    res.status(200).json({
      product,
      history,
      currentBid: highestBid,
      endTime,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch product" });
  }
};
