import React from "react";
import { Routes, Route } from "react-router-dom";

// Layout & Common Components
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ProtectedRoute from "./components/common/ProtectedRoute";
import ErrorBoundary from "./components/common/ErrorBoundary";

// Page Components
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import ProductDetail from "./pages/ProductDetail";
import Crowdfunding from "./pages/Crowdfunding";
import ProjectDetail from "./pages/ProjectDetail";
import Dashboard from "./pages/Dashboard";
import Traceability from "./pages/Traceability";
import RegisterFarmer from "./pages/RegisterFarmer";
import ApplicationStatus from "./pages/ApplicationStatus";
import AdminDashboard from "./pages/AdminDashboardNew";
import AdminLogin from "./pages/AdminLogin";
import FarmerDashboard from "./pages/FarmerDashboard";
import CreateProposal from "./pages/CreateProposal";
import TopUp from "./pages/TopUp";
import UserRoleSwitcher from "./components/common/UserRoleSwitcher";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <ErrorBoundary>
      <div className="bg-gray-100 dark:bg-gray-900">
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              {/* Rute Publik */}
              <Route path="/" element={<Home />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/marketplace/:id" element={<ProductDetail />} />
              <Route path="/crowdfunding" element={<Crowdfunding />} />
              <Route path="/crowdfunding/:id" element={<ProjectDetail />} />
              <Route path="/traceability" element={<Traceability />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

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
                path="/application-status"
                element={
                  <ProtectedRoute>
                    <ApplicationStatus />
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

              {/* Backup route untuk debug jika diperlukan */}
              <Route
                path="/register-farmer-debug"
                element={<RegisterFarmer />}
              />

              {/* Rute Khusus Admin */}
              <Route path="/admin" element={<AdminLogin />} />
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute allowedRoles={["Admin"]}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Rute Khusus Farmer */}
              <Route
                path="/farmer"
                element={
                  <ProtectedRoute allowedRoles={["Petani"]}>
                    <FarmerDashboard />
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
          <UserRoleSwitcher />
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
