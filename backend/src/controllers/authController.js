import authService from "../services/authService.js";

export const register = async (req, res) => {
  try {
    const data = await authService.registerUser(req.body);
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const data = await authService.loginUser(req.body);
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const sendOtp = async (req, res) => {
  try {
    const msg = await authService.sendOtp(req.body);
    res.status(200).json(msg);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const msg = await authService.verifyOtp(req.body);
    res.status(200).json(msg);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const msg = await authService.resetPassword(req.body);
    res.status(200).json(msg);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};