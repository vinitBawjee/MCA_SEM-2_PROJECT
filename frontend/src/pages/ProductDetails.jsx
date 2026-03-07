import "./ProductDetails.css";
import { useState } from "react";
import { useLocation, Link } from "react-router-dom";

const ProductDetails = () => {
  const location = useLocation();
  const from = location.state?.from;

  const [activeTab, setActiveTab] = useState("history");

  const product = {
    title: "Couple Wedding Ring",
    description: "Premium jewellery product for auction.",
    price: 200,
    category: "Jewellery",
    stock: 3,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3_rGrUSCdhMUK0cCVeS0OQnmPUPVTzXOreQ&s"
  };

  const history = [
    { date: "December 31, 2024 12:00 am", bid: "$200", user: "Sunil Pokhrel" },
    { date: "December 31, 2024 12:00 am", bid: "$200", user: "Sunil Pokhrel" },
    { date: "December 31, 2024 12:00 am", bid: "$200", user: "Sunil Pokhrel" }
  ];

  const moreProducts = [
    { title: "Diamond Ring", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3_rGrUSCdhMUK0cCVeS0OQnmPUPVTzXOreQ&s" },
    { title: "Gold Necklace", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3_rGrUSCdhMUK0cCVeS0OQnmPUPVTzXOreQ&s" },
    { title: "Silver Bracelet", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3_rGrUSCdhMUK0cCVeS0OQnmPUPVTzXOreQ&s" }
  ];

  return (
    <div className="container">
      <div className="productPage">
        <div className="breadcrumb">
          <Link to="/" className="home"> Home </Link>

          {from === "auctions" && (
            <>
              <span className="arrow">›</span>
              <Link to="/auctions" className="home"> Live Auctions </Link>
            </>
          )}

          <span className="arrow">›</span>
          <span className="current">78964</span>
        </div>

        <div className="productContainer">

          <div className="productImage">
            <img src={product.image} />
          </div>

          <div className="productInfo">

            <h1>{product.title}</h1>

            <p className="description">{product.description}</p>

            <div className="details">
              <p>Category : {product.category}</p>
              <p>Stock : {product.stock}</p>
              <p>Price : ${product.price}</p>
            </div>

            <div className="bidBox">
              <p className="currentBid">Current Bid : $500</p>

              <div className="bidInput">
                <input type="number" placeholder="Enter bid" />
                <button>Submit</button>
              </div>

            </div>

          </div>

        </div>

        <div className="tabs">
          <button
            className={activeTab === "history" ? "active" : ""}
            onClick={() => setActiveTab("history")}
          >
            Auction History
          </button>

          <button
            className={activeTab === "products" ? "active" : ""}
            onClick={() => setActiveTab("products")}
          >
            More Products
          </button>
        </div>

        {activeTab === "history" && (
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

                {history.map((item, index) => (
                  <tr key={index}>
                    <td>{item.date}</td>
                    <td>{item.bid}</td>
                    <td>{item.user}</td>
                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        )}

        {activeTab === "products" && (
          <div className="moreProducts">

            <h2>More Products</h2>

            <div className="productGrid">

              {moreProducts.map((item, index) => (
                <div className="card" key={index}>

                  <img src={item.image} />

                  <h4>{item.title}</h4>

                  <button>View</button>

                </div>
              ))}

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default ProductDetails;