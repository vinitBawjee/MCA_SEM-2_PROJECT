import mongoose from "mongoose";
import Auction from "../../models/Auction.js";
import Product from "../../models/Product.js";
import Buyer from "../../models/Buyer.js";
import Contact from "../../models/Contact.js";

export const createContact = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({ message: "Message is required" });
    }

    const contact = await Contact.create({
      userId: req.user.id,
      userModel: req.user.role === "buyer" ? "Buyer" : "Seller",
      message
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: contact
    });
  } catch {
    res.status(500).json({ message: "Failed to send message" });
  }
};

export const getBuyerProducts = async (req, res) => {

  try {

    const buyerId = req.user.id;

    const auctions = await Auction.find({ buyer: buyerId });

    const productIds = auctions.map(a => a.product);

    const products = await Product.find({
      _id: { $in: productIds }
    });

    res.json({
      success: true,
      products
    });

  } catch (error) {

    res.status(500).json({
      success:false,
      message:"Server Error"
    });

  }

};

export const getBuyerBids = async (req, res) => {

  const buyerId = req.user.id;

  const bids = await Auction.find({ buyer: buyerId })
    .populate("product")
    .sort({ createdAt: -1 });

  const uniqueMap = new Map();

  bids.forEach((bid) => {
    const productId = bid.product._id.toString();

    if (!uniqueMap.has(productId)) {
      uniqueMap.set(productId, bid);
    }
  });

  const uniqueBids = Array.from(uniqueMap.values());

  const result = await Promise.all(
    uniqueBids.map(async (bid) => {

      const highestBid = await Auction.findOne({ product: bid.product._id })
        .sort({ bidAmount: -1 });

      return {
        _id: bid._id,
        product: bid.product.title,
        category: bid.product.category,
        myBid: bid.bidAmount,
        highestBid: highestBid.bidAmount,
        status: highestBid.buyer.toString() === buyerId ? "Winning" : "Losing",
        createdAt: bid.product.createdAt,
        productStatus: bid.product.status
      };

    })
  );

  res.json({ bids: result });
};

export const getWinningBids = async (req,res) => {

  const buyerId = req.user.id;

  const bids = await Auction.aggregate([

    {
      $match:{
        buyer:new mongoose.Types.ObjectId(buyerId)
      }
    },

    {
      $lookup:{
        from:"products",
        localField:"product",
        foreignField:"_id",
        as:"productData"
      }
    },

    {
      $unwind:"$productData"
    },

    {
      $match:{
        "productData.status":"complete"
      }
    },

    {
      $group:{
        _id:"$product",
        product:{ $first:"$productData.title" },
        category:{ $first:"$productData.category" },
        image:{ $first:"$productData.image" },
        stock:{ $first:"$productData.stock" },
        myBid:{ $max:"$bidAmount" }
      }
    }

  ]);

  res.json({
    success:true,
    bids
  });

};


export const getProfile = async (req,res) => {

  const buyer = await Buyer.findById(req.user.id).select("-password");

  res.json({
    success:true,
    buyer
  });

};