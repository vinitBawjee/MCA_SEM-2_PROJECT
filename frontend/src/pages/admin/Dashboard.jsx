import { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

export default function AdminDashboard() {
  const token = sessionStorage.getItem("token");

  const [stats, setStats] = useState({
    products: 0,
    active: 0,
    completed: 0,
    pending: 0,
    buyers: 0,
    sellers: 0
  });

  const [monthlyBids, setMonthlyBids] = useState([]);
  const [auctionStatus, setAuctionStatus] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const [productsRes, buyersRes, sellersRes, auctionsRes] =
        await Promise.all([
          axios.get("http://localhost:5000/api/admin/products", {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get("http://localhost:5000/api/admin/buyers", {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get("http://localhost:5000/api/admin/sellers", {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get("http://localhost:5000/api/admin/biddings", {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

      const products = productsRes.data.data || [];
      const buyers = buyersRes.data.data || [];
      const sellers = sellersRes.data.data || [];
      const auctions = auctionsRes.data || [];

      const active = products.filter(p => p.status === "active").length;
      const completed = products.filter(p => p.status === "complete").length;
      const pending = products.filter(p => p.status === "pending").length;

      setStats({
        products: products.length,
        active,
        completed,
        pending,
        buyers: buyers.length,
        sellers: sellers.length
      });

      setAuctionStatus([
        { name: "Active", value: active },
        { name: "Completed", value: completed },
        { name: "Pending", value: pending }
      ]);

      const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

      const monthCounts = months.map((m, i) => ({
        month: m,
        bids: auctions.filter(a => new Date(a.createdAt).getMonth() === i).length
      }));

      setMonthlyBids(monthCounts);

    } catch (err) {
      console.log(err);
    }
  };

  const COLORS = ["#22c55e","#3b82f6","#f59e0b"];

  return (
    <div className="dashboard-container">
      <h2>Admin Dashboard</h2>

      <div className="dashboard-grid">
        <div className="card">
          <h3>Total Products</h3>
          <p>{stats.products}</p>
        </div>

        <div className="card">
          <h3>Active</h3>
          <p>{stats.active}</p>
        </div>

        <div className="card">
          <h3>Completed</h3>
          <p>{stats.completed}</p>
        </div>

        <div className="card">
          <h3>Pending</h3>
          <p>{stats.pending}</p>
        </div>

        <div className="card">
          <h3>Buyers</h3>
          <p>{stats.buyers}</p>
        </div>

        <div className="card">
          <h3>Sellers</h3>
          <p>{stats.sellers}</p>
        </div>
      </div>

      <div className="charts-row">
        <div className="chart-box">
          <h3>Monthly Bidding Activity</h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyBids}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="bids" fill="#2563eb" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h3>Auction Status</h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={auctionStatus}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {auctionStatus.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}