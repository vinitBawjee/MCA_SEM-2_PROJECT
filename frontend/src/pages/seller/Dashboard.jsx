import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);
import "./Dashboard.css";

export default function Dashboard() {
  const token = sessionStorage.getItem("token");

  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/seller/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setStats(res.data);
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    }
  };

  if (!stats) return <p>Loading...</p>;

  const chartData = {
    labels: stats.bidStats.map((item) => item._id),
    datasets: [
      {
        label: "Bids Per Product",
        data: stats.bidStats.map((item) => item.totalBids)
      }
    ]
  };

  return (
    <div className="seller-dashboard">
      <h2>Seller Dashboard</h2>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Products</h3>
          <p>{stats.totalProducts}</p>
        </div>

        <div className="card">
          <h3>Active Auctions</h3>
          <p>{stats.activeProducts}</p>
        </div>

        <div className="card">
          <h3>Completed Auctions</h3>
          <p>{stats.completedProducts}</p>
        </div>

        <div className="card">
          <h3>Total Bids</h3>
          <p>{stats.totalBids}</p>
        </div>
      </div>

      <div className="chart-container">
        <Bar data={chartData} />
      </div>
    </div>
  );
}