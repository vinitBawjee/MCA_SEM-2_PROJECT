import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductList.css";

function ProductList() {

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {

    const token = sessionStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:5000/api/buyer/products",
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );

    setProducts(res.data.products);
  };

  return (
    <div className="userdash-productlist">

      <h2>Bidding Products</h2>

      <table className="userdash-table">

        <thead>
          <tr>
            <th>Image</th>
            <th>Product</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {products.map((p) => (
            <tr 
              key={p._id}
              onClick={() => navigate(`/product/${p._id}`)}
              className="userdash-row"
            >
              <td>
                <img
                  src={`http://localhost:5000/${p.image}`}
                  alt={p.title}
                  className="userdash-product-img"
                />
              </td>

              <td>{p.title}</td>

              <td>{p.category}</td>

              <td>{p.stock}</td>

              <td>₹{p.price}</td>

              <td>{p.status}</td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default ProductList;