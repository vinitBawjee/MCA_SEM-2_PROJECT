import "./BuyerManagement.css";
import { useEffect, useState } from "react";
import axios from "axios";
import AlertMessage from "../../components/common/AlertMessage";

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

  const handleBlock = async (id) => {
    const token = sessionStorage.getItem("token");

    const res = await axios.put(
      `http://localhost:5000/api/admin/buyer/block/${id}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setBuyers((prev) =>
      prev.map((b) =>
        b._id === id ? { ...b, isBlocked: res.data.isBlocked } : b
      )
    );

    setAlert({ type: "success", message: res.data.message });
  };

  const handleDeleteConfirm = (id) => {
    setConfirmBox(id);
  };

  const handleDelete = async () => {
    const token = sessionStorage.getItem("token");

    await axios.delete(
      `http://localhost:5000/api/admin/buyer/${confirmBox}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setBuyers((prev) =>
      prev.map((b) =>
        b._id === confirmBox ? { ...b, isBlocked: true } : b
      )
    );

    setConfirmBox(null);
    setAlert({ type: "success", message: "Buyer disabled successfully" });
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
          {buyers.map((buyer) => (
            <tr
              key={buyer._id}
              className={buyer.isBlocked ? "disabled-row" : ""}
            >
              <td className={buyer.isBlocked ? "strike" : ""}>
                {buyer.name}
              </td>
              <td className={buyer.isBlocked ? "strike" : ""}>
                {buyer.email}
              </td>
              <td className={buyer.isBlocked ? "strike" : ""}>
                {buyer.mobile}
              </td>

              <td>
                <span
                  className={
                    buyer.isBlocked ? "blocked" : "active"
                  }
                >
                  {buyer.isBlocked ? "Blocked" : "Active"}
                </span>
              </td>

              <td>
                {new Date(buyer.createdAt)
                  .toISOString()
                  .split("T")[0]}
              </td>

              <td>
                <button
                  className="block-btn"
                  onClick={() => handleBlock(buyer._id)}
                >
                  {buyer.isBlocked ? "Unblock" : "Block"}
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDeleteConfirm(buyer._id)}
                >
                  Disable
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {confirmBox && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <h3>Confirm</h3>
            <p>Are you sure you want to disable this buyer?</p>
            <div className="confirm-actions">
              <button
                className="no-btn"
                onClick={() => setConfirmBox(null)}
              >
                No
              </button>
              <button className="yes-btn" onClick={handleDelete}>
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}