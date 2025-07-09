// src/App.jsx

import React from "react";
import { Routes, Route } from "react-router-dom";

// Layout & Common Components
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ProtectedRoute from "./components/common/ProtectedRoute";

// Page Components
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import ProductDetail from "./pages/ProductDetail"; // BARU
import Crowdfunding from "./pages/Crowdfunding";
import ProjectDetail from "./pages/ProjectDetail"; // BARU
import Dashboard from "./pages/Dashboard";
import Traceability from "./pages/Traceability";
import RegisterFarmer from "./pages/RegisterFarmer";
import AdminDashboard from "./pages/AdminDashboard"; // Bisa dihapus jika hanya diakses via /dashboard
import CreateProposal from "./pages/CreateProposal"; // BARU
import TopUp from "./pages/TopUp"; // BARU

function App() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            {/* Rute Publik */}
            <Route path="/" element={<Home />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/marketplace/:id" element={<ProductDetail />} />{" "}
            {/* BARU */}
            <Route path="/crowdfunding" element={<Crowdfunding />} />
            <Route path="/crowdfunding/:id" element={<ProjectDetail />} />{" "}
            {/* BARU */}
            <Route path="/traceability" element={<Traceability />} />
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
            <Route
              path="/create-proposal"
              element={
                <ProtectedRoute allowedRoles={["Petani"]}>
                  <CreateProposal />
                </ProtectedRoute>
              }
            />
            <Route
              path="/top-up"
              element={
                <ProtectedRoute>
                  <TopUp />
                </ProtectedRoute>
              }
            />
            {/* Rute Khusus Admin (tetap ada untuk akses langsung) */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            {/* Rute 404 */}
            <Route
              path="*"
              element={
                <div className="text-center py-20">
                  <h1 className="text-4xl font-bold">
                    404 - Halaman Tidak Ditemukan
                  </h1>
                </div>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
