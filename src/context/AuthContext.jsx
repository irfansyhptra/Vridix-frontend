// src/context/AuthContext.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mockData } from "../data/mockData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "./AuthContextValue";

// AuthProvider component - separated from context creation for better Fast Refresh support
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
      // Coba ambil user dari localStorage
      const savedUser = localStorage.getItem("vridixUser");
      if (savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
        } catch (error) {
          console.error("Invalid saved user data:", error);
          localStorage.removeItem("vridixUser");
        }
      }
      setLoading(false);
    } catch (error) {
      console.error("Error in AuthContext useEffect:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (nik, password) => {
    setLoading(true);
    try {
      // Simulasi autentikasi dengan mock data
      // Cari user berdasarkan NIK
      const mockUser = mockData.users.find((u) => u.nik === nik);

      if (!mockUser || mockUser.password !== password) {
        showToast("NIK atau password salah", "error");
        return false;
      }

      // Simpan user ke localStorage
      localStorage.setItem("vridixUser", JSON.stringify(mockUser));
      setUser(mockUser);
      showToast("Login berhasil!", "success");
      return true;
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage = error.message || "Login gagal. Silakan coba lagi.";
      showToast(errorMessage, "error");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      // Check if user with NIK already exists
      const existingUser = mockData.users.find((u) => u.nik === userData.nik);

      if (existingUser) {
        showToast("NIK sudah terdaftar", "error");
        return false;
      }

      // In a real app, you would make an API call here
      // For now, we'll just show success message

      showToast("Pendaftaran berhasil! Silakan login.", "success");
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      showToast("Pendaftaran gagal. Silakan coba lagi.", "error");
      return false;
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
    register,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      <ToastContainer />
    </AuthContext.Provider>
  );
};
