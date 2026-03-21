import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import "./AddProduct.css";

export default function AddProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = sessionStorage.getItem("token");
  const { setAlert } = useOutletContext();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const [errors, setErrors] = useState({});

  const categories = ["painting", "jewellery", "timepieces", "silver", "furniture and decorative"];

  useEffect(() => {
    if (id) fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/seller/products/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const product = res.data.data;

    setFormData({
      title: product.title || "",
      description: product.description || "",
      price: product.price || "",
      category: product.category || "",
      stock: product.stock || "",
    });

    setExistingImage(product.image || "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.price || Number(formData.price) <= 0)
      newErrors.price = "Valid price required";
    if (formData.stock === "" || Number(formData.stock) < 0)
      newErrors.stock = "Valid stock required";
    if (!formData.category) newErrors.category = "Category required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validate()) return;
  
    const data = new FormData();
  
    Object.keys(formData).forEach((key) =>
      data.append(key, formData[key])
    );
  
    if (image) data.append("image", image);
  
    try {

      if (id) {
        await axios.put(
          `http://localhost:5000/api/seller/products/${id}`,
          data,
          { headers: { Authorization: `Bearer ${token}` } }
        );
    
        setAlert({ type: "success", message: "Product updated successfully" });
    
      } else {
        await axios.post(
          "http://localhost:5000/api/seller/products",
          data,
          { headers: { Authorization: `Bearer ${token}` } }
        );
    
        setFormData({
          title: "",
          description: "",
          price: "",
          category: "",
          stock: "",
        });
    
        setAlert({ type: "success", message: "Product added successfully" });
      }
    
      setImage(null);
      setExistingImage("");
      setErrors({});
    
      navigate("/seller/products");
    
    } catch (err) {
      setAlert({ type: "error", message: "Something went wrong" });
    }
  };

  return (
    <div className="aform-container">
      <h2>{id ? "Edit Product" : "Add Product"}</h2>

      <form onSubmit={handleSubmit} className="aproduct-form">
        <div className="aform-group">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
          />
          {errors.title && <p className="error">{errors.title}</p>}
        </div>

        <div className="aform-group">
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
          />
        </div>

        <div className="aform-group">
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
          />
          {errors.price && <p className="error">{errors.price}</p>}
        </div>

        <div className="aform-group">
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Stock"
          />
          {errors.stock && <p className="error">{errors.stock}</p>}
        </div>

        <div className="aform-group">
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && <p className="error">{errors.category}</p>}
        </div>

        <div className="aform-group">
          {existingImage && (
            <img
              src={`http://localhost:5000/${existingImage}`}
              alt=""
              width="100"
              style={{ marginBottom: "10px" }}
            />
          )}

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <button type="submit">
          {id ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
}