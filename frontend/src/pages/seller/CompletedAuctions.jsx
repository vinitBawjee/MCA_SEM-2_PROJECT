import { useEffect, useState } from "react";
import axios from "axios";
import "./CompletedAuctions.css";

const CompletedAuctions = () => {
  const [data, setData] = useState([]);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    fetchCompletedAuctions();
  }, []);

  const fetchCompletedAuctions = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/seller/completed-auctions",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    setData(res.data.data);
  };

  return (
    <div className="completed-container">
      <h2>Winning Auctions</h2>

      <table className="completed-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Product</th>
            <th>Start Price</th>
            <th>Winner</th>
            <th>Email</th>
            <th>Winning Bid</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                No Winning Auctions Found
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.productId}>
                <td>
                  {item.productImage && (
                    <img
                      src={`http://localhost:5000/${item.productImage}`}
                      alt={item.productTitle}
                      width="60"
                    />
                  )}
                </td>
                <td>{item.productTitle}</td>
                <td>₹ {item.startPrice}</td>
                <td>{item.buyerName}</td>
                <td>{item.buyerEmail}</td>
                <td>₹ {item.highestBid}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CompletedAuctions;