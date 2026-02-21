import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    role: "",
    emailOrMobile: "",
    password: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let err = {};

    if (!data.role) err.role = "Select role";

    if (!data.emailOrMobile.trim()) {
      err.emailOrMobile = "Required field";
    } else if (data.emailOrMobile.includes("@")) {
      if (!/^\S+@\S+\.\S+$/.test(data.emailOrMobile))
        err.emailOrMobile = "Invalid email";
    } else {
      if (!/^[0-9]{10}$/.test(data.emailOrMobile))
        err.emailOrMobile = "Enter valid 10 digit mobile";
    }

    if (!data.password.trim())
      err.password = "Password required";

    if (!data.terms)
      err.terms = "Accept terms";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Login Data:", data);

      if (data.role === "admin") navigate("/admin");
      if (data.role === "user") navigate("/user");
      if (data.role === "seller") navigate("/seller");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
        value={data.role}
        onChange={(e) => setData({ ...data, role: e.target.value })}
        className="glass-input"
      >
        <option value="">Select Role</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
        <option value="seller">Seller</option>
      </select>
      {errors.role && <div className="error-text">{errors.role}</div>}

      <input
        type="text"
        placeholder="Email or Mobile"
        className="glass-input"
        value={data.emailOrMobile}
        onChange={(e) =>
          setData({ ...data, emailOrMobile: e.target.value })
        }
      />
      {errors.emailOrMobile && (
        <div className="error-text">{errors.emailOrMobile}</div>
      )}

      <input
        type="password"
        placeholder="Password"
        className="glass-input"
        value={data.password}
        onChange={(e) =>
          setData({ ...data, password: e.target.value })
        }
      />
      {errors.password && (
        <div className="error-text">{errors.password}</div>
      )}

      <div className="terms-container">
        <input
          type="checkbox"
          onChange={(e) =>
            setData({ ...data, terms: e.target.checked })
          }
        />
        <label>Agree to Terms</label>
      </div>
      {errors.terms && <div className="error-text">{errors.terms}</div>}

      <button className="submit-btn">Login</button>
    </form>
  );
}