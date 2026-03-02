import Buyer from "../models/Buyer.js";

export const fetchBuyersService = async () => {
  const buyers = await Buyer.find()
    .select("-password")   
    .sort({ createdAt: -1 });

  if (!buyers || buyers.length === 0) {
    throw new Error("No buyers found");
  }

  return buyers;
// console.log('here');
};