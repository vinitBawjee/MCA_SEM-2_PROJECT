import Contact from "../../models/Contact.js";

export const createContact = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ msg: "Message required" });
    }

    const contact = await Contact.create({
      userId: req.user.id,
      userModel: req.user.role === "seller" ? "Seller" : "Buyer",
      message
    });

    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};