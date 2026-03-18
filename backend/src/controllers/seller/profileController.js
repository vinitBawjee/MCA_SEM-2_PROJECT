import Seller from "../../models/Seller.js";

export const getSellerProfile = async (req, res) => {
  try {
    const seller = await Seller.findById(req.user.id).select("-password");

    res.json(seller);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch profile"
    });
  }
};