import "./ProductDetails.css";
import { useState, useEffect } from "react";
import { useLocation, Link, useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const location = useLocation();
  const from = location.state?.from;
  const token = sessionStorage.getItem("token");
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [history, setHistory] = useState([]);
  const [currentBid, setCurrentBid] = useState(0);
  const [amount, setAmount] = useState(0);

  const [daysLeft, setDaysLeft] = useState(0);
  const [timeLeft, setTimeLeft] = useState("");
  const [isBiddingOpen, setIsBiddingOpen] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/public/products/${id}`).then((res) => {
      setProduct(res.data.product);
      setHistory(res.data.history);
      setCurrentBid(res.data.currentBid);
      setAmount(res.data.currentBid);
    });
  }, [id]);

  useEffect(() => {
    if (!product) return;

    const timer = setInterval(() => {
      const now = new Date();
      const start = new Date(product.createdAt);
      const end = new Date(start.getTime() + 7 * 24 * 60 * 60 * 1000);
      const totalDiff = end.getTime() - now.getTime();

      if (totalDiff <= 0) {
        setDaysLeft(0);
        setTimeLeft("Auction Ended");
        setIsBiddingOpen(false);
        return;
      }

      const days = Math.floor(totalDiff / (1000 * 60 * 60 * 24));
      setDaysLeft(days);

      const todayStart = new Date(now);
      todayStart.setHours(9, 0, 0, 0);

      const todayEnd = new Date(now);
      todayEnd.setHours(16, 0, 0, 0);

      if (now < todayStart) {
        const diff = todayStart - now;
        const hrs = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const mins = Math.floor((diff / (1000 * 60)) % 60);
        const secs = Math.floor((diff / 1000) % 60);
        setTimeLeft(`Starts in ${hrs}h ${mins}m ${secs}s`);
        setIsBiddingOpen(false);
      } else if (now >= todayStart && now <= todayEnd) {
        const diff = todayEnd - now;
        const hrs = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const mins = Math.floor((diff / (1000 * 60)) % 60);
        const secs = Math.floor((diff / 1000) % 60);
        setTimeLeft(`${hrs}h ${mins}m ${secs}s`);
        setIsBiddingOpen(true);
      } else {
        setTimeLeft("Bidding closed for today");
        setIsBiddingOpen(false);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [product]);

  const increaseBid = () => {
    setAmount((prev) => prev + 10);
  };

  const decreaseBid = () => {
    setAmount((prev) => (prev - 10 < currentBid ? currentBid : prev - 10));
  };

  const submitBid = async () => {
    if (!token) {
      alert("Login required");
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/api/buyer/bid/${id}`,
        { amount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.reload();
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  if (!product) return null;

  return (
    <div className="container">
      <div className="productPage">
        <div className="breadcrumb">
          <Link to="/" className="home">Home</Link>

          {from === "auctions" && (
            <>
              <span className="arrow">›</span>
              <Link to="/auctions" className="home">Live Auctions</Link>
            </>
          )}

          <span className="arrow">›</span>
          <span className="current">{product.title}</span>
        </div>

        <div className="productContainer">
          <div className="productImage">
            <img
              src={
                product.image
                  ? `http://localhost:5000/${product.image}`
                  : "https://via.placeholder.com/250"
              }
              alt={product.title}
            />
          </div>

          <div className="productInfo">
            <h1>{product.title}</h1>

            <p className="description">{product.description}</p>

            <div className="details">
              <p>Category : {product.category}</p>
              <p>Stock : {product.stock}</p>
              <p>Price : ₹{product.price}</p>
            </div>

            <div className="bidBox">
              {product.status === "complete" ? (
                <p className="currentBid">Complete Bid : ₹{currentBid}</p>
              ) : (
                <p className="currentBid">Current Bid : ₹{currentBid}</p>
              )}

              {product.status === "pending" && (
                <p className="loginMessage">This auction has not started yet.</p>
              )}

              {product.status === "inactive" && (
                <p className="loginMessage">This auction is currently unavailable.</p>
              )}

              {product.status === "active" && (
                <>
                  {token ? (
                    <div className="bidInput">
                      <button onClick={decreaseBid} disabled={!isBiddingOpen}>-</button>

                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        disabled={!isBiddingOpen}
                      />

                      <button onClick={increaseBid} disabled={!isBiddingOpen}>+</button>

                      <button onClick={submitBid} disabled={!isBiddingOpen}>
                        Submit
                      </button>
                    </div>
                  ) : (
                    <p className="loginMessage">Login to place a bid.</p>
                  )}
                </>
              )}
            </div>
          </div>

          {(product.status === "active" || product.status === "pending") && (
            <div>
              <p>Days Left : {daysLeft}</p>
              <p>Time Left : {timeLeft}</p>
            </div>
          )}
        </div>

        <div className="tabContent">
          <h2>Auction History</h2>

          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Bid Amount</th>
                <th>User</th>
              </tr>
            </thead>

            <tbody>
              {history.length > 0 ? (
                history.map((item, index) => (
                  <tr key={index}>
                    <td>{new Date(item.createdAt).toLocaleString()}</td>
                    <td>₹{item.bidAmount}</td>
                    <td>{item.buyer?.name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={{ textAlign: "center" }}>
                    No bid found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;