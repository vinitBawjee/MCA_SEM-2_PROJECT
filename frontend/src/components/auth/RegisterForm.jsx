import { useState } from "react";

export default function RegisterForm() {
  const [data, setData] = useState({
    name: "",
    email: "",
    mobile: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let err = {};

    if (!data.name.trim())
      err.name = "Enter name";

    if (!/^\S+@\S+\.\S+$/.test(data.email))
      err.email = "Invalid email";

    if (!/^[0-9]{10}$/.test(data.mobile))
      err.mobile = "Invalid mobile";

    if (!data.terms)
      err.terms = "Accept terms";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Register Data:", data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Full Name"
        className="glass-input"
        value={data.name}
        onChange={(e) =>
          setData({ ...data, name: e.target.value })
        }
      />
      {errors.name && <div className="error-text">{errors.name}</div>}

      <input
        type="email"
        placeholder="Email"
        className="glass-input"
        value={data.email}
        onChange={(e) =>
          setData({ ...data, email: e.target.value })
        }
      />
      {errors.email && <div className="error-text">{errors.email}</div>}

      <input
        type="text"
        placeholder="Mobile"
        className="glass-input"
        value={data.mobile}
        onChange={(e) =>
          setData({ ...data, mobile: e.target.value })
        }
      />
      {errors.mobile && <div className="error-text">{errors.mobile}</div>}

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

      <button className="submit-btn">Register</button>
    </form>
  );
}