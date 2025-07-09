// src/pages/Dashboard.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";
import AdminDashboard from "./AdminDashboard";
import FarmerDashboard from "../components/dashboard/FarmerDashboard";
import UserDashboard from "../components/dashboard/UserDashboard";
import ApplicationStatus from "./ApplicationStatus"; // Impor halaman status

const Dashboard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p>Memuat data pengguna...</p>
      </div>
    );
  }

  if (!user) {
    // Seharusnya tidak pernah terjadi karena ada ProtectedRoute, tapi sebagai fallback
    return <p>Silakan login untuk melihat dashboard.</p>;
  }

  // Logika untuk menampilkan dashboard berdasarkan peran
  switch (user.role) {
    case "Admin":
      return <AdminDashboard />;
    case "Petani":
      // Cek status verifikasi untuk petani
      if (user.statusVerifikasi === "terverifikasi") {
        return <FarmerDashboard />;
      } else {
        // Bisa diarahkan ke halaman status atau tampilkan di sini
        return <ApplicationStatus />;
      }
    case "Investor":
    case "User": // Semua peran lain (termasuk user yg belum jadi petani) akan melihat ini
      // Jika user telah mendaftar sebagai petani dan menunggu verifikasi
      if (user.statusVerifikasi === "menunggu") {
        return <ApplicationStatus />;
      }
      return <UserDashboard />;
    default:
      return <UserDashboard />;
  }
};

export default Dashboard;
