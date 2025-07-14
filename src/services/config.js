import axios from "axios";

// connect to real backend URL later. also refer to bye-bye store config.js for how to add a login token (from localStorage)

const baseURL = import.meta.env.VITE_BASE_URL;

export const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
