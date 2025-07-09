// src/context/AuthContext.jsx

import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWallet } from "../hooks/useWallet";
import { mockData } from "../data/mockData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Export AuthContext untuk hook terpisah dengan default value
export const AuthContext = createContext({
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
  updateUser: () => {},
  showToast: () => {},
  walletAddress: null,
  connectWallet: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const walletHook = useWallet();
  const { walletAddress, connectWallet } = walletHook || {
    walletAddress: null,
    connectWallet: () => {},
  };

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
    try {
      // Coba ambil user dari localStorage atau gunakan data mock
      const savedUser = localStorage.getItem("vridixUser");
      if (savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
        } catch (error) {
          console.error("Invalid saved user data:", error);
          localStorage.removeItem("vridixUser");
        }
      } else {
        // Untuk testing: set default user jika tidak ada
        const defaultUser = mockData.users[0]; // User pertama dari mock data
        setUser(defaultUser);
        localStorage.setItem("vridixUser", JSON.stringify(defaultUser));
      }
    } catch (error) {
      console.error("Error in AuthContext useEffect:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async () => {
    setLoading(true);
    try {
      const address = walletAddress || (await connectWallet());
      if (!address) {
        throw new Error("Wallet connection failed.");
      }

      // Simulasi autentikasi dengan mock data
      // Cari user berdasarkan wallet address atau gunakan user default
      let mockUser = mockData.users.find((u) => u.walletAddress === address);

      if (!mockUser) {
        // Jika tidak ada user dengan wallet address tersebut, gunakan user pertama sebagai contoh
        mockUser = mockData.users[0];
        mockUser.walletAddress = address; // Update address dengan yang terhubung
      }

      // Simpan user ke localStorage
      localStorage.setItem("vridixUser", JSON.stringify(mockUser));
      setUser(mockUser);
      showToast("Login berhasil!", "success");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage = error.message || "Login gagal. Silakan coba lagi.";
      showToast(errorMessage, "error");
      setUser(null);
      localStorage.removeItem("vridixUser");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("vridixUser");
    navigate("/");
    showToast("Anda telah logout.");
  };

  const updateUser = (updatedUserData) => {
    const newUser = { ...user, ...updatedUserData };
    setUser(newUser);
    localStorage.setItem("vridixUser", JSON.stringify(newUser));
  };

  const value = {
    user,
    loading,
    login,
    logout,
    updateUser,
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
