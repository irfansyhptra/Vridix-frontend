// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import Crowdfunding from "./pages/Crowdfunding";
import Dashboard from "./pages/Dashboard";
import Traceability from "./pages/Traceability";
import ProtectedRoute from "./components/common/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/crowdfunding" element={<Crowdfunding />} />
        <Route path="/traceability" element={<Traceability />} />

        {/* Protected Dashboard Route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["Petani", "Investor"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Add more routes here if needed */}
      </Routes>
    </Router>
  );
}

export default App;
