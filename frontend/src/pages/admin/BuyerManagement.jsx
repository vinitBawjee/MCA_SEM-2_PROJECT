import "./BuyerManagement.css";
import { useEffect, useState } from "react";
import axios from "axios";
import AlertMessage from "../../components/layout/AlertMessage";

export default function BuyerManagement() {
  const [buyers, setBuyers] = useState([]);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [confirmBox, setConfirmBox] = useState(null);

  useEffect(() => {
    fetchBuyers();
  }, []);

  const fetchBuyers = async () => {
    const token = sessionStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:5000/api/admin/buyers",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setBuyers(res.data.data || []);
  };

  const handleActionConfirm = (id, type) => {
    setConfirmBox({ id, type });
  };

  const handleConfirm = async () => {
    const token = sessionStorage.getItem("token");

    if (confirmBox.type === "toggle") {
      const res = await axios.put(
        `http://localhost:5000/api/admin/buyer/block/${confirmBox.id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setBuyers((prev) =>
        prev.map((b) =>
          b._id === confirmBox.id
            ? { ...b, isBlocked: res.data.isBlocked }
            : b
        )
      );

      setAlert({ type: "success", message: res.data.message });
    }

    if (confirmBox.type === "delete") {
      await axios.delete(
        `http://localhost:5000/api/admin/buyer/${confirmBox.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setBuyers((prev) =>
        prev.map((b) =>
          b._id === confirmBox.id
            ? { ...b, isDeleted: true, isBlocked: true }
            : b
        )
      );

      setAlert({ type: "success", message: "Buyer deleted successfully" });
    }

    setConfirmBox(null);
  };

  return (
    <div className="buyer-container">
      <AlertMessage
        type={alert.type}
        message={alert.message}
        onClose={() => setAlert({ type: "", message: "" })}
      />

      <h2 className="buyer-title">Buyer Management</h2>

      <table className="buyer-table">
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
          {buyers.length === 0 ? (
            <tr>
              <td colSpan="6" className="no-data">
                No buyers available
              </td>
            </tr>
          ) : (
            buyers.map((buyer) => (
              <tr
                key={buyer._id}
                className={buyer.isDeleted ? "disabled-row" : ""}
              >
                <td className={buyer.isDeleted ? "strike" : ""}>
                  {buyer.name}
                </td>
                <td className={buyer.isDeleted ? "strike" : ""}>
                  {buyer.email}
                </td>
                <td className={buyer.isDeleted ? "strike" : ""}>
                  {buyer.mobile}
                </td>

                <td>
                  <span className={buyer.isBlocked ? "blocked" : "active"}>
                    {buyer.isBlocked ? "Inactive" : "Active"}
                  </span>
                </td>

                <td>
                  {new Date(buyer.createdAt)
                    .toISOString()
                    .split("T")[0]}
                </td>

                <td>
                  {!buyer.isDeleted && (
                    <button
                      className="block-btn"
                      onClick={() =>
                        handleActionConfirm(buyer._id, "toggle")
                      }
                    >
                      {buyer.isBlocked ? "Active" : "Inactive"}
                    </button>
                  )}

                  {!buyer.isDeleted && (
                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleActionConfirm(buyer._id, "delete")
                      }
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {confirmBox && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <h3>Confirm</h3>
            <p>
              {confirmBox.type === "toggle"
                ? "Are you sure you want to change status?"
                : "Are you sure you want to delete this buyer?"}
            </p>
            <div className="confirm-actions">
              <button
                className="no-btn"
                onClick={() => setConfirmBox(null)}
              >
                No
              </button>
              <button className="yes-btn" onClick={handleConfirm}>
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}