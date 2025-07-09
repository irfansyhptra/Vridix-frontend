// src/pages/AdminDashboard.jsx

import React, { useState } from "react";
import FarmerVerificationQueue from "../components/admin/FarmerVerificationQueue";
import { useAuth } from "../hooks/useAuth";

const AdminDashboard = () => {
  const { user, updateUser, showToast } = useAuth();
  const [testActions, setTestActions] = useState(false);

  const simulateApproval = () => {
    // Simulasi menyetujui pendaftaran petani (untuk testing)
    if (user && user.role === "Admin") {
      // Update user menggunakan updateUser dari context
      updateUser({
        role: "Petani",
        statusVerifikasi: "terverifikasi",
      });
      showToast(
        "Simulasi: User berhasil diverifikasi sebagai petani!",
        "success"
      );
    }
  };

  const simulateUserRole = () => {
    // Simulasi mengubah user menjadi user biasa (untuk testing)
    if (user && user.role === "Admin") {
      updateUser({
        role: "Investor",
        statusVerifikasi: null,
      });
      showToast("Simulasi: User diubah menjadi Investor!", "success");
    }
  };

  const simulatePendingFarmer = () => {
    // Simulasi mengubah user menjadi petani yang menunggu verifikasi
    if (user && user.role === "Admin") {
      updateUser({
        role: "Petani",
        statusVerifikasi: "menunggu",
      });
      showToast("Simulasi: User menjadi petani menunggu verifikasi!", "info");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
          <button
            onClick={() => setTestActions(!testActions)}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            {testActions ? "Sembunyikan" : "Tampilkan"} Test Actions
          </button>
        </div>

        {/* Test Actions Section */}
        {testActions && (
          <div className="bg-yellow-800 bg-opacity-30 border border-yellow-600 rounded-lg p-6 mb-8">
            <h3 className="text-yellow-400 font-semibold mb-4">
              🧪 Test Actions (Development Only)
            </h3>
            <p className="text-yellow-200 text-sm mb-4">
              Gunakan tombol ini untuk mensimulasi perubahan role user untuk
              testing flow aplikasi.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={simulateApproval}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                ✅ Verifikasi Sebagai Petani
              </button>
              <button
                onClick={simulatePendingFarmer}
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                ⏳ Jadi Petani Menunggu
              </button>
              <button
                onClick={simulateUserRole}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                👤 Jadi Investor
              </button>
            </div>
          </div>
        )}

        <div className="space-y-10">
          {/* Bagian Verifikasi Petani */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-300 mb-4">
              Antrean Verifikasi Petani
            </h2>
            <FarmerVerificationQueue />
          </div>

          {/* Platform Statistics */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-gray-300 mb-6">
              Statistik Platform
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gray-700 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">25</div>
                <div className="text-gray-400">Petani Terdaftar</div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">12</div>
                <div className="text-gray-400">Menunggu Verifikasi</div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  150
                </div>
                <div className="text-gray-400">Produk Aktif</div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-orange-400 mb-2">
                  ₹45M
                </div>
                <div className="text-gray-400">Total Transaksi</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
