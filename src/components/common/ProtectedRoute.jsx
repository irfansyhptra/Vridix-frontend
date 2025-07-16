// src/components/common/ProtectedRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth(); // Ambil 'user' dan 'loading' dari context
  const location = useLocation();

  // Tampilkan null (atau spinner) jika status otentikasi masih dimuat
  if (loading) {
    return null;
  }

  // Jika tidak loading dan tidak ada user, alihkan ke halaman login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Jika role dibutuhkan dan role user tidak sesuai, alihkan
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Jika semua kondisi terpenuhi, tampilkan komponen
  return children;
};

export default ProtectedRoute;
