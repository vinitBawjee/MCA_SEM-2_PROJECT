import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ContactDetails.css";

export default function ContactDetails() {
  const { id } = useParams();
  const [contact, setContact] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      const token = sessionStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:5000/api/admin/contact/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setContact(res.data.data);
    };
    fetchContact();
  }, [id]);

  if (!contact) return <p>Loading...</p>;

  return (
    <div className="contact-container">
      <div className="contact-card">
        <h2 className="contact-title">Message Details</h2>
  
        <div className="contact-info">
          <p><strong>Name:</strong> {contact.userId?.name}</p>
          <p><strong>Email:</strong> {contact.userId?.email}</p>
          <p><strong>Mobile:</strong> {contact.userId?.mobile}</p>
          <p><strong>Role:</strong> {contact.userModel}</p>
        </div>
  
        <div className="message-box">
          <strong>Message:</strong>
          <p className="message-text">{contact.message}</p>
        </div>
  
        <p className="contact-date">
          <strong>Date:</strong>{" "}
          {new Date(contact.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}