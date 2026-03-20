import Product from "../../models/Product.js";
import sendEmail from "../../utils/sendEmail.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("seller", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

export const updateProductStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatus = ["active", "inactive"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const product = await Product.findById(req.params.id).populate(
      "seller",
      "name email"
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // IMPORTANT LOGIC
    // If activating first time → set startTime
    if (status === "active") {
      if (!product.startTime) {
        product.startTime = new Date(); // first time start
      }
      // DO NOT reset startTime if already exists (resume logic)
    }

    product.status = status;
    await product.save();

    // Email content
    let emailText = "";

    if (status === "active") {
      emailText = `Hello ${product.seller.name},

Your product "${product.title}" has been APPROVED by the admin.

It is now LIVE and visible to buyers.

You can start receiving bids now.

Thank you.`;
    } else {
      emailText = `Hello ${product.seller.name},

Your product "${product.title}" has been DISABLED by the admin.

It is currently inactive and not visible to buyers.

If you believe this is a mistake, please contact support.`;
    }

    await sendEmail({
      to: product.seller.email,
      subject: "Product Status Updated",
      text: emailText,
    });

    res.status(200).json({
      success: true,
      message: "Status updated successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteProductByAdmin = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "seller",
      "name email"
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    const emailText = `Hello ${product.seller.name},

Your product "${product.title}" has been DELETED by the admin.

If you have any questions, please contact support.`;

    await sendEmail({
      to: product.seller.email,
      subject: "Product Deleted by Admin",
      text: emailText,
    });

    res.status(200).json({
      success: true,
      message: "Product deleted and email sent",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
