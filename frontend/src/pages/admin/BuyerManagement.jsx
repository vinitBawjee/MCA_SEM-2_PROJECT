import "./BuyerManagement.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function BuyerManagement() {
  const navigate = useNavigate();

  const [buyers, setBuyers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBuyers = async () => {
      try {
        setLoading(true);

        const token = sessionStorage.getItem("token");

        if (!token) {
          setError("No token found. Please login again.");
          return;
        }

        const res = await axios.get(
          "http://localhost:5000/api/getbuyers",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // console.log("Buyers Response:", res.data);

        setBuyers(res.data?.data || []);
        setError(null);
      } catch (err) {
        console.error(err);

        setError(
          err.response?.data?.message || "Failed to fetch buyers"
        );

        setBuyers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBuyers();
  }, []);

  const handleBlock = async (id) => {
    try {
      const token = sessionStorage.getItem("token");
  
      const res = await axios.put(
        `http://localhost:5000/api/buyer/block/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      setBuyers((prev) =>
        prev.map((buyer) =>
          buyer._id === id
            ? { ...buyer, isBlocked: res.data.isBlocked }
            : buyer
        )
      );
  
    } catch (error) {
      alert("Block action failed");
    }
  };

  const handleDelete = async (id, email) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this buyer?"
    );
  
    if (!confirmDelete) return;
  
    try {
      const token = sessionStorage.getItem("token");
  
      await axios.delete(
        `http://localhost:5000/api/buyer/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      setBuyers((prev) =>
        prev.filter((buyer) => buyer._id !== id)
      );
  
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="buyer-container">
      <h2 className="buyer-title">Buyer Management</h2>

      {loading && <p>Loading buyers...</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && buyers?.length === 0 && !error && (
        <p>No buyers found</p>
      )}

      {!loading && buyers?.length > 0 && (
        <table className="buyer-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Role</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {buyers.map((buyer) => (
              <tr key={buyer._id}>
                <td>{buyer.name}</td>
                <td>{buyer.email}</td>
                <td>{buyer.mobile}</td>
                <td>{buyer.role}</td>

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
                    onClick={() => handleDelete(buyer._id, buyer.email)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}