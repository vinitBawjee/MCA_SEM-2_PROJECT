import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  sendOtpAPI,
  verifyOtpAPI,
  resetPasswordAPI
} from "../../features/auth/authAPI";
import { setError, setMessage } from "../../features/auth/authSlice";

export default function ForgotForm({ setActiveTab }) {

  const dispatch = useDispatch();

  const [step, setStep] = useState(1);

  const [data, setData] = useState({
    role: "",
    identifier: "",
    otp: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});

  const validate = (name, value) => {
    let error = "";

    if (name === "role") {
      if (!value) error = "Select role";
    }

    if (name === "identifier") {
      if (!value) error = "Required field";
      else {
        const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const mobile = /^[0-9]{10}$/;
        if (!email.test(value) && !mobile.test(value)) {
          error = "Enter valid email or mobile";
        }
      }
    }

    if (name === "otp") {
      if (!value) error = "Enter OTP";
      else if (value.length < 4) error = "Invalid OTP";
    }

    if (name === "password") {
      if (!value) error = "Password required";
      else if (value.length < 6) error = "Minimum 6 characters";
    }

    if (name === "confirmPassword") {
      if (!value) error = "Confirm password";
      else if (value !== data.password) error = "Passwords do not match";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    validate(name, value);
  };

  const sendOtp = async (e) => {
    e.preventDefault();

    const roleError = validate("role", data.role);
    const idError = validate("identifier", data.identifier);

    if (roleError || idError) return;

    try {
      const res = await sendOtpAPI({
        role: data.role,
        identifier: data.identifier
      });

      dispatch(setMessage(res.data.message));
      setStep(2);

    } catch (err) {
      dispatch(setError(err.response?.data?.message || "Error sending OTP"));
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();

    const otpError = validate("otp", data.otp);
    if (otpError) return;

    try {
      const res = await verifyOtpAPI({
        role: data.role,
        identifier: data.identifier,
        otp: data.otp
      });

      dispatch(setMessage(res.data.message));
      setStep(3);

    } catch (err) {
      dispatch(setError(err.response?.data?.message || "Invalid OTP"));
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();

    const passError = validate("password", data.password);
    const confirmError = validate("confirmPassword", data.confirmPassword);

    if (passError || confirmError) return;

    try {
      const res = await resetPasswordAPI({
        role: data.role,
        identifier: data.identifier,
        password: data.password
      });

      dispatch(setMessage(res.data.message));

      setData({
        role: "",
        identifier: "",
        otp: "",
        password: "",
        confirmPassword: ""
      });

      setErrors({});
      setStep(1);
      setActiveTab("login");

    } catch (err) {
      dispatch(setError(err.response?.data?.message || "Error resetting password"));
    }
  };

  return (
    <form>

      {step === 1 && (
        <>
          <select
            name="role"
            value={data.role}
            onChange={handleChange}
            className="glass-input glass-select"
          >
            <option value="" disabled>Select Role</option>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
          {errors.role && <p className="error-text">{errors.role}</p>}

          <input
            type="text"
            name="identifier"
            placeholder="Email or Mobile"
            value={data.identifier}
            onChange={handleChange}
            className="glass-input"
          />
          {errors.identifier && <p className="error-text">{errors.identifier}</p>}

          <button onClick={sendOtp} className="submit-btn">
            Send OTP
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={data.otp}
            onChange={handleChange}
            className="glass-input"
          />
          {errors.otp && <p className="error-text">{errors.otp}</p>}

          <button onClick={verifyOtp} className="submit-btn">
            Verify OTP
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <input
            type="password"
            name="password"
            placeholder="New Password"
            value={data.password}
            onChange={handleChange}
            className="glass-input"
          />
          {errors.password && <p className="error-text">{errors.password}</p>}

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={data.confirmPassword}
            onChange={handleChange}
            className="glass-input"
          />
          {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}

          <button onClick={resetPassword} className="submit-btn">
            Reset Password
          </button>
        </>
      )}

    </form>
  );
}