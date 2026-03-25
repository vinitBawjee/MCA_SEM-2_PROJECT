import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ViewProduct.css";

export default function ViewProduct() {
  const { id } = useParams();
  const token = sessionStorage.getItem("token");

  const [product, setProduct] = useState(null);
  const [bids, setBids] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const productRes = await axios.get(
      `http://localhost:5000/api/admin/products/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const bidsRes = await axios.get(
      `http://localhost:5000/api/admin/products/${id}/bids`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setProduct(productRes.data.data);
    setBids(bidsRes.data.data);
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="view-container">

      <div className="view-card">

        {product.image && (
          <img src={`http://localhost:5000/${product.image}`} alt="" />
        )}

        <div className="view-details">
          <h2>{product.title}</h2>

          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Price:</strong> ₹ {product.price}</p>
          <p><strong>Stock:</strong> {product.stock}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Status:</strong> {product.status}</p>
          <p>
            <strong>Created:</strong>{" "}
            {new Date(product.createdAt).toISOString().split("T")[0]}
          </p>
        </div>
      </div>

      <div className="bids-section">
        <h3>All Bids</h3>

        <table className="bids-table">
          <thead>
            <tr>
              <th>Buyer</th>
              <th>Email</th>
              <th>Bid Amount</th>
              <th>Date & Time</th>
            </tr>
          </thead>

          <tbody>
            {bids.length > 0 ? (
              bids.map((bid) => (
                <tr key={bid._id}>
                  <td>{bid.buyer?.name}</td>
                  <td>{bid.buyer?.email}</td>
                  <td>₹ {bid.bidAmount}</td>
                  <td>
                    {new Date(bid.createdAt).toLocaleString("en-GB")}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No bids available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}