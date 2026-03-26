import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductManagement.css";
import AlertMessage from "../../components/layout/AlertMessage";

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [actionType, setActionType] = useState("");
  const [alert, setAlert] = useState(null);

  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/seller/products", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const filtered = res.data.data.filter(item => item.status !== "closed");
    setProducts(filtered);
  };

  const openConfirm = (id, type) => {
    setSelectedId(id);
    setActionType(type);
    setShowConfirm(true);
  };

  const handleYes = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/seller/products/${selectedId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAlert(null);
      setTimeout(() => {
        setAlert({
          type: "success",
          message: `${actionType} successful`,
        });
      }, 100);

      setShowConfirm(false);
      fetchProducts();
    } catch {
      setAlert(null);
      setTimeout(() => {
        setAlert({ type: "error", message: "Something went wrong" });
      }, 100);

      setShowConfirm(false);
    }
  };

  const handleNo = () => {
    setShowConfirm(false);
  };

  return (
    <div className="product-container">
      {alert && <AlertMessage type={alert.type} message={alert.message} />}

      {showConfirm && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <h3>{actionType === "withdraw" ? "Withdraw" : "Close"}</h3>
            <p>
              Do you want to {actionType === "withdraw" ? "withdraw" : "close"} this record?
            </p>
            <div className="confirm-actions">
              <button className="no-btn" onClick={handleNo}>No</button>
              <button className="yes-btn" onClick={handleYes}>Yes</button>
            </div>
          </div>
        </div>
      )}

      <div className="product-header">
        <h2>Product Management</h2>
        <button className="add-btn" onClick={() => navigate("/seller/add-product")}>
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
          {products.length === 0 ? (
            <tr>
              <td colSpan="8" className="no-data">
                No products available
              </td>
            </tr>
          ) : (
            products.map((item) => (
              <tr key={item._id} className={item.status === "withdrawn" ? "withdrawn-row" : ""}>
                <td>
                  {item.status !== "withdrawn" && item.image && (
                    <img src={`http://localhost:5000/${item.image}`} alt="" width="60" />
                  )}
                </td>

                <td className={item.status === "withdrawn" ? "strike" : ""}>{item.title}</td>
                <td className={item.status === "withdrawn" ? "strike" : ""}>₹ {item.price}</td>
                <td className={item.status === "withdrawn" ? "strike" : ""}>{item.stock}</td>
                <td className={item.status === "withdrawn" ? "strike" : ""}>{item.category}</td>

                <td className={`status ${item.status}`}>{item.status}</td>

                <td className={item.status === "withdrawn" ? "strike" : ""}>
                  {new Date(item.createdAt).toISOString().split("T")[0]}
                </td>

                <td>
                  <div className="action-box">
                    {item.status === "withdrawn" ? (
                      <del>Withdrawn</del>
                    ) : (
                      <>
                        {(item.status === "inactive" ||
                          item.status === "complete" ||
                          item.status === "active") && (
                          <button
                            className="view-btn"
                            onClick={() =>
                              navigate(`/seller/view-product/${item._id}`)
                            }
                          >
                            View
                          </button>
                        )}

                        {item.status === "rejected" && (
                          <>
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
                              onClick={() => openConfirm(item._id, "close")}
                            >
                              Close
                            </button>
                          </>
                        )}

                        {item.status === "pending" && (
                          <>
                            <button
                              className="delete-btn"
                              onClick={() => openConfirm(item._id, "withdraw")}
                            >
                              Withdraw
                            </button>

                            <button
                              className="view-btn"
                              onClick={() =>
                                navigate(`/seller/view-product/${item._id}`)
                              }
                            >
                              View
                            </button>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}