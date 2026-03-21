import { useState } from "react";
import axios from "axios";
import AlertMessage from "../components/layout/AlertMessage";
import "./Contact.css";

export default function Contact() {

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("success");

  const handleChange = (e) => {
    const value = e.target.value;
    setMessage(value);

    if (!value.trim()) {
      setError("Required field");
    } else {
      setError("");
    }
  };

  const submitContact = async () => {
    const token = sessionStorage.getItem("token");

    if (!message.trim()) {
      setError("Required field");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/buyer/contact",
        { message },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setAlertType("success");
      setAlertMsg(res.data.message);
      setMessage("");
      setError("");
    } catch (err) {
      setAlertType("error");
      setAlertMsg(err.response?.data?.message || "Failed to send");
    }
  };

  return (
    <div className="contact-page">

      <AlertMessage
        type={alertType}
        message={alertMsg}
        onClose={() => setAlertMsg("")}
      />

      <h2>Contact Us</h2>

      <textarea
        placeholder="Enter your message"
        value={message}
        onChange={handleChange}
        className={error ? "input-error" : ""}
      />

      {error && <p className="error-text">{error}</p>}

      <button onClick={submitContact}>Send Message</button>

    </div>
  );
}