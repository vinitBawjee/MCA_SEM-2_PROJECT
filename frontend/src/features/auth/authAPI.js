import axios from "axios";

const API = "http://localhost:5000/api/auth";

export const registerUserAPI = (data) => axios.post(`${API}/register`, data);

export const loginUserAPI = (data) => axios.post(`${API}/login`, data);

export const sendOtpAPI = (data) =>
  axios.post(`${API}/forgot/send-otp`, data);

export const verifyOtpAPI = (data) =>
  axios.post(`${API}/forgot/verify-otp`, data);

export const resetPasswordAPI = (data) =>
  axios.post(`${API}/forgot/reset-password`, data);