import Auction from "../../models/Auction.js";

export const getCompletedWinningBids = async (req, res) => {
  try {
    const data = await Auction.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "product",
          foreignField: "_id",
          as: "product"
        }
      },
      { $unwind: "$product" },

      {
        $match: {
          "product.status": "complete"
        }
      },

      { $sort: { bidAmount: -1 } },

      {
        $lookup: {
          from: "buyers",
          localField: "buyer",
          foreignField: "_id",
          as: "buyer"
        }
      },
      { $unwind: "$buyer" },

      {
        $lookup: {
          from: "sellers",
          localField: "product.seller",
          foreignField: "_id",
          as: "seller"
        }
      },
      { $unwind: "$seller" },

      {
        $group: {
          _id: "$product._id",

          product: {
            $first: {
              title: "$product.title",
              price: "$product.price",
              category: "$product.category",
              image: "$product.image",
              status: "$product.status",
              createdAt: "$product.createdAt"
            }
          },

          seller: {
            $first: {
              name: "$seller.name",
              email: "$seller.email",
              mobile: "$seller.mobile"
            }
          },

          winningBid: {
            $first: {
              buyerName: "$buyer.name",
              buyerEmail: "$buyer.email",
              buyerMobile: "$buyer.mobile",
              bidAmount: "$bidAmount",
              date: "$createdAt"
            }
          }
        }
      }
    ]);

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllProductsWithTopBids = async (req, res) => {
  try {
    const data = await Auction.aggregate([
      {
        $sort: { bidAmount: -1 }
      },
      {
        $lookup: {
          from: "products",
          localField: "product",
          foreignField: "_id",
          as: "product"
        }
      },
      {
        $unwind: "$product"
      },
      {
        $lookup: {
          from: "buyers",
          localField: "buyer",
          foreignField: "_id",
          as: "buyer"
        }
      },
      {
        $unwind: "$buyer"
      },
      {
        $group: {
          _id: "$product._id",
          product: { $first: "$product" },
          bids: {
            $push: {
              bidder: "$buyer.name",
              email: "$buyer.email",
              bidAmount: "$bidAmount",
              date: "$createdAt"
            }
          }
        }
      },
      {
        $project: {
          product: 1,
          bids: { $slice: ["$bids", 3] }
        }
      }
    ]);

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};