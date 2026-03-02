import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SellerManagement.css";

const SellerManagement = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        setLoading(true);

        const token = sessionStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/getsellers",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSellers(res.data?.data || []);
        setError(null);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch sellers"
        );
        setSellers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSellers();
  }, []);

  return (
    <div className="seller-container">
      <h2 className="seller-title">Seller Management</h2>

      {loading && <p>Loading sellers...</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && sellers.length > 0 && (
        <table className="seller-table">
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
            {sellers.map((seller) => (
              <tr key={seller._id}>
                <td>{seller.name}</td>
                <td>{seller.email}</td>
                <td>{seller.mobile}</td>
                <td>{seller.role}</td>

                <td className={seller.isBlocked ? "blocked" : "active"}>
                  {seller.isBlocked ? "Blocked" : "Active"}
                </td>

                <td>
                  {new Date(seller.createdAt)
                    .toISOString()
                    .split("T")[0]}
                </td>

                <td>
                  <button
                    className="block-btn"
                    onClick={() =>
                      navigate("/admin/action-email", {
                        state: {
                          type: seller.isBlocked
                            ? "unblock"
                            : "block",
                          role: "seller",
                          id: seller._id,
                        },
                      })
                    }
                  >
                    {seller.isBlocked ? "Unblock" : "Block"}
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      navigate("/admin/action-email", {
                        state: {
                          type: "delete",
                          role: "seller",
                          id: seller._id,
                        },
                      })
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!loading && sellers.length === 0 && !error && (
        <p>No sellers found</p>
      )}
    </div>
  );
};

export default SellerManagement;