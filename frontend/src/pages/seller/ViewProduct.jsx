import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ViewProduct.css";

export default function ViewProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/seller/products/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setProduct(res.data.data);
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="view-container">

      <div className="view-card">

        {product.image && (
          <img
            src={`http://localhost:5000/${product.image}`}
            alt=""
          />
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
    </div>
  );
}