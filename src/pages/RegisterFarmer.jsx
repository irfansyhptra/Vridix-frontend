// src/pages/RegisterFarmer.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // PERBAIKAN: Impor useAuth
import { apiService } from "../services/apiService";
import Button from "../components/common/Button";
import Card from "../components/common/Card";

const RegisterFarmer = () => {
  const { user, showToast } = useAuth(); // PERBAIKAN: Gunakan useAuth()
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    namaLengkap: "",
    nik: "",
    alamatLengkap: "",
    npwp: "",
    rekeningBank: "",
    jenisUsaha: "Pertanian Padi",
    fileKtp: null,
    fileSertifikatLahan: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      showToast("Anda harus login terlebih dahulu.", "error");
      return;
    }

    // Validasi sederhana
    for (const key in formData) {
      if (!formData[key]) {
        // Menggunakan nama yang lebih mudah dibaca untuk pesan error
        const fieldName = key
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase());
        showToast(`Kolom "${fieldName}" tidak boleh kosong.`, "error");
        return;
      }
    }

    setIsSubmitting(true);
    try {
      const dataToSubmit = new FormData();
      Object.keys(formData).forEach((key) => {
        dataToSubmit.append(key, formData[key]);
      });

      await apiService.submitFarmerApplication(dataToSubmit);

      showToast("Pendaftaran berhasil! Menunggu verifikasi admin.", "success");
      navigate("/dashboard");
    } catch (error) {
      console.error("Gagal mendaftar sebagai petani:", error);
      const errorMessage =
        error.response?.data?.message || "Terjadi kesalahan saat pendaftaran.";
      showToast(errorMessage, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Daftar Sebagai Petani
      </h1>
      <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
        Lengkapi formulir di bawah ini untuk mengajukan proposal crowdfunding
        dan menjual hasil panen Anda di platform Vridix.
      </p>

      <Card className="max-w-4xl mx-auto p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Data Pribadi */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
              Data Pribadi
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="namaLengkap"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  name="namaLengkap"
                  id="namaLengkap"
                  value={formData.namaLengkap}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="nik"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Nomor Induk Kependudukan (NIK)
                </label>
                <input
                  type="text"
                  name="nik"
                  id="nik"
                  value={formData.nik}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label
                  htmlFor="alamatLengkap"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Alamat Lengkap
                </label>
                <textarea
                  name="alamatLengkap"
                  id="alamatLengkap"
                  value={formData.alamatLengkap}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
                  required
                ></textarea>
              </div>
            </div>
          </div>

          {/* Data Usaha & Keuangan */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4 mt-6 border-b pb-2">
              Data Usaha & Keuangan
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="npwp"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  NPWP
                </label>
                <input
                  type="text"
                  name="npwp"
                  id="npwp"
                  value={formData.npwp}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="rekeningBank"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Nomor Rekening Bank
                </label>
                <input
                  type="text"
                  name="rekeningBank"
                  id="rekeningBank"
                  value={formData.rekeningBank}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="jenisUsaha"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Jenis Usaha Tani
                </label>
                <select
                  name="jenisUsaha"
                  id="jenisUsaha"
                  value={formData.jenisUsaha}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
                >
                  <option>Pertanian Padi</option>
                  <option>Perkebunan Kopi</option>
                  <option>Hortikultura Sayuran</option>
                  <option>Peternakan</option>
                </select>
              </div>
            </div>
          </div>

          {/* Dokumen Pendukung */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4 mt-6 border-b pb-2">
              Dokumen Pendukung (Upload)
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="fileKtp"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Foto KTP
                </label>
                <input
                  type="file"
                  name="fileKtp"
                  id="fileKtp"
                  onChange={handleFileChange}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="fileSertifikatLahan"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Sertifikat Lahan
                </label>
                <input
                  type="file"
                  name="fileSertifikatLahan"
                  id="fileSertifikatLahan"
                  onChange={handleFileChange}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                  required
                />
              </div>
            </div>
          </div>

          <div className="text-center pt-6">
            <Button
              type="submit"
              className="w-full md:w-1/2"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Mengirim..." : "Kirim Pendaftaran"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default RegisterFarmer;
