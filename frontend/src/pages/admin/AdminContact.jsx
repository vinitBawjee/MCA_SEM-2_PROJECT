import { useEffect, useState } from "react";
import axios from "axios";
import "./ProductManagement.css";
import { useNavigate } from "react-router-dom";

export default function AdminContact() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContacts = async () => {
      const token = sessionStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/admin/contacts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(res.data.data);
    };
    fetchContacts();
  }, []);

  return (
    <div className="buyer-container">
      <h2 className="buyer-title">Contact Messages</h2>

      <div className="table-container">
        <table className="buyer-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Role</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="6">
                  No messages available
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item._id}>
                  <td>{item.userId?.name}</td>
                  <td>{item.userId?.email}</td>
                  <td>{item.userId?.mobile}</td>
                  <td>{item.userModel}</td>
                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="view-btn"
                      onClick={() => navigate(`/admin/contact/${item._id}`)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
