// src/api/axiosConfig.js
//
// OPTIMIZASI UNTUK BACKEND ARSITEKTUR BARU:
// - Error handling yang lebih detail untuk debugging
// - Logging yang lebih informatif untuk setiap jenis error
// - Handling khusus untuk 400 Bad Request dengan detail validation errors
// - Two-step process support: Upload files + JSON data
// - Enhanced error categorization untuk backend debugging

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000", // Pastikan ini URL backend Anda
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor response
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response || error.message);

    // Handle specific error types
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 400:
          console.error("Bad Request (400):", data);
          // Log detailed error information for debugging
          if (data && data.message) {
            console.error("Server message:", data.message);
          }
          if (data && data.errors) {
            console.error("Validation errors:", data.errors);
          }
          break;
        case 401:
          console.error("Unauthorized (401):", data);
          // Opsional: Clear token dan redirect ke login jika unauthorized
          // localStorage.removeItem('token');
          // window.location.href = '/admin/login';
          break;
        case 403:
          console.error("Forbidden (403):", data);
          break;
        case 404:
          console.error("Not Found (404):", data);
          break;
        case 500:
          console.error("Internal Server Error (500):", data);
          break;
        default:
          console.error(`HTTP Error ${status}:`, data);
      }
    } else if (error.request) {
      console.error("Network Error: No response received");
    } else {
      console.error("Request Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
