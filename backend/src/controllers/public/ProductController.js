import Product from "../../models/Product.js";

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