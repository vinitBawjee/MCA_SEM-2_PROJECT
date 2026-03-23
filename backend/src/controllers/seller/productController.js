import Product from "../../models/Product.js";
import sendEmail from "../../utils/sendEmail.js";

export const createProduct = async (req, res) => {
  try {
    const { title, description, price, category, stock } = req.body;

    const product = await Product.create({
      seller: req.user.id,
      title,
      description,
      price,
      category,
      stock,
      image: req.file ? req.file.path : null,
    });

    res.status(201).json({
      data: product,
    });
  } catch (error) {
    res.status(500).json({ message: "Product creation failed" });
  }
};

export const getSellerProducts = async (req, res) => {
  try {
    const products = await Product.find({
      seller: req.user.id,
      status: { $ne: "closed" }
    }).sort({ createdAt: -1 });

    res.status(200).json({ data: products });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      seller: req.user.id,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ data: product });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch product" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { title, description, price, category, stock } = req.body;

    const product = await Product.findOne({
      _id: req.params.id,
      seller: req.user.id,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.title = title;
    product.description = description;
    product.price = price;
    product.category = category;
    product.stock = stock;

    if (req.file) {
      product.image = `uploads/${req.file.filename}`;
    }

    product.status = "pending";

    await product.save();

    res.status(200).json({ data: product });
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      seller: req.user.id,
    }).populate("seller");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let actionText = "closed";

    if (product.status === "pending") {
      product.status = "withdrawn";
      actionText = "withdrawn";
    } else {
      product.status = "closed";
    }

    await sendEmail({
      to: process.env.EMAIL,
      subject: "Product Status Update",
      text: `Product "${product.title}" has been ${actionText} by seller ${product.seller.name} (${product.seller.email}).`,
    });

    await product.save();

    res.status(200).json({ message: `Product ${actionText} successfully` });
  } catch (error) {
    res.status(500).json({ message: "Action failed" });
  }
};