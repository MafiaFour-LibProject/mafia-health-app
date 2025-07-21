import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;
console.log("baseURL", baseURL);

export const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const stored = localStorage.getItem("user");
  console.log("User from storage (interceptor):", stored);
  const token = stored ? JSON.parse(stored).token : null;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("Attached token:", token);
  } else {
    console.log("No token found in localStorage.");
  }

  return config;
});
