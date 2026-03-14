import { useEffect, useState } from "react";
import "./AlertMessage.css";

export default function AlertMessage({ type, message, onClose }) {

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message) {
      setShow(true);

      const timer = setTimeout(() => {
        setShow(false);
        if (onClose) onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!show || !message) return null;

  return (
    <div className={`alert-toast alert-${type}`}>
      {message}
    </div>
  );
}