import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearMessage } from "../../features/auth/authSlice";

export default function LoginForm({ close, setActiveTab }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { message, error } = useSelector((state) => state.auth);

  const [data, setData] = useState({
    role: "",
    identifier: "",
    password: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (message) {
      alert(message);
      dispatch(clearMessage());
    }
    if (error) {
      alert(error);
      dispatch(clearMessage());
    }
  }, [message, error, dispatch, close]);

  const validate = (fieldValues = data) => {
    let err = {};

    if (!fieldValues.role) err.role = "Select role";

    if (!fieldValues.identifier.trim()) {
      err.identifier = "Required field";
    } else if (fieldValues.identifier.includes("@")) {
      if (!/^\S+@\S+\.\S+$/.test(fieldValues.identifier))
        err.identifier = "Invalid email";
    } else {
      if (!/^[0-9]{10}$/.test(fieldValues.identifier))
        err.identifier = "Enter valid 10 digit mobile";
    }

    if (!fieldValues.password.trim()) err.password = "Password required";

    if (!fieldValues.terms) err.terms = "Accept terms";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = value;

    if (name === "identifier") {
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

    if (isSubmitted) validate(newData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!validate()) return;

    try {
      const res = await dispatch(loginUser(data)).unwrap();

      setData({
        role: "",
        identifier: "",
        password: "",
        terms: false,
      });

      close();
      const role = res.user.role;

      if (role === "admin") navigate("/admin");
      else if (role === "seller") navigate("/seller");
      else navigate("/");
    } catch (err) {}
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
        name="role"
        value={data.role}
        onChange={handleChange}
        className="glass-input glass-select"
      >
        <option value="" disabled>
          Select Role
        </option>
        <option value="admin">Admin</option>
        <option value="buyer">Buyer</option>
        <option value="seller">Seller</option>
      </select>
      {errors.role && <div className="error-text">{errors.role}</div>}

      <input
        type="text"
        name="identifier"
        placeholder="Email or Mobile"
        className="glass-input"
        value={data.identifier}
        onChange={handleChange}
      />
      {errors.identifier && (
        <div className="error-text">{errors.identifier}</div>
      )}

      <input
        type="password"
        name="password"
        placeholder="Password"
        className="glass-input"
        value={data.password}
        onChange={handleChange}
      />
      {errors.password && <div className="error-text">{errors.password}</div>}

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

      <button type="submit" className="submit-btn">
        Login
      </button>

      <div className="forgot-link" onClick={() => setActiveTab("forgot")}>
        Forgot Password?
      </div>
    </form>
  );
}
