import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import "./BuyerDashboard.css";

const bidsData = [
  { name: "Mon", bids: 3 },
  { name: "Tue", bids: 6 },
  { name: "Wed", bids: 4 },
  { name: "Thu", bids: 8 },
  { name: "Fri", bids: 5 },
  { name: "Sat", bids: 9 },
  { name: "Sun", bids: 7 }
];

const auctionData = [
  { name: "Active", value: 10 },
  { name: "Completed", value: 5 },
  { name: "Pending", value: 3 }
];

const categoryData = [
  { name: "Electronics", products: 12 },
  { name: "Mobiles", products: 8 },
  { name: "Fashion", products: 6 },
  { name: "Accessories", products: 5 }
];

const colors = ["#1c8f5f", "#4caf50", "#ff9800"];

function BuyerDashboard() {
  return (
    <div className="buyer-dashboard">

      <h2>Buyer Dashboard</h2>

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
              <Pie
                data={auctionData}
                dataKey="value"
                outerRadius={100}
                label
              >
                {auctionData.map((entry, index) => (
                  <Cell key={index} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Legend/>
              <Tooltip/>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* <div className="graph-box full">
          <h3>Products by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="name"/>
              <YAxis/>
              <Tooltip/>
              <Bar dataKey="products" fill="#1c8f5f"/>
            </BarChart>
          </ResponsiveContainer>
        </div> */}

      </div>

    </div>
  );
}

export default BuyerDashboard;