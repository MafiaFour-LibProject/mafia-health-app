import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;
console.log("baseURL", baseURL);

export const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
