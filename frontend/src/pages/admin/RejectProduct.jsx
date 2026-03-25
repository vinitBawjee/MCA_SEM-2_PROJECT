import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AlertMessage from "../../components/layout/AlertMessage";
import "./ProductManagement.css";

export default function RejectProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [confirmBox, setConfirmBox] = useState(false);

  const token = sessionStorage.getItem("token");

  const handleSubmit = () => {
    if (!reason.trim()) {
      setError("Reason is required");
      return;
    }
    setError("");
    setConfirmBox(true);
  };

  const confirmReject = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/products/${id}/status`,
        { status: "rejected", reason },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAlertType("success");
      setAlertMsg("Product rejected successfully");

      setTimeout(() => {
        navigate("/admin/products");
      }, 1500);
    } catch {
      setAlertType("error");
      setAlertMsg("Reject failed");
    }
  };

  return (
    <div className="product-container">
      <h2>Reject Product</h2>

      <AlertMessage
        type={alertType}
        message={alertMsg}
        onClose={() => setAlertMsg("")}
      />

      {confirmBox && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <h3>Confirm Reject</h3>
            <p>Are you sure you want to reject this product?</p>
            <div className="confirm-actions">
              <button onClick={() => setConfirmBox(false)}>No</button>
              <button onClick={confirmReject}>Yes</button>
            </div>
          </div>
        </div>
      )}

      <div className="contact-form">
        <div className="form-group">
          <textarea
            className={error ? "input-error" : ""}
            placeholder="Enter rejection reason..."
            value={reason}
            onChange={(e) => {
              setReason(e.target.value);
              setError("");
            }}
          />
          {error && <p className="error">{error}</p>}
        </div>

        <button className="con-btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}