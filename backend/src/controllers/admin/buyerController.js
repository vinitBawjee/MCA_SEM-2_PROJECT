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

    const email = buyer.email;
    const name = buyer.name;

    await buyer.deleteOne();

    try {
      await sendEmail({
        to: email,
        subject: "Account Deleted",
        text: `Hello ${name}, your account has been deleted by admin.`,
      });
    } catch (mailError) {
      console.log("Email failed but user deleted:", mailError.message);
    }

    res.status(200).json({ message: "Buyer deleted successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Delete failed" });
  }
};

export const toggleBlockBuyer = async (req, res) => {
  try {
    const buyer = await Buyer.findById(req.params.id);

    if (!buyer) {
      return res.status(404).json({ message: "Buyer not found" });
    }

    buyer.isBlocked = !buyer.isBlocked;
    await buyer.save();

    const subject = buyer.isBlocked
      ? "Account Blocked"
      : "Account Unblocked";

    const text = buyer.isBlocked
      ? `Hello ${buyer.name}, your account has been blocked by admin.`
      : `Hello ${buyer.name}, your account has been unblocked by admin.`;

    try {
      await sendEmail({
        to: buyer.email,
        subject,
        text,
      });
    } catch (mailError) {
      console.log("Mail failed:", mailError.message);
    }

    res.status(200).json({
      message: buyer.isBlocked
        ? "Buyer blocked"
        : "Buyer unblocked",
      isBlocked: buyer.isBlocked,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Block action failed" });
  }
};