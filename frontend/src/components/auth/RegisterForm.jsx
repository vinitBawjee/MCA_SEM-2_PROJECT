import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../features/auth/authSlice";

export default function RegisterForm({ switchToLogin }) {
  const [data, setData] = useState({
    name: "",
    email: "",
    mobile: "",
    terms: false,
  });

  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = (fieldValues = data) => {
    let err = {};

    if (!fieldValues.name.trim())
      err.name = "Enter name";
    else if (/\d/.test(fieldValues.name))
      err.name = "Name cannot contain numbers";

    if (!/^\S+@\S+\.\S+$/.test(fieldValues.email))
      err.email = "Invalid email";

    if (!/^[0-9]{10}$/.test(fieldValues.mobile))
      err.mobile = "Invalid mobile";

    if (!fieldValues.terms)
      err.terms = "Accept terms";

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

    // 🔹 run validation ONLY after first submit attempt
    if (isSubmitted) {
      validate(newData);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  
    if (validate()) {
      dispatch(registerUser(data));
  
      setData({
        name: "",
        email: "",
        mobile: "",
        terms: false,
      });
  
      setErrors({});
      setIsSubmitted(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Full Name"
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

      <button className="submit-btn">Register</button>
    </form>
  );
}