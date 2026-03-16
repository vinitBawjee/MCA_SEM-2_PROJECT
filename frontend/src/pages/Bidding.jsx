import { useEffect, useState } from "react";
import axios from "axios";
import "./Bidding.css";

function Bidding() {

  const [bids, setBids] = useState([]);

  useEffect(() => {
    fetchBids();
  }, []);

  const fetchBids = async () => {

    const token = sessionStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:5000/api/buyer/bids",
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );

    setBids(res.data.bids);
  };

  const getAuctionInfo = (b) => {

    if(!b.createdAt){
      return {
        status: b.status,
        days: "--"
      };
    }

    const start = new Date(b.createdAt);
    const end = new Date(start);
    end.setDate(start.getDate() + 7);

    const now = new Date();
    const diff = end - now;

    if(diff <= 0){

      return {
        status: b.status === "Winning" ? "Win" : "Loss",
        days: "--"
      };

    }

    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    return {
      status: b.status,
      days: `${days} days`
    };

  };

  return (
    <div className="userdash-bidding">

      <h2>My Bids</h2>

      <table className="userdash-table">

        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>My Bid</th>
            <th>Highest Bid</th>
            <th>Status</th>
            <th>Days Left</th>
          </tr>
        </thead>

        <tbody>

          {bids.map((b) => {

            const info = getAuctionInfo(b);

            return (
              <tr key={b._id}>

                <td>{b.product}</td>
                <td>{b.category}</td>
                <td>₹{b.myBid}</td>
                <td>₹{b.highestBid}</td>

                <td className={
                  info.status === "Winning" || info.status === "Win"
                  ? "bid-win"
                  : "bid-lose"
                }>
                  {info.status}
                </td>

                <td>{info.days}</td>

              </tr>
            );

          })}

        </tbody>

      </table>

    </div>
  );
}

export default Bidding;