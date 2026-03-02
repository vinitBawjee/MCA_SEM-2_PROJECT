import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
    },

    price: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
    },

    stock: {
      type: Number,
      default: 0,
    },

    image: {
      type: String,
    },

    // ✅ Auction Status Added
    status: {
      type: String,
      enum: ["pending", "active", "inactive", "complete"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);