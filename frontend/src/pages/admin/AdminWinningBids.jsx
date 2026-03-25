import { useEffect, useState } from "react";
import axios from "axios";
import "./ProductManagement.css";

export default function AdminWinningBids() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/admin/completed-winning-bids", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(res.data.data);
    };
    fetchData();
  }, []);

  return (
    <div className="buyer-container">
      <h2 className="buyer-title">Completed Winning Bids</h2>

      <div className="table-container">
        <table className="buyer-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Base Price</th>
              <th>Seller</th>
              <th>Seller Contact</th>
              <th>Buyer</th>
              <th>Buyer Contact</th>
              <th>Winning Bid</th>
              <th>Bid Date</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: "center" }}>
                  No completed bids available
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item._id}>
                  <td>
                    <div className="product-cell">
                      {item.product.image && (
                        <img
                          src={`http://localhost:5000/${item.product.image}`}
                          alt=""
                          width="60"
                        />
                      )}
                      <span>{item.product.title}</span>
                    </div>
                  </td>

                  <td>{item.product.category}</td>
                  <td>₹ {item.product.price}</td>

                  <td>{item.seller.name}</td>
                  <td>
                    {item.seller.email}
                    <br />
                    {item.seller.mobile}
                  </td>

                  <td>{item.winningBid.buyerName}</td>
                  <td>
                    {item.winningBid.buyerEmail}
                    <br />
                    {item.winningBid.buyerMobile}
                  </td>

                  <td>₹ {item.winningBid.bidAmount}</td>

                  <td>
                    {new Date(item.winningBid.date).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}