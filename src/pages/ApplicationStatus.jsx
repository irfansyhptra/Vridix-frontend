// src/pages/ApplicationStatus.jsx
import React from "react";
import Card from "../components/common/Card";
import { Link } from "react-router-dom";

const ApplicationStatus = () => {
  return (
    <div className="container mx-auto px-4 py-20 flex justify-center items-center">
      <Card className="max-w-2xl mx-auto p-8 text-center bg-white shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Pendaftaran Anda Sedang Ditinjau
        </h1>
        <p className="text-gray-600 mb-6">
          Terima kasih telah mendaftar sebagai petani di Vridix. Tim kami sedang
          melakukan verifikasi terhadap data dan dokumen yang Anda kirim. Proses
          ini biasanya memakan waktu 2-3 hari kerja.
        </p>
        <p className="text-gray-600">
          Anda akan menerima notifikasi setelah proses verifikasi selesai.
        </p>
        <Link
          to="/"
          className="inline-block mt-8 text-green-600 hover:underline"
        >
          Kembali ke Beranda
        </Link>
      </Card>
    </div>
  );
};

export default ApplicationStatus;
