import mongoose from "mongoose";

const auctionStatusSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    startTime: {
      type: Date,
    },

    endTime: {
      type: Date,
    },

    remainingTime: {
      type: Number,
      default: 7 * 24 * 60 * 60 * 1000,
    },

    lastPausedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("AuctionStatus", auctionStatusSchema);