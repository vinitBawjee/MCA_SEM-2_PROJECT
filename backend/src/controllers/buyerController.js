import { fetchBuyersService } from "../services/buyerService.js";

export const getAllBuyers = async (req, res) => {
  try {
    const buyers = await fetchBuyersService();

    res.status(200).json({
      success: true,
      count: buyers.length,
      data: buyers,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch buyers",
    });
  }
};