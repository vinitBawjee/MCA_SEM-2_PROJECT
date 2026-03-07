import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearMessage } from "../../features/auth/authSlice";

export default function RegisterForm() {
  const dispatch = useDispatch();
  const { message, error } = useSelector((state) => state.auth);

  const [data, setData] = useState({
    name: "",
    email: "",
    mobile: "",
    role: "",
    password: "",
    confirmPassword: "",
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
  }, [message, error, dispatch]);

  const validate = (fieldValues = data) => {
    let err = {};

    if (!fieldValues.name.trim()) err.name = "Enter name";
    else if (/\d/.test(fieldValues.name))
      err.name = "Name cannot contain numbers";

    if (!fieldValues.email) err.email = "Enter email";
    else if (!/^\S+@\S+\.\S+$/.test(fieldValues.email))
      err.email = "Invalid email";

    if (!fieldValues.mobile) err.mobile = "Enter mobile";
    else if (!/^[0-9]{10}$/.test(fieldValues.mobile))
      err.mobile = "Invalid mobile";

    if (!fieldValues.role) err.role = "Select role";

    if (!fieldValues.password) err.password = "Enter password";
    else if (fieldValues.password.length < 6)
      err.password = "Password must be at least 6 characters";

    if (!fieldValues.confirmPassword)
      err.confirmPassword = "Confirm your password";
    else if (fieldValues.password !== fieldValues.confirmPassword)
      err.confirmPassword = "Passwords do not match";

    if (!fieldValues.terms) err.terms = "Accept terms";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = value;

    if (name === "name") {
      newValue = value.replace(/[0-9]/g, "");
    }

    if (name === "mobile") {
      newValue = value.replace(/\D/g, "").slice(0, 10);
    }

    const newData = {
      ...data,
      [name]: type === "checkbox" ? checked : newValue,
    };

    setData(newData);

    if (isSubmitted) {
      validate(newData);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (validate()) {
      const { confirmPassword, terms, ...finalData } = data;

      try {
        await dispatch(registerUser(finalData)).unwrap();

        setData({
          name: "",
          email: "",
          mobile: "",
          role: "",
          password: "",
          confirmPassword: "",
          terms: false,
        });

        setErrors({});
        setIsSubmitted(false);
      } catch (err) {}
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        className="glass-input"
        value={data.name}
        onChange={handleChange}
      />
      {errors.name && <div className="error-text">{errors.name}</div>}

      <input
        type="email"
        name="email"
        placeholder="Email"
        className="glass-input"
        value={data.email}
        onChange={handleChange}
      />
      {errors.email && <div className="error-text">{errors.email}</div>}

      <input
        type="text"
        name="mobile"
        placeholder="Mobile"
        className="glass-input"
        value={data.mobile}
        onChange={handleChange}
      />
      {errors.mobile && <div className="error-text">{errors.mobile}</div>}

      <select
        name="role"
        className="glass-input glass-select"
        value={data.role}
        onChange={handleChange}
      >
        <option value="" disabled>
          Select Role
        </option>
        <option value="buyer">Buyer</option>
        <option value="seller">Seller</option>
      </select>
      {errors.role && <div className="error-text">{errors.role}</div>}

      <input
        type="password"
        name="password"
        placeholder="Password"
        className="glass-input"
        value={data.password}
        onChange={handleChange}
      />
      {errors.password && <div className="error-text">{errors.password}</div>}

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        className="glass-input"
        value={data.confirmPassword}
        onChange={handleChange}
      />
      {errors.confirmPassword && (
        <div className="error-text">{errors.confirmPassword}</div>
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

      <button type="submit" className="submit-btn">
        Register
      </button>
    </form>
  );
}