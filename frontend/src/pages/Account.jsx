import Sidebar from "../components/layout/Sidebar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import "./BuyerDashboard.css";

const data = [
  { name: "Jan", bids: 4 },
  { name: "Feb", bids: 7 },
  { name: "Mar", bids: 3 },
  { name: "Apr", bids: 10 },
  { name: "May", bids: 6 },
  { name: "Jun", bids: 12 }
];

function BuyerDashboard() {
  return (
    <div className="userdash-layout">
      <Sidebar />

      <div className="userdash-content">

        <h2>User Dashboard</h2>

        <div className="userdash-cards">
          <div className="userdash-card">
            <h3>25</h3>
            <p>Total Products</p>
          </div>

          <div className="userdash-card">
            <h3>10</h3>
            <p>Active Auctions</p>
          </div>

          <div className="userdash-card">
            <h3>5</h3>
            <p>Completed Auctions</p>
          </div>

          <div className="userdash-card">
            <h3>18</h3>
            <p>Total Bids</p>
          </div>
        </div>

        <div className="userdash-graph">
          <h3>Bids Overview</h3>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="name"/>
              <YAxis/>
              <Tooltip/>
              <Line type="monotone" dataKey="bids" stroke="#1c8f5f" strokeWidth={3}/>
            </LineChart>
          </ResponsiveContainer>

        </div>

      </div>
    </div>
  );
}

export default BuyerDashboard;