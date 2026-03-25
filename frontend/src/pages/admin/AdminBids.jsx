import { useEffect, useState } from "react";
import axios from "axios";
import "./ProductManagement.css";

export default function AdminBids() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchBids = async () => {
      const token = sessionStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/admin/all-bids", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(res.data.data);
    };
    fetchBids();
  }, []);

  return (
    <div className="buyer-container">
      <h2 className="buyer-title">All Product Bids</h2>

      <div className="table-container">
        <table className="buyer-table">
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
            {data.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No bids available
                </td>
              </tr>
            ) : (
              data.map((item) =>
                item.bids.length === 0 ? (
                  <tr key={item.product._id}>
                    <td>
                      <div className="product-cell">
                        {item.product.status !== "withdrawn" &&
                          item.product.image && (
                            <img
                              src={`http://localhost:5000/${item.product.image}`}
                              alt=""
                              width="60"
                            />
                          )}
                        <span>{item.product.title}</span>
                      </div>
                    </td>
                    <td colSpan="4" style={{ textAlign: "center" }}>
                      No bids available
                    </td>
                  </tr>
                ) : (
                  item.bids.map((bid, index) => (
                    <tr key={index}>
                      {index === 0 && (
                        <td rowSpan={item.bids.length}>
                          <div className="product-cell">
                            {item.product.status !== "withdrawn" &&
                              item.product.image && (
                                <img
                                  src={`http://localhost:5000/${item.product.image}`}
                                  alt=""
                                  width="60"
                                />
                              )}
                            <span>{item.product.title}</span>
                          </div>
                        </td>
                      )}
                      <td>{bid.bidder}</td>
                      <td>{bid.email}</td>
                      <td>₹ {bid.bidAmount}</td>
                      <td>
                        {new Date(bid.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}