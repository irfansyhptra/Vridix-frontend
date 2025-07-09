// src/pages/AdminLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/common/Button";
import Card from "../components/common/Card";

const AdminLogin = () => {
  const { updateUser, showToast } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulasi login admin (untuk demo)
      if (formData.username === "admin" && formData.password === "admin123") {
        // Update user menjadi admin
        updateUser({
          name: "Admin Utama",
          role: "Admin",
          walletAddress: "0xAdminWalletAddress...9012",
          email: "admin@vridix.com",
          saldoFiat: 0,
          totalInvestasi: 0,
          proyekDidanai: 0,
          totalBelanja: 0,
          joinDate: "2024-01-01",
        });

        showToast("Login admin berhasil!", "success");
        navigate("/admin");
      } else {
        showToast("Username atau password salah!", "error");
      }
    } catch (error) {
      console.error("Login error:", error);
      showToast("Terjadi kesalahan saat login.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
          <p className="text-gray-400">Masuk ke panel administrasi Vridix</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Masukkan username admin"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Masukkan password"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="large"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Memproses..." : "Login"}
          </Button>
        </form>

        <div className="mt-6 p-4 bg-blue-800 bg-opacity-30 border border-blue-600 rounded-lg">
          <p className="text-blue-200 text-sm text-center">
            <strong>Demo Credentials:</strong>
            <br />
            Username: admin
            <br />
            Password: admin123
          </p>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={() => navigate("/")}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ← Kembali ke Home
          </button>
        </div>
      </Card>
    </div>
  );
};

export default AdminLogin;
