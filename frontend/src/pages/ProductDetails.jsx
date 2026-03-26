import "./ProductDetails.css";
import { useState, useEffect } from "react";
import { useLocation, Link, useParams } from "react-router-dom";
import axios from "axios";
import AlertMessage from "../components/layout/AlertMessage";

const ProductDetails = () => {
  const location = useLocation();
  const token = sessionStorage.getItem("token");
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [history, setHistory] = useState([]);
  const [currentBid, setCurrentBid] = useState(0);
  const [amount, setAmount] = useState(0);

  const [daysLeft, setDaysLeft] = useState(0);
  const [timeLeft, setTimeLeft] = useState("");
  const [isBiddingOpen, setIsBiddingOpen] = useState(false);

  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("success");

  useEffect(() => {
    axios.get(`http://localhost:5000/api/public/products/${id}`).then((res) => {
      setProduct(res.data.product);
      setHistory(res.data.history);
      setCurrentBid(res.data.currentBid);
      setAmount(res.data.currentBid);
    });
  }, [id]);

  useEffect(() => {
    if (!product || product.status === "pending") return;

    const timer = setInterval(() => {
      const now = new Date().getTime();

      if (!product.startTime || !product.endTime) {
        setDaysLeft(0);
        setTimeLeft("Not started yet");
        setIsBiddingOpen(false);
        return;
      }

      const start = new Date(product.startTime).getTime();
      const end = new Date(product.endTime).getTime();

      if (now < start) {
        const diff = start - now;
        const hrs = Math.floor(diff / (1000 * 60 * 60));
        const mins = Math.floor((diff / (1000 * 60)) % 60);
        const secs = Math.floor((diff / 1000) % 60);

        setDaysLeft(0);
        setTimeLeft(`Starts in ${hrs}h ${mins}m ${secs}s`);
        setIsBiddingOpen(false);
        return;
      }

      if (now >= end || product.status === "complete") {
        setDaysLeft(0);
        setTimeLeft("Auction Ended");
        setIsBiddingOpen(false);
        return;
      }

      const totalDiff = end - now;
      const days = Math.floor(totalDiff / (1000 * 60 * 60 * 24));
      setDaysLeft(days);

      const todayStart = new Date();
      todayStart.setHours(9, 0, 0, 0);

      const todayEnd = new Date();
      todayEnd.setHours(16, 0, 0, 0);

      if (now < todayStart.getTime()) {
        const diff = todayStart.getTime() - now;
        const hrs = Math.floor(diff / (1000 * 60 * 60));
        const mins = Math.floor((diff / (1000 * 60)) % 60);
        const secs = Math.floor((diff / 1000) % 60);

        setTimeLeft(`Starts in ${hrs}h ${mins}m ${secs}s`);
        setIsBiddingOpen(false);
      } else if (now >= todayStart.getTime() && now <= todayEnd.getTime()) {
        const diff = todayEnd.getTime() - now;
        const hrs = Math.floor(diff / (1000 * 60 * 60));
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

  const type = location.state?.type;
  const from = location.state?.from;

  const pageTitle = {
    pending: "Upcoming Auctions",
    active: "Live Auctions",
    complete: "Past Auctions",
  };

  const increaseBid = () => {
    setAmount((prev) => prev + 10);
  };

  const decreaseBid = () => {
    setAmount((prev) => (prev - 10 < currentBid ? currentBid : prev - 10));
  };

  const submitBid = async () => {
    if (!token) {
      setAlertType("error");
      setAlertMsg("Login required");
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:5000/api/buyer/bid/${id}`,
        { amount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAlertType("success");
      setAlertMsg(res.data.message);

      const updated = await axios.get(
        `http://localhost:5000/api/public/products/${id}`
      );

      setProduct(updated.data.product);
      setHistory(updated.data.history);
      setCurrentBid(updated.data.currentBid);
      setAmount(updated.data.currentBid);
    } catch (err) {
      setAlertType("error");
      setAlertMsg(err.response?.data?.message || "Bid failed");
    }
  };

  if (!product) return null;

  const isInactive = product.status !== "active" || !isBiddingOpen;

  return (
    <div className="container">
      <AlertMessage
        type={alertType}
        message={alertMsg}
        onClose={() => setAlertMsg("")}
      />

      <div className="productPage">
        <div className="breadcrumb">
          <Link to="/" className="home">Home</Link>

          {from === "auctions" && type && (
            <>
              <span className="arrow">›</span>
              <Link to="/auctions" state={{ type }} className="home">
                {pageTitle[type]}
              </Link>
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

            {product.status !== "pending" && (
              <div className="bidBox">
                {product.status === "complete" ? (
                  <p className="currentBid">Complete Bid : ₹{currentBid}</p>
                ) : product.status === "active" && !token ? (
                  <p className="currentBid">Login is required to place a bid</p>
                ) : isInactive ? (
                  <p className="currentBid">Auction is temporarily inactive</p>
                ) : (
                  <p className="currentBid">Current Bid : ₹{currentBid}</p>
                )}

                {product.status === "active" && token && (
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
                )}
              </div>
            )}
          </div>

          {product.status === "active" && (
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