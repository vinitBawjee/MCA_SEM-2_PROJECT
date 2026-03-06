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

    seller.isBlocked = !seller.isBlocked;
    await seller.save();

    const subjectRepos = seller.isBlocked
      ? "Seller Account Blocked"
      : "Seller Account Unblocked";

      const textRepos = seller.isBlocked
      ? `Hello ${seller.name},
    
        Your Seller account has been BLOCKED by the admin.
        
        You can still login to your account, but you will NOT be able to add, edit, or manage products until your account is unblocked.
        
        If you believe this action was taken by mistake, please contact support.`
          : `Hello ${seller.name},
        
        Your Seller account has been UNBLOCKED by the admin.
        
        You can now login and manage your products normally.`;

    try {
      await sendEmail({
        to: seller.email,
        subject: subjectRepos,
        text: textRepos,
      });
    } catch (err) {
      console.log("Mail failed:", err.message);
    }

    res.status(200).json({
      message: seller.isBlocked
        ? "Seller account blocked"
        : "Seller account unblocked",
      isBlocked: seller.isBlocked,
    });

  } catch (error) {
    res.status(500).json({ message: "Block action failed" });
  }
};

export const deleteSeller = async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.id);

    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    const email = seller.email;
    const name = seller.name;

    await seller.deleteOne();

    try {
      await sendEmail({
        to: email,
        subject: "Seller Account Deleted",
        text: `Hello ${name},

        Your Seller account has been permanently DELETED by the admin.

        You will no longer be able to access the system.

        If you think this was done in error, please contact support.`,
      });
    } catch (err) {
      console.log("Mail failed:", err.message);
    }

    res.status(200).json({ message: "Seller deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};