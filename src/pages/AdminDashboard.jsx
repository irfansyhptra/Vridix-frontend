// src/pages/AdminDashboard.jsx

import React from "react";
import FarmerVerificationQueue from "../components/admin/FarmerVerificationQueue";

const AdminDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-12 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
      </div>

      <div className="space-y-10">
        {/* Bagian Verifikasi Petani */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Antrean Verifikasi Petani
          </h2>
          <FarmerVerificationQueue />
        </div>

        {/* Anda bisa menambahkan komponen admin lain di sini */}
        {/* Contoh:
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Statistik Platform</h2>
          <PlatformStats />
        </div> 
        */}
      </div>
    </div>
  );
};

export default AdminDashboard;
