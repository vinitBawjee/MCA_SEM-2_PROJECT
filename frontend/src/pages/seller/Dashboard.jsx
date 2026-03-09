import "./Dashboard.css";

export default function SellerDashboard() {
  return (
    <div className="dashboard-container">
      <h2>Seller Dashboard</h2>

      <div className="dashboard-grid">
        <div className="card">
          <h3>My Products</h3>
          <p>25</p>
        </div>

        <div className="card">
          <h3>Active Auctions</h3>
          <p>10</p>
        </div>

        <div className="card">
          <h3>Completed Auctions</h3>
          <p>7</p>
        </div>

        <div className="card">
          <h3>Pending Approval</h3>
          <p>3</p>
        </div>

        <div className="card">
          <h3>Total Bids Received</h3>
          <p>56</p>
        </div>
      </div>
    </div>
  );
}