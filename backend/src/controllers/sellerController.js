import Seller from "../models/Seller.js";

export const getAllSellers = async (req, res) => {
  try {
    const sellers = await Seller.find({
      role: { $ne: "admin" }   
    })
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      data: sellers,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch sellers",
    });
  }
};