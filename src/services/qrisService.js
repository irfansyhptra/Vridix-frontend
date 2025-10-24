// src/services/qrisService.js
import { apiService } from "./apiService";

const qrisService = {
  // Generate QRIS code untuk pembayaran
  generateQRIS: async (amount, description, userId) => {
    try {
      const response = await apiService.post("/payment/qris/generate", {
        amount,
        description,
        userId,
        timestamp: new Date().toISOString(),
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Gagal generate QRIS");
    }
  },

  // Verifikasi pembayaran QRIS
  verifyPayment: async (transactionId) => {
    try {
      const response = await apiService.get(
        `/payment/qris/verify/${transactionId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Gagal verifikasi pembayaran"
      );
    }
  },

  // Bayar menggunakan saldo investasi
  payWithBalance: async (qrisData, userId) => {
    try {
      const response = await apiService.post("/payment/qris/pay-with-balance", {
        qrisData,
        userId,
        timestamp: new Date().toISOString(),
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Gagal melakukan pembayaran"
      );
    }
  },

  // Scan QRIS code
  scanQRIS: async (qrisCode) => {
    try {
      const response = await apiService.post("/payment/qris/scan", {
        qrisCode,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "QRIS tidak valid");
    }
  },

  // Get transaction history
  getTransactionHistory: async (userId) => {
    try {
      const response = await apiService.get(
        `/payment/qris/transactions/${userId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Gagal mengambil riwayat transaksi"
      );
    }
  },

  // Get user balance
  getUserBalance: async (userId) => {
    try {
      const response = await apiService.get(`/payment/balance/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Gagal mengambil saldo");
    }
  },

  // Withdraw investment returns to balance
  withdrawToBalance: async (userId, projectId, amount) => {
    try {
      const response = await apiService.post("/payment/withdraw-to-balance", {
        userId,
        projectId,
        amount,
        timestamp: new Date().toISOString(),
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Gagal menarik dana");
    }
  },
};

export default qrisService;
