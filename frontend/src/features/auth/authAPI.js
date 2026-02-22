import axios from "axios";

const API = "http://localhost:5000/api/auth";

export const registerUserAPI = (data) => {
  return axios.post(`${API}/register`, data);
};

export const loginUserAPI = (data) => {
  return axios.post(`${API}/login`, data);
};