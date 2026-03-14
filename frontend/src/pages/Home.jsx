import "./Home.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const [liveProducts, setLiveProducts] = useState([]);
  const [pendingProducts, setPendingProducts] = useState([]);
  const [completeProducts, setCompleteProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("painting");

  const categories = [
    "painting",
    "jewellery",
    "timepieces",
    "silver",
    "furniture and decorative",
  ];

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      const liveRes = await axios.get(
        "http://localhost:5000/api/public/products"
      );
      const pendingRes = await axios.get(
        "http://localhost:5000/api/public/pending-products"
      );
      const completeRes = await axios.get(
        "http://localhost:5000/api/public/complete-products"
      );

      setLiveProducts(liveRes.data.data);
      setPendingProducts(pendingRes.data.data);
      setCompleteProducts(completeRes.data.data);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  const filteredLiveProducts = liveProducts
    .filter((p) => p.category?.toLowerCase() === activeCategory)
    .slice(0, 5);

  return (
    <div className="container">
      <section className="record-section">
        <div className="record-header">
          <h1>LIVE AUCTIONS</h1>

          <div className="tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`tab ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="card-grid">
          {filteredLiveProducts.length > 0 ? (
            filteredLiveProducts.map((item) => (
              <div
                className={`auction-card ${
                  item.status !== "active" ? "inactive-card" : ""
                }`}
                key={item._id}
                onClick={() => navigate(`/product/${item._id}`)}
              >
                <div className="image-box">
                  {item.status !== "active" && (
                    <span className="auction-status">
                      This auction is not active
                    </span>
                  )}

                  <img
                    src={
                      item.image
                        ? `http://localhost:5000/${item.image}`
                        : "https://via.placeholder.com/250x250"
                    }
                    alt={item.title}
                  />
                </div>

                <span className="lot">{item.category}</span>

                <h3 className="artist">
                  {item.seller?.name || "Unknown Seller"}
                </h3>

                <p className="title">{item.title}</p>

                <p className="sold">Starting Price</p>

                <h2 className="price">₹ {item.price}</h2>

                <p className="margin">Stock: {item.stock}</p>
              </div>
            ))
          ) : (
            <p style={{ color: "white" }}>No Live Auctions in this category</p>
          )}
        </div>

        <div className="view-all">
          <button
            onClick={() => navigate("/auctions", { state: { type: "active" } })}
          >
            View All
          </button>
        </div>
      </section>
      <section className="recent-section">
        <div className="recent-header">
          <h1>UPCOMING AUCTIONS</h1>
        </div>

        <div className="recent-grid">
          {pendingProducts.length > 0 ? (
            pendingProducts.slice(0, 5).map((item) => (
              <div className="recent-card" key={item._id}>
                <div className="recent-image">
                  <img
                    src={
                      item.image
                        ? `http://localhost:5000/${item.image}`
                        : "https://via.placeholder.com/300x300"
                    }
                    alt={item.title}
                  />
                </div>

                <h3 className="recent-title">{item.title}</h3>

                {/* <button className="result-btn" onClick={() => navigate(`/product/${item._id}`)}>
                  VIEW DETAILS
                </button> */}
                <Link
                  className="result-btn"
                  to={`/product/${item._id}`}
                  state={{ from: "home" }}
                >
                  {" "}
                  View Details{" "}
                </Link>
              </div>
            ))
          ) : (
            <p style={{ color: "white" }}>No Upcoming Auctions</p>
          )}
        </div>

        <div className="recent-view">
          <button
            onClick={() =>
              navigate("/auctions", { state: { type: "pending" } })
            }
          >
            View All
          </button>
        </div>
      </section>
      <section className="recent-section">
        <div className="recent-header">
          <h1>PAST AUCTIONS</h1>
        </div>

        <div className="recent-grid">
          {completeProducts.length > 0 ? (
            completeProducts.slice(0, 5).map((item) => (
              <div className="recent-card" key={item._id}>
                <div className="recent-image">
                  <img
                    src={
                      item.image
                        ? `http://localhost:5000/${item.image}`
                        : "https://via.placeholder.com/300x300"
                    }
                    alt={item.title}
                  />
                </div>

                <h3 className="recent-title">{item.title}</h3>

                {/* <button className="result-btn" onClick={() => navigate(`/product/${item._id}`)}>
                  VIEW DETAILS
                </button> */}
                <Link
                  className="result-btn"
                  to={`/product/${item._id}`}
                  state={{ from: "home" }}
                >
                  {" "}
                  View Details{" "}
                </Link>
              </div>
            ))
          ) : (
            <p style={{ color: "white" }}>No Past Auctions</p>
          )}
        </div>

        <div className="recent-view">
          <button
            onClick={() =>
              navigate("/auctions", { state: { type: "complete" } })
            }
          >
            View All
          </button>
        </div>
      </section>
    </div>
  );
}