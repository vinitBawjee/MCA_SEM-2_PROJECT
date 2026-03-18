import { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function SellerDashboard() {

  const token = sessionStorage.getItem("token");
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/seller/dashboard",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    setData(res.data);
  };

  if (!data) return <p>Loading...</p>;

  const barData = {
    labels: data.bidStats.map((item) => item.productName),
    datasets: [
      {
        label: "Bids",
        data: data.bidStats.map((item) => item.totalBids),
        backgroundColor: "#1c8f5f"
      }
    ]
  };

  const barOptions = {
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: {
        ticks: {
          callback: function(value) {
            const label = this.getLabelForValue(value);
            return label.length > 10 ? label.substring(0, 10) + "..." : label;
          }
        }
      }
    }
  };

  const pieData = {
    labels: ["Active", "Completed", "Others"],
    datasets: [
      {
        data: [
          data.activeProducts,
          data.completedProducts,
          data.totalProducts - data.activeProducts - data.completedProducts
        ],
        backgroundColor: ["#1c8f5f", "#3498db", "#e74c3c"]
      }
    ]
  };

  return (
    <div className="dashboard-container">

      <h2>Seller Dashboard</h2>

      <div className="dashboard-cards">

        <div className="card">
          <h3>Total Products</h3>
          <p>{data.totalProducts}</p>
        </div>

        <div className="card">
          <h3>Active Products</h3>
          <p>{data.activeProducts}</p>
        </div>

        <div className="card">
          <h3>Completed Products</h3>
          <p>{data.completedProducts}</p>
        </div>

        <div className="card">
          <h3>Total Bids</h3>
          <p>{data.totalBids}</p>
        </div>

      </div>

      <div className="chart-grid">

        <div className="chart-box">
          <h3>Bids Per Product</h3>
          {data.bidStats.length === 0 ? (
            <p>No data available</p>
          ) : (
            <Bar data={barData} options={barOptions} />
          )}
        </div>

        <div className="chart-box">
          <h3>Product Status</h3>
          <Pie data={pieData} />
        </div>

      </div>

    </div>
  );
}