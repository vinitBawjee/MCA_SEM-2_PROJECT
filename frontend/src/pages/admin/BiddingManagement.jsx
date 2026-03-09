import "./BiddingManagement.css";
import { useEffect, useState } from "react";
import axios from "axios";

const BiddingManagement = () => {

  const [filter, setFilter] = useState("active");
  const [bids, setBids] = useState([]);

  const token = sessionStorage.getItem("token");

  const fetchBids = async () => {
    try {

      const res = await axios.get(
        `http://localhost:5000/api/admin/biddings?status=${filter}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setBids(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBids();
  }, [filter]);

  const completeBid = async (id) => {
    try {

      await axios.put(
        `http://localhost:5000/api/admin/biddings/complete/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchBids();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="admin-table-container">

      <div className="table-filter">
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("inactive")}>Inactive</button>
        <button onClick={() => setFilter("complete")}>Complete</button>
      </div>

      <table className="admin-table">

        <thead>
          <tr>
            <th>Product</th>
            <th>Buyer</th>
            <th>Bid Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {bids.map((bid) => (
            <tr key={bid._id}>
              <td>{bid.product?.title}</td>
              <td>{bid.buyer?.name}</td>
              <td>{bid.bidAmount}</td>
              <td>{bid.product?.status}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
};

export default BiddingManagement;