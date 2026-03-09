import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductManagement.css";

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/seller/products",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setProducts(res.data.data);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;

    await axios.delete(
      `http://localhost:5000/api/seller/products/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    fetchProducts();
  };

  return (
    <div className="product-container">
      <div className="product-header">
        <h2>Product Management</h2>
        <button
          className="add-btn"
          onClick={() => navigate("/seller/add-product")}
        >
          + Add Product
        </button>
      </div>

      <table className="product-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Status</th>
            <th>Created</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((item) => (
            <tr key={item._id}>
              <td>
                {item.image && (
                  <img
                    src={`http://localhost:5000/${item.image}`}
                    alt=""
                    width="60"
                  />
                )}
              </td>
              <td>{item.title}</td>
              <td>₹ {item.price}</td>
              <td>{item.stock}</td>
              <td>{item.category}</td>
              <td>{item.status}</td>
              <td>
                {new Date(item.createdAt)
                  .toISOString()
                  .split("T")[0]}
              </td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() =>
                    navigate(`/seller/edit-product/${item._id}`)
                  }
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}