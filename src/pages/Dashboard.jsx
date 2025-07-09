// src/pages/Dashboard.jsx
import React from "react";
import { useAuth } from "../hooks/useAuth";
import AdminDashboard from "./AdminDashboard";
import FarmerDashboard from "../components/dashboard/FarmerDashboard";
import UserDashboard from "../components/dashboard/UserDashboard";
import ApplicationStatus from "./ApplicationStatus";

const Dashboard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p>Memuat data pengguna...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-6">🔒</div>
          <h2 className="text-2xl font-bold mb-4">Akses Terbatas</h2>
          <p className="text-gray-400 mb-6">
            Silakan login terlebih dahulu untuk mengakses dashboard.
          </p>
          <button
            onClick={() => (window.location.href = "/")}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
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
    case "Konsumen":
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
