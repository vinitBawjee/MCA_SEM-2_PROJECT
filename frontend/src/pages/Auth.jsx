import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./Auth.css";

export default function Auth() {
    const [searchParams] = useSearchParams();
    const tabFromURL = searchParams.get("tab");
    const [activeTab, setActiveTab] = useState(tabFromURL === "login" ? "login" : "register");


  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    mobile: "",
    terms: false,
  });

  const [loginData, setLoginData] = useState({
    mobile: "",
    password: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});

  /* ================= REGISTER VALIDATION ================= */
  const validateRegister = () => {
    let err = {};

    if (!registerData.name.trim())
      err.name = "Please enter your full name";

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;
    if (!registerData.email.match(emailPattern))
      err.email = "Enter a valid email";

    const mobilePattern = /^[0-9]{10}$/;
    if (!mobilePattern.test(registerData.mobile))
      err.mobile = "Enter valid 10-digit mobile number";

    if (!registerData.terms)
      err.terms = "Please agree to the Terms and Conditions";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  /* ================= LOGIN VALIDATION ================= */
  const validateLogin = () => {
    let err = {};

    const mobilePattern = /^[0-9]{10}$/;
    if (!mobilePattern.test(loginData.mobile))
      err.loginMobile = "Enter valid mobile number";

    if (!loginData.password.trim())
      err.password = "Password is required";

    if (!loginData.terms)
      err.loginTerms = "Please agree to the Terms and Conditions";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (validateRegister()) {
      console.log("Register Data:", registerData);
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (validateLogin()) {
      console.log("Login Data:", loginData);
    }
  };

  const handleChange = (formType, field, value) => {
    /* ---------------- REGISTER FORM ---------------- */
    if (formType === "register") {
      if (field === "name" && !/^[A-Za-z\s]*$/.test(value)) return;
      if (field === "email" && value.includes(" ")) return;

      if (field === "mobile") {
        const cleaned = value.replace(/\D/g, "");
        const finalValue = cleaned.slice(0, 10);
      
        setRegisterData({ ...registerData, mobile: finalValue });
      
        setErrors((prev) => {
          let fieldError = prev.mobile; 

          if (finalValue.length === 0) {
            fieldError = "Mobile number is required";
          } 
          else if (finalValue.length < 10) {
            fieldError = "Enter valid 10-digit mobile number";
          } 
          else if (finalValue.length === 10) {
            fieldError = ""; 
          }
      
          return { ...prev, mobile: fieldError };
        });
      
        return;
      }      

      const updated = { ...registerData, [field]: value };
      setRegisterData(updated);

      let fieldError = "";

      if (field === "name" && !value.trim())
        fieldError = "Please enter your full name";

      if (field === "email") {
        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;
        if (!value.match(emailPattern))
          fieldError = "Enter a valid email";
      }

      if (field === "terms" && !value)
        fieldError = "Please agree to the Terms and Conditions";

      setErrors((prev) => ({ ...prev, [field]: fieldError }));
    }

    /* ---------------- LOGIN FORM ---------------- */
    if (formType === "login") {
      if (field === "mobile") {
        const cleaned = value.replace(/\D/g, "");
        const finalValue = cleaned.slice(0, 10);

        setLoginData({ ...loginData, mobile: finalValue });

        let fieldError = "";
        if (finalValue.length > 0 && finalValue.length !== 10)
          fieldError = "Enter valid mobile number";

        setErrors((prev) => ({ ...prev, loginMobile: fieldError }));
        return;
      }

      const updated = { ...loginData, [field]: value };
      setLoginData(updated);

      let fieldError = "";

      if (field === "password" && !value.trim())
        fieldError = "Password is required";

      if (field === "terms" && !value)
        fieldError = "Please agree to the Terms and Conditions";

      const keyMap = {
        password: "password",
        terms: "loginTerms",
      };

      setErrors((prev) => ({ ...prev, [keyMap[field]]: fieldError }));
    }
  };

  return (
    <div className="auth-box">
      <div className="brand-title">Auction</div>

      <div className="tab-container">
        <button
          className={`tab-btn ${activeTab === "register" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("register");
            setErrors({});
          }}
        >
          CREATE AN ACCOUNT
        </button>
        <button
          className={`tab-btn ${activeTab === "login" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("login");
            setErrors({});
          }}
        >
          SIGN IN
        </button>
      </div>

      {activeTab === "register" && (
        <form onSubmit={handleRegisterSubmit}>
          <input
            type="text"
            placeholder="Enter Name"
            value={registerData.name}
            className={`form-control custom-input ${errors.name && "input-error"}`}
            onChange={(e) => handleChange("register", "name", e.target.value)}
          />
          {errors.name && <div className="error-text">{errors.name}</div>}

          <input
            type="email"
            placeholder="Enter Email ID"
            value={registerData.email}
            className={`form-control custom-input ${errors.email && "input-error"}`}
            onChange={(e) => handleChange("register", "email", e.target.value)}
          />
          {errors.email && <div className="error-text">{errors.email}</div>}

          <div className="d-flex gap-2">
            <select className="form-select country-code">
              <option>+91</option>
            </select>
            <input
              type="text"
              placeholder="Mobile Number"
              value={registerData.mobile}
              className={`form-control custom-input ${errors.mobile && "input-error"}`}
              onChange={(e) => handleChange("register", "mobile", e.target.value)}
            />
          </div>
          {errors.mobile && <div className="error-text">{errors.mobile}</div>}

          <div className="form-check mt-2">
            <input
              type="checkbox"
              className="form-check-input"
              onChange={(e) => handleChange("register", "terms", e.target.checked)}
            />
            <label className="form-check-label">
              By Agreeing to <u>Terms & Conditions</u>
            </label>
          </div>
          {errors.terms && <div className="error-text">{errors.terms}</div>}

          <button className="btn main-btn w-100 mt-3">Register</button>
        </form>
      )}

      {activeTab === "login" && (
        <form onSubmit={handleLoginSubmit}>
          <div className="d-flex gap-2">
            <select className="form-select country-code">
              <option>+91</option>
            </select>
            <input
              type="text"
              placeholder="Mobile Number"
              value={loginData.mobile}
              className={`form-control custom-input ${errors.loginMobile && "input-error"}`}
              onChange={(e) => handleChange("login", "mobile", e.target.value)}
            />
          </div>
          {errors.loginMobile && <div className="error-text">{errors.loginMobile}</div>}

          <input
            type="password"
            placeholder="Enter Password"
            value={loginData.password}
            className={`form-control custom-input ${errors.password && "input-error"}`}
            onChange={(e) => handleChange("login", "password", e.target.value)}
          />
          {errors.password && <div className="error-text">{errors.password}</div>}

          <div className="form-check mt-2">
            <input
              type="checkbox"
              className="form-check-input"
              onChange={(e) => handleChange("login", "terms", e.target.checked)}
            />
            <label className="form-check-label">
              By Agreeing to <u>Terms & Conditions</u>
            </label>
          </div>
          {errors.loginTerms && <div className="error-text">{errors.loginTerms}</div>}

          <button className="btn main-btn w-100 mt-3">Login</button>
        </form>
      )}
    </div>
  );
}
