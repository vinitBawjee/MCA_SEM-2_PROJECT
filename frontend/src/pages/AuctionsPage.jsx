import "./AuctionsPage.css";
import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AuctionsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const type = location.state?.type || "active";

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const pageTitle = {
    pending: "Upcoming Auctions",
    active: "Live Auctions",
    complete: "Past Auctions",
  };

  const apiMap = {
    pending: "http://localhost:5000/api/public/pending-products",
    active: "http://localhost:5000/api/public/products",
    complete: "http://localhost:5000/api/public/complete-products",
  };

  useEffect(() => {
    fetchProducts();
  }, [type]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(apiMap[type]);
      setProducts(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredProducts = products.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <div className="auction-page">
        <div className="breadcrumb">
          <Link to="/" className="home">
            Home
          </Link>
          <span className="arrow">›</span>
          <span className="current">{pageTitle[type]}</span>
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search Auctions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="auction-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <div className="auction-card" key={item._id}>
                <div className="image-box">
                  <img
                    src={
                      item.image
                        ? `http://localhost:5000/${item.image}`
                        : "https://via.placeholder.com/250"
                    }
                    alt={item.title}
                  />
                </div>

                <span className="lot">{item.category}</span>

                <p className="title">{item.title}</p>

                <h2 className="price">₹ {item.price}</h2>

                {/* <button className="result-btn" onClick={() => navigate(`/product/${item._id}`)}>VIEW DETAILS</button> */}
                <Link className="result-btn"  to={`/product/${item._id}`} state={{ from: "auctions" }}> View Details </Link>
              </div>
            ))
          ) : (
            <p>No Auctions Found</p>
          )}
        </div>
      </div>
    </div>
  );
}