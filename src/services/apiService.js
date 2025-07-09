// src/services/apiService.js

import axios from "axios";

// Konfigurasi URL base untuk API Anda. Ganti jika diperlukan.
const API_URL = "http://localhost:3000/api"; // Contoh URL backend

// Membuat instance axios
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor untuk menambahkan token JWT ke setiap request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Kumpulan fungsi untuk berinteraksi dengan endpoint API
export const apiService = {
  // === Autentikasi ===
  getNonce: (walletAddress) => {
    return apiClient.post("/auth/nonce", { walletAddress });
  },
  verifySignature: (walletAddress, signature) => {
    return apiClient.post("/auth/verify", { walletAddress, signature });
  },

  // === Pengguna & Petani ===
  submitFarmerApplication: (formData) => {
    // Saat mengirim file, header 'Content-Type' harus 'multipart/form-data'
    return apiClient.post("/users/register-farmer", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // === Admin ===
  getPendingFarmers: () => {
    return apiClient.get("/admin/pending-farmers");
  },
  approveFarmer: (walletAddress) => {
    return apiClient.post("/admin/approve-farmer", { walletAddress });
  },
  rejectFarmer: (walletAddress) => {
    return apiClient.post("/admin/reject-farmer", { walletAddress });
  },

  // === Data Publik (Crowdfunding, Marketplace) ===
  getProjects: () => {
    return apiClient.get("/projects");
  },
  getProducts: () => {
    return apiClient.get("/products");
  },
  getProductById: (id) => {
    return apiClient.get(`/products/${id}`);
  },

  // Anda bisa menambahkan fungsi lain di sini sesuai kebutuhan
  // misalnya: fundProject, purchaseProduct, getUserDashboard, etc.
};
