import { useEffect, useState } from "react";
import axios from "axios";
import "./ProductManagement.css";

export default function ProductManagement() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const token = sessionStorage.getItem("token");

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data.data);
    } catch {
      alert("Failed to fetch products");
    }
  };

  const updateStatus = async (id, currentStatus, action) => {
    let newStatus = currentStatus;

    if (currentStatus === "pending" && action === "approve")
      newStatus = "active";
    if (currentStatus === "pending" && action === "reject")
      newStatus = "inactive";
    if (currentStatus === "active" && action === "disable")
      newStatus = "inactive";
    if (currentStatus === "inactive" && action === "activate")
      newStatus = "active";

    const confirmAction = window.confirm(
      `Are you sure you want to ${action} this product?`
    );

    if (!confirmAction) return;

    try {
      await axios.put(
        `http://localhost:5000/api/admin/products/${id}/status`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchProducts();
    } catch {
      alert("Status update failed");
    }
  };

  const completeAuction = async (id) => {
    const confirmComplete = window.confirm(
      "Are you sure you want to complete this auction?"
    );
  
    if (!confirmComplete) return;
  
    try {
      await axios.put(
        `http://localhost:5000/api/admin/biddings/complete/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      fetchProducts();
    } catch (error) {
      alert("Auction complete failed");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/admin/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchProducts();
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div className="product-container">
      <h2>Product Management</h2>

      <table className="product-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Seller</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>
                {product.image && (
                  <img
                    src={`http://localhost:5000/${product.image}`}
                    alt={product.title}
                    className="product-img"
                  />
                )}
              </td>

              <td>{product.title}</td>
              <td>{product.seller?.name}</td>
              <td>₹ {product.price}</td>
              <td>{product.stock}</td>

              <td className={`status ${product.status}`}>{product.status}</td>

              <td>
                {product.status === "pending" && (
                  <>
                    <button
                      className="approve-btn"
                      onClick={() =>
                        updateStatus(product._id, product.status, "approve")
                      }
                    >
                      Approve
                    </button>

                    <button
                      className="reject-btn"
                      onClick={() =>
                        updateStatus(product._id, product.status, "reject")
                      }
                    >
                      Reject
                    </button>
                  </>
                )}

                {product.status === "active" && (
                  <>
                    <button
                      className="complete-btn"
                      onClick={() => completeAuction(product._id)}
                    >
                      Complete
                    </button>

                    <button
                      className="reject-btn"
                      onClick={() =>
                        updateStatus(product._id, product.status, "disable")
                      }
                    >
                      Disable
                    </button>
                  </>
                )}

                {product.status === "inactive" && (
                  <button
                    className="approve-btn"
                    onClick={() =>
                      updateStatus(product._id, product.status, "activate")
                    }
                  >
                    Activate
                  </button>
                )}

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(product._id)}
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
