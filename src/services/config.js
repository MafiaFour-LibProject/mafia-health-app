import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;
console.log("baseURL", baseURL);

export const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// intercept request to attach token

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("token being sent:", token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
