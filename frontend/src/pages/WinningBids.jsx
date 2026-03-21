import { useEffect, useState } from "react";
import axios from "axios";
import "./WinningBids.css";

function WinningBids() {

  const [bids,setBids] = useState([]);

  useEffect(() => {
    fetchWinningBids();
  }, []);

  const fetchWinningBids = async () => {

    const token = sessionStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:5000/api/buyer/winning-bids",
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );

    setBids(res.data.bids || []);
  };

  return (
    <div className="userdash-winning">

      <h2>Winning Auctions</h2>

      <table className="userdash-table">

        <thead>
          <tr>
            <th>Image</th>
            <th>Product</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Winning Bid</th>
            <th>Transaction</th>
          </tr>
        </thead>

        <tbody>

          {bids.length === 0 ? (
            <tr>
              <td colSpan="6" className="no-data">
                No Winning Auctions Found
              </td>
            </tr>
          ) : (
            bids.map((b) => (
              <tr key={b._id}>

                <td>
                  <img
                    src={`http://localhost:5000/${b.image}`}
                    alt={b.product}
                    className="userdash-product-img"
                  />
                </td>

                <td>{b.product}</td>
                <td>{b.category}</td>
                <td>{b.stock}</td>
                <td>₹{b.myBid}</td>

                <td>
                  <button className="userdash-transaction-btn">
                    Pay
                  </button>
                </td>

              </tr>
            ))
          )}

        </tbody>

      </table>

    </div>
  );
}

export default WinningBids;