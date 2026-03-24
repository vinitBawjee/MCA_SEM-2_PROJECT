import { fetchBuyersService } from "../../services/buyerService.js";
import Buyer from "../../models/Buyer.js";
import sendEmail from "../../utils/sendEmail.js";

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

export const deleteBuyer = async (req, res) => {
  try {
    const buyer = await Buyer.findById(req.params.id);

    if (!buyer) {
      return res.status(404).json({ message: "Buyer not found" });
    }

    buyer.isDeleted = true;
    buyer.isBlocked = true;
    await buyer.save();

    const subject = "Account Deleted";

    const text = `Hello ${buyer.name}, your account has been deleted by admin. You can no longer access the platform.`;

    try {
      await sendEmail({
        to: buyer.email,
        subject,
        text,
      });
    } catch (err) {}

    res.status(200).json({ message: "Buyer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};

export const toggleBlockBuyer = async (req, res) => {
  try {
    const buyer = await Buyer.findById(req.params.id);

    if (!buyer) {
      return res.status(404).json({ message: "Buyer not found" });
    }

    if (buyer.isDeleted) {
      return res.status(400).json({ message: "Deleted buyer cannot be updated" });
    }

    buyer.isBlocked = !buyer.isBlocked;
    await buyer.save();

    const subject = buyer.isBlocked
      ? "Account Inactive"
      : "Account Active";

    const text = buyer.isBlocked
      ? `Hello ${buyer.name}, your account has been set to inactive by admin.`
      : `Hello ${buyer.name}, your account has been activated by admin.`;

    try {
      await sendEmail({
        to: buyer.email,
        subject,
        text,
      });
    } catch (err) {}

    res.status(200).json({
      message: buyer.isBlocked ? "Buyer Inactive" : "Buyer Active",
      isBlocked: buyer.isBlocked,
    });
  } catch (error) {
    res.status(500).json({ message: "Status update failed" });
  }
};