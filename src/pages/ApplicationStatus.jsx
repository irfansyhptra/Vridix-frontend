// src/pages/ApplicationStatus.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ApplicationStatus = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-900 text-white py-20">
      <div className="container mx-auto px-4 flex justify-center items-center">
        <div className="max-w-2xl mx-auto bg-gray-800 rounded-xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-6">⏳</div>
          <h1 className="text-3xl font-bold text-white mb-4">
            Pendaftaran Anda Sedang Ditinjau
          </h1>
          <p className="text-gray-300 mb-6 text-lg">
            Terima kasih telah mendaftar sebagai petani di Vridix. Tim kami
            sedang melakukan verifikasi terhadap data dan dokumen yang Anda
            kirim.
          </p>

          {/* Status Info */}
          <div className="bg-gray-700 rounded-lg p-6 mb-6">
            <div className="grid grid-cols-2 gap-4 text-left">
              <div>
                <h3 className="text-green-400 font-semibold mb-2">
                  Status Saat Ini
                </h3>
                <p className="text-gray-300">Menunggu Verifikasi</p>
              </div>
              <div>
                <h3 className="text-green-400 font-semibold mb-2">
                  Estimasi Waktu
                </h3>
                <p className="text-gray-300">2-3 Hari Kerja</p>
              </div>
              {user?.farmerData?.submittedAt && (
                <>
                  <div>
                    <h3 className="text-green-400 font-semibold mb-2">
                      Tanggal Pendaftaran
                    </h3>
                    <p className="text-gray-300">
                      {new Date(user.farmerData.submittedAt).toLocaleDateString(
                        "id-ID"
                      )}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-green-400 font-semibold mb-2">
                      Jenis Usaha
                    </h3>
                    <p className="text-gray-300">
                      {user.farmerData.jenisUsaha}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* What's Next */}
          <div className="bg-green-800 bg-opacity-30 border border-green-600 rounded-lg p-6 mb-6">
            <h3 className="text-green-400 font-semibold mb-3">
              Langkah Selanjutnya
            </h3>
            <ul className="text-gray-300 text-left space-y-2">
              <li>• Tim verifikasi akan meninjau dokumen Anda</li>
              <li>• Anda akan dihubungi jika diperlukan informasi tambahan</li>
              <li>• Notifikasi akan dikirim setelah verifikasi selesai</li>
              <li>
                • Setelah diverifikasi, Anda dapat mengakses dashboard petani
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/dashboard"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Kembali ke Dashboard
            </Link>
            <Link
              to="/"
              className="border border-green-600 text-green-400 hover:bg-green-600 hover:text-white px-6 py-3 rounded-lg transition-colors"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationStatus;
