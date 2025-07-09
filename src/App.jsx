// src/App.jsx

import React from "react";
// PERBAIKAN: Pastikan 'BrowserRouter as Router' atau 'Router' sudah dihapus dari impor ini
import { Routes, Route } from "react-router-dom";

// Layout Components
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

// Page Components
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import Crowdfunding from "./pages/Crowdfunding";
import Dashboard from "./pages/Dashboard";
import Traceability from "./pages/Traceability";
import RegisterFarmer from "./pages/RegisterFarmer";
import AdminDashboard from "./pages/AdminDashboard";

// Common Components
import ProtectedRoute from "./components/common/ProtectedRoute";

function App() {
  // PERBAIKAN: Wrapper <Router> harus dihapus sepenuhnya dari file ini
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          {/* Rute Publik */}
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/crowdfunding" element={<Crowdfunding />} />
          <Route path="/traceability/:id" element={<Traceability />} />

          {/* Rute yang Membutuhkan Login */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register-farmer"
            element={
              <ProtectedRoute>
                <RegisterFarmer />
              </ProtectedRoute>
            }
          />

          {/* Rute Khusus Admin */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Rute untuk halaman tidak ditemukan (opsional) */}
          <Route
            path="*"
            element={
              <div className="text-center py-20">
                <h1 className="text-4xl font-bold">
                  404 - Halaman Tidak Ditemukan
                </h1>
                <p className="mt-4">Maaf, halaman yang Anda cari tidak ada.</p>
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
