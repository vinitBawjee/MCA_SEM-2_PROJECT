import { useState } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import "./ContactUs.css";

export default function ContactUs() {

  const { setAlert } = useOutletContext();

  const token = sessionStorage.getItem("token");

  const [form, setForm] = useState({
    message: ""
  });

  const [errors, setErrors] = useState({});

  const validate = (value) => {
    if (!value.trim()) return "Required field";
    return "";
  };

  const handleChange = (e) => {
    const value = e.target.value;

    setForm({ message: value });

    setErrors({
      message: validate(value)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validate(form.message);

    if (error) {
      setErrors({ message: error });
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/seller/contact",
        { message: form.message },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setAlert({
        type: "success",
        message: "Message sent successfully"
      });

      setForm({ message: "" });
      setErrors({});
    } catch (err) {
      setAlert({
        type: "error",
        message: "Failed to send message"
      });
    }
  };

  return (
    <div className="contact-container">

      <h2>Contact Us</h2>

      <form onSubmit={handleSubmit} className="contact-form">

        <div className="form-group">
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={form.message}
            onChange={handleChange}
          />
          {errors.message && <p className="error">{errors.message}</p>}
        </div>

        <button className="con-btn" type="submit">
          Send Message
        </button>

      </form>
    </div>
  );
}