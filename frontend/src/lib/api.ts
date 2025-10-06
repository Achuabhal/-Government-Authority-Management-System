import axios from "axios";

// ✅ Log to check if environment variable is loaded
console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);

// Create an Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // ✅ Correct way (no quotes or ${})
  withCredentials: true, // ✅ Send cookies/session with requests
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
