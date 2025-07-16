// src/pages/Register.jsx

import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContextValue";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    nik: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { showToast } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Nama lengkap harus diisi";
    if (!formData.nik.trim()) return "NIK harus diisi";
    if (formData.nik.length !== 16) return "NIK harus terdiri dari 16 digit";
    if (!formData.phoneNumber.trim()) return "Nomor HP harus diisi";
    if (!formData.password) return "Password harus diisi";
    if (formData.password.length < 6) return "Password minimal 6 karakter";
    if (formData.password !== formData.confirmPassword)
      return "Password tidak cocok";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Simulate API call - in real app, this would be a fetch/axios call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Call API to register user here
      // For now, just show success and navigate to login
      showToast("Pendaftaran berhasil! Silahkan login.", "success");
      navigate("/login");
    } catch (err) {
      setError("Terjadi kesalahan saat mendaftar");
      console.error("Registration error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-900 px-4 py-12">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-green-600 dark:text-green-500 mb-2">
            Daftar Akun Baru
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Bergabunglah dengan platform pertanian berkelanjutan
          </p>
        </div>

        {error && (
          <div
            className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Nama Lengkap
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
              placeholder="Masukkan nama lengkap Anda"
            />
          </div>

          <div>
            <label
              htmlFor="nik"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Nomor Induk Kependudukan (NIK)
            </label>
            <input
              id="nik"
              name="nik"
              type="text"
              required
              value={formData.nik}
              onChange={handleChange}
              maxLength={16}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
              placeholder="Masukkan NIK 16 digit"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              NIK terdiri dari 16 digit angka
            </p>
          </div>

          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Nomor Handphone
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              required
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
              placeholder="Contoh: 081234567890"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
              placeholder="Minimal 6 karakter"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Konfirmasi Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
              placeholder="Ulangi password Anda"
            />
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label
              htmlFor="terms"
              className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
            >
              Saya setuju dengan{" "}
              <a href="#" className="text-green-600 hover:text-green-500">
                syarat dan ketentuan
              </a>
            </label>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
            >
              {isLoading ? "Processing..." : "Daftar"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Sudah punya akun?{" "}
            <Link
              to="/login"
              className="font-medium text-green-600 hover:text-green-500 dark:text-green-400"
            >
              Masuk
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
