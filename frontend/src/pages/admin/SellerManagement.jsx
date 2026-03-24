import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SellerManagement.css";
import AlertMessage from "../../components/layout/AlertMessage";

const SellerManagement = () => {
  const [sellers, setSellers] = useState([]);
  const [confirmBox, setConfirmBox] = useState(null);
  const [alert, setAlert] = useState({ type: "", message: "" });

  useEffect(() => {
    fetchSellers();
  }, []);

  const fetchSellers = async () => {
    const token = sessionStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:5000/api/admin/sellers",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setSellers(res.data?.data || []);
  };

  const handleConfirmAction = (id, type) => {
    setConfirmBox({ id, type });
  };

  const handleConfirm = async () => {
    const token = sessionStorage.getItem("token");

    if (confirmBox.type === "toggle") {
      const res = await axios.put(
        `http://localhost:5000/api/admin/seller/block/${confirmBox.id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSellers((prev) =>
        prev.map((s) =>
          s._id === confirmBox.id
            ? { ...s, isBlocked: res.data.isBlocked }
            : s
        )
      );

      setAlert({ type: "success", message: res.data.message });
    }

    if (confirmBox.type === "delete") {
      const res = await axios.delete(
        `http://localhost:5000/api/admin/seller/${confirmBox.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSellers((prev) =>
        prev.map((s) =>
          s._id === confirmBox.id
            ? { ...s, isDeleted: true, isBlocked: true }
            : s
        )
      );

      setAlert({ type: "success", message: res.data.message });
    }

    setConfirmBox(null);
  };

  return (
    <div className="seller-container">
      <AlertMessage
        type={alert.type}
        message={alert.message}
        onClose={() => setAlert({ type: "", message: "" })}
      />

      <h2 className="seller-title">Seller Management</h2>

      <table className="seller-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Status</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {sellers.map((seller) => (
            <tr
              key={seller._id}
              className={seller.isDeleted ? "disabled-row" : ""}
            >
              <td className={seller.isDeleted ? "strike" : ""}>
                {seller.name}
              </td>
              <td className={seller.isDeleted ? "strike" : ""}>
                {seller.email}
              </td>
              <td className={seller.isDeleted ? "strike" : ""}>
                {seller.mobile}
              </td>

              <td className={seller.isBlocked ? "blocked" : "active"}>
                {seller.isBlocked ? "Inactive" : "Active"}
              </td>

              <td>
                {new Date(seller.createdAt)
                  .toISOString()
                  .split("T")[0]}
              </td>

              <td>
                {!seller.isDeleted && (
                  <button
                    className="block-btn"
                    onClick={() =>
                      handleConfirmAction(seller._id, "toggle")
                    }
                  >
                    {seller.isBlocked ? "Active" : "Inactive"}
                  </button>
                )}

                {!seller.isDeleted && (
                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleConfirmAction(seller._id, "delete")
                    }
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {confirmBox && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <h3>Confirm</h3>
            <p>
              {confirmBox.type === "toggle"
                ? "Are you sure you want to change status?"
                : "Are you sure you want to delete this seller?"}
            </p>
            <div className="confirm-actions">
              <button
                className="no-btn"
                onClick={() => setConfirmBox(null)}
              >
                No
              </button>
              <button
                className="yes-btn"
                onClick={handleConfirm}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerManagement;