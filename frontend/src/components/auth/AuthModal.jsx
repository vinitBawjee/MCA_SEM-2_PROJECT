import { useState } from "react";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import "./Auth.css";

export default function AuthModal({ close }) {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="modal-overlay" onClick={close}>
      <div className="glass-card" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={close}>
          &times;
        </button>

        <div className="tab-container">
          <button
            className={activeTab === "login" ? "active" : ""}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>

          <button
            className={activeTab === "register" ? "active" : ""}
            onClick={() => setActiveTab("register")}
          >
            Register
          </button>
        </div>

        {activeTab === "login" ? (
          <LoginForm close={close} />
        ) : (
          <RegisterForm />
        )}
      </div>
    </div>
  );
}