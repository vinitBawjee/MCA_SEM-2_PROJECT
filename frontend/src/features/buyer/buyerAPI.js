import axios from "axios";

const API_URL = "/api/auth";

export const fetchBuyersAPI = (token) => {
  return axios.get(`${API_URL}/getbuyers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};