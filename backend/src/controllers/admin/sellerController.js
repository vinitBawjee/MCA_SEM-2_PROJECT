import Seller from "../../models/Seller.js";
import sendEmail from "../../utils/sendEmail.js";

export const getAllSellers = async (req, res) => {
  try {
    const sellers = await Seller.find({ role: { $ne: "admin" } })
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({ data: sellers });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch sellers" });
  }
};

export const toggleBlockSeller = async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.id);

    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    if (seller.isDeleted) {
      return res.status(400).json({ message: "Deleted seller cannot be updated" });
    }

    seller.isBlocked = !seller.isBlocked;
    await seller.save();

    const subject = seller.isBlocked
      ? "Account Inactive"
      : "Account Active";

    const text = seller.isBlocked
      ? `Hello ${seller.name}, your account has been set to inactive by admin.`
      : `Hello ${seller.name}, your account has been activated by admin.`;

    try {
      await sendEmail({
        to: seller.email,
        subject,
        text,
      });
    } catch (err) {}

    res.status(200).json({
      message: seller.isBlocked ? "Seller Inactive" : "Seller Active",
      isBlocked: seller.isBlocked,
    });
  } catch (error) {
    res.status(500).json({ message: "Status update failed" });
  }
};

export const deleteSeller = async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.id);

    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    seller.isDeleted = true;
    seller.isBlocked = true;
    await seller.save();

    try {
      await sendEmail({
        to: seller.email,
        subject: "Account Deleted",
        text: `Hello ${seller.name}, your account has been deleted by admin. You can no longer access the platform.`,
      });
    } catch (err) {}

    res.status(200).json({ message: "Seller deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};