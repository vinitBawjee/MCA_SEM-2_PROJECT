import React, { useEffect } from "react";
import "./AlertMessage.css";

const AlertMessage = ({ type = "success", message, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className={`alert-container ${type}`}>
      <span className="alert-text">{message}</span>
      <button className="alert-close" onClick={onClose}>
        ×
      </button>
    </div>
  );
};

export default AlertMessage;