import authService from "../services/authService.js";

export const register = async (req, res) => {
  try {
    const user = await authService.registerUser(req.body);
    res.json({ message: "User registered & password sent to email" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};