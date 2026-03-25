import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AlertMessage from "../../components/layout/AlertMessage";
import "./ProductManagement.css";

export default function ProductManagement() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [confirmBox, setConfirmBox] = useState(null);

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data.data);
    } catch {
      setAlertType("error");
      setAlertMsg("Failed to fetch products");
    }
  };

  const handleAction = (id, newStatus, actionName) => {
    setConfirmBox({
      id,
      newStatus,
      actionName,
    });
  };

  const confirmAction = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/products/${confirmBox.id}/status`,
        { status: confirmBox.newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAlertType("success");
      setAlertMsg(`Product ${confirmBox.actionName} successfully`);
      setConfirmBox(null);
      fetchProducts();
    } catch {
      setAlertType("error");
      setAlertMsg("Action failed");
      setConfirmBox(null);
    }
  };

  return (
    <div className="product-container">
      <h2>Product Management</h2>

      <AlertMessage
        type={alertType}
        message={alertMsg}
        onClose={() => setAlertMsg("")}
      />

      {confirmBox && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <h3>Confirm</h3>
            <p>Are you sure you want to change status?</p>
            <div className="confirm-actions">
              <button onClick={() => setConfirmBox(null)}>No</button>
              <button onClick={confirmAction}>Yes</button>
            </div>
          </div>
        </div>
      )}

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
            <tr
              key={product._id}
              className={product.status === "closed" ? "closed-row" : ""}
            >
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
                        handleAction(product._id, "active", "approved")
                      }
                    >
                      Approve
                    </button>
                    <button
                      className="reject-btn"
                      onClick={() =>
                        handleAction(product._id, "rejected", "rejected")
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
                      onClick={() =>
                        handleAction(product._id, "complete", "completed")
                      }
                    >
                      Complete
                    </button>
                    <button
                      className="action-btn"
                      onClick={() =>
                        handleAction(product._id, "inactive", "disabled")
                      }
                    >
                      Inactive
                    </button>
                  </>
                )}

                {product.status === "inactive" && (
                  <>
                    <button
                      className="approve-btn"
                      onClick={() =>
                        handleAction(product._id, "active", "activated")
                      }
                    >
                      Active
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleAction(product._id, "closed", "closed")
                      }
                    >
                      Close
                    </button>
                  </>
                )}

                {product.status === "rejected" && (
                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleAction(product._id, "closed", "closed")
                    }
                  >
                    Close
                  </button>
                )}

                {product.status === "complete" && (
                  <button
                    className="view-btn"
                    onClick={() => navigate(`/admin/products/${product._id}`)}
                  >
                    View
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
