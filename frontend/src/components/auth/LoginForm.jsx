import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../features/auth/authSlice";

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState({
    role: "",
    emailOrMobile: "",
    password: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = (fieldValues = data) => {
    let err = {};

    if (!fieldValues.role) err.role = "Select role";

    if (!fieldValues.emailOrMobile.trim()) {
      err.emailOrMobile = "Required field";
    } else if (fieldValues.emailOrMobile.includes("@")) {
      if (!/^\S+@\S+\.\S+$/.test(fieldValues.emailOrMobile))
        err.emailOrMobile = "Invalid email";
    } else {
      if (!/^[0-9]{10}$/.test(fieldValues.emailOrMobile))
        err.emailOrMobile = "Enter valid 10 digit mobile";
    }

    if (!fieldValues.password.trim())
      err.password = "Password required";

    if (!fieldValues.terms)
      err.terms = "Accept terms";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = value;

    // 🔹 allow only email OR mobile characters
    if (name === "emailOrMobile") {
      if (/^[0-9]*$/.test(value)) {
        newValue = value.slice(0, 10);
      } else {
        newValue = value.replace(/[^a-zA-Z0-9@._-]/g, "");
      }
    }

    const newData = {
      ...data,
      [name]: type === "checkbox" ? checked : newValue,
    };

    setData(newData);

    // 🔹 run live validation only after first submit
    if (isSubmitted) {
      validate(newData);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  
    if (validate()) {
      dispatch(loginUser(data));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
        name="role"
        value={data.role}
        onChange={handleChange}
        className="glass-input glass-select"
      >
        <option value="">Select Role</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
        <option value="seller">Seller</option>
      </select>
      {errors.role && <div className="error-text">{errors.role}</div>}

      <input
        type="text"
        name="emailOrMobile"
        placeholder="Email or Mobile"
        className="glass-input"
        value={data.emailOrMobile}
        onChange={handleChange}
      />
      {errors.emailOrMobile && (
        <div className="error-text">{errors.emailOrMobile}</div>
      )}

      <input
        type="password"
        name="password"
        placeholder="Password"
        className="glass-input"
        value={data.password}
        onChange={handleChange}
      />
      {errors.password && (
        <div className="error-text">{errors.password}</div>
      )}

      <div className="terms-container">
        <input
          type="checkbox"
          name="terms"
          checked={data.terms}
          onChange={handleChange}
        />
        <label>Agree to Terms</label>
      </div>
      {errors.terms && <div className="error-text">{errors.terms}</div>}

      <button className="submit-btn">Login</button>
    </form>
  );
}