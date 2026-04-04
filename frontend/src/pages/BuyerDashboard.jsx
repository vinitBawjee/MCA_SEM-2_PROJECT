import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import "./BuyerDashboard.css";

function BuyerDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    activeAuctions: 0,
    completedAuctions: 0,
    totalBids: 0
  });

  const [bidsData, setBidsData] = useState([]);
  const [auctionData, setAuctionData] = useState([]);

  const colors = ["#1c8f5f", "#4caf50", "#ff9800"];

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = sessionStorage.getItem("token");

      const [productsRes, bidsRes] = await Promise.all([
        axios.get("http://localhost:5000/api/buyer/products", {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get("http://localhost:5000/api/buyer/bids", {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      const products = productsRes.data.products || productsRes.data;
      const bids = bidsRes.data.bids || bidsRes.data;

      const totalProducts = products.length;

      const activeAuctions = products.filter(
        p => p.status === "active"
      ).length;

      const completedAuctions = products.filter(
        p => p.status === "complete"
      ).length;

      const totalBids = bids.length;

      setStats({
        totalProducts,
        activeAuctions,
        completedAuctions,
        totalBids
      });

      const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
      const weekly = [0,0,0,0,0,0,0];

      bids.forEach(b => {
        const d = new Date(b.createdAt).getDay();
        weekly[d] += 1;
      });

      setBidsData(
        days.map((d, i) => ({
          name: d,
          bids: weekly[i]
        }))
      );

      setAuctionData([
        { name: "Active", value: activeAuctions },
        { name: "Completed", value: completedAuctions },
        { name: "Pending", value: totalProducts - activeAuctions - completedAuctions }
      ]);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="buyer-dashboard">
      <h2>Buyer Dashboard</h2>

      <div className="userdash-cards">
        <div className="userdash-card">
          <h3>{stats.totalProducts}</h3>
          <p>Total Products</p>
        </div>

        <div className="userdash-card">
          <h3>{stats.activeAuctions}</h3>
          <p>Active Auctions</p>
        </div>

        <div className="userdash-card">
          <h3>{stats.completedAuctions}</h3>
          <p>Completed Auctions</p>
        </div>

        <div className="userdash-card">
          <h3>{stats.totalBids}</h3>
          <p>Total Bids</p>
        </div>
      </div>

      <div className="graph-grid">
        <div className="graph-box">
          <h3>Weekly Bids</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={bidsData}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="name"/>
              <YAxis/>
              <Tooltip/>
              <Line type="monotone" dataKey="bids" stroke="#1c8f5f" strokeWidth={3}/>
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="graph-box">
          <h3>Auction Status</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={auctionData} dataKey="value" outerRadius={100} label>
                {auctionData.map((entry, index) => (
                  <Cell key={index} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Legend/>
              <Tooltip/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default BuyerDashboard;