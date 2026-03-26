import { useEffect, useState } from "react";
import axios from "axios";
import "./SellerBids.css";

export default function SellerBids() {
  const [bids, setBids] = useState([]);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    fetchBids();
  }, []);

  const fetchBids = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/seller/bids", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBids(res.data.data || []);
    } catch {
      setBids([]);
    }
  };

  return (
    <div className="bids-container">
      <h2>My Product Bids</h2>

      <table className="bids-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Bidder</th>
            <th>Email</th>
            <th>Bid Amount</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {bids.length === 0 ? (
            <tr>
              <td colSpan="5" className="no-data">
                No bids available
              </td>
            </tr>
          ) : (
            bids.map((item) =>
              item.topBids.map((bid, index) => (
                <tr key={bid._id}>
                  {index === 0 && (
                    <td rowSpan={item.topBids.length}>
                      <div className="product-cell">
                        {item.product?.image && (
                          <img
                            src={`http://localhost:5000/${item.product.image}`}
                            alt=""
                          />
                        )}
                        <span>{item.product?.title}</span>
                      </div>
                    </td>
                  )}

                  <td>{bid.buyer?.name}</td>
                  <td>{bid.buyer?.email}</td>
                  <td>₹ {bid.bidAmount}</td>
                  <td>
                    {new Date(bid.createdAt).toISOString().split("T")[0]}
                  </td>
                </tr>
              ))
            )
          )}
        </tbody>
      </table>
    </div>
  );
}