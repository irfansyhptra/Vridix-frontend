// src/context/AuthContext.jsx

import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useWallet } from "../hooks/useWallet";
import { apiService } from "../services/apiService";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 1. Context tidak lagi di-export secara langsung
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // PERBAIKAN 1: 'walletError' dihapus karena tidak digunakan
  const {
    walletAddress,
    connectWallet,
    signMessage: signWalletMessage,
  } = useWallet();

  const showToast = (message, type = "info") => {
    toast[type](message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("authToken");
      }
    }
    setLoading(false);
  }, []);

  const login = async () => {
    setLoading(true);
    try {
      const address = walletAddress || (await connectWallet());
      if (!address) {
        throw new Error("Wallet connection failed.");
      }

      const nonceResponse = await apiService.getNonce(address);
      const { nonce } = nonceResponse.data;

      const signature = await signWalletMessage(nonce);
      if (!signature) {
        throw new Error("Message signing was cancelled.");
      }

      const verifyResponse = await apiService.verifySignature(
        address,
        signature
      );
      const { token } = verifyResponse.data;

      localStorage.setItem("authToken", token);
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);
      showToast("Login berhasil!", "success");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Login gagal. Silakan coba lagi.";
      showToast(errorMessage, "error");
      setUser(null);
      localStorage.removeItem("authToken");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
    navigate("/");
    showToast("Anda telah logout.");
  };

  const value = {
    user,
    loading,
    login,
    logout,
    showToast,
    walletAddress,
    connectWallet,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      <ToastContainer />
    </AuthContext.Provider>
  );
};

// PERBAIKAN 2: Buat dan ekspor custom hook untuk menggunakan context
// Ini adalah cara modern dan direkomendasikan untuk mengatasi warning Fast Refresh.
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
