import Contact from "../../models/Contact.js";

export const getSingleContact = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findById(id).populate({
      path: "userId",
      select: "name email mobile",
    });

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllContacts = async (req, res) => {
  try {
    const data = await Contact.find()
      .populate({
        path: "userId",
        select: "name email mobile"
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};