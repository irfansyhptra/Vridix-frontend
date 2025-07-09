// src/components/admin/FarmerVerificationQueue.jsx

import React, { useState, useEffect } from "react";
import { apiService } from "../../services/apiService";
import { useAuth } from "../../context/AuthContext"; // PERBAIKAN: Impor useAuth
import Button from "../common/Button";
import Card from "../common/Card";

const FarmerVerificationQueue = () => {
  const [pendingFarmers, setPendingFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useAuth(); // PERBAIKAN: Gunakan useAuth()

  const fetchPendingFarmers = async () => {
    try {
      setLoading(true);
      const response = await apiService.getPendingFarmers();
      setPendingFarmers(response.data);
    } catch (error) {
      console.error("Gagal mengambil data petani:", error);
      setPendingFarmers([]);
      showToast("Gagal memuat data verifikasi.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Diberi pengecekan agar tidak error saat showToast belum siap
    if (showToast) {
      fetchPendingFarmers();
    }
  }, [showToast]);

  const handleApprove = async (walletAddress) => {
    try {
      await apiService.approveFarmer(walletAddress);
      showToast("Petani telah disetujui!", "success");
      fetchPendingFarmers(); // Refresh list
    } catch (error) {
      showToast("Gagal menyetujui petani.", error);
    }
  };

  const handleReject = async (walletAddress) => {
    try {
      await apiService.rejectFarmer(walletAddress);
      showToast("Pendaftaran petani ditolak.", "info");
      fetchPendingFarmers(); // Refresh list
    } catch (error) {
      showToast("Gagal menolak petani.", error);
    }
  };

  if (loading) {
    return <p className="text-center p-6">Memuat antrean verifikasi...</p>;
  }

  if (pendingFarmers.length === 0) {
    return (
      <Card className="p-6 text-center">
        <h3 className="text-xl font-semibold text-gray-700">
          Tidak Ada Pendaftaran Baru
        </h3>
        <p className="text-gray-500 mt-2">
          Saat ini tidak ada pendaftaran petani yang menunggu untuk
          diverifikasi.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-0">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Nama Lengkap
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                NIK
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Jenis Usaha
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Dokumen
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pendingFarmers.map((farmer) => (
              <tr key={farmer.walletAddress}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {farmer.farmerData.namaLengkap}
                  </div>
                  <div className="text-sm text-gray-500">
                    {farmer.walletAddress}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {farmer.farmerData.nik}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {farmer.farmerData.jenisUsaha}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500">
                  {/* Link ini seharusnya mengarah ke file di IPFS/backend nantinya */}
                  <a href="#" className="hover:underline">
                    {farmer.farmerData.fileKtp}
                  </a>
                  ,{" "}
                  <a href="#" className="hover:underline">
                    {farmer.farmerData.fileSertifikatLahan}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                  <Button
                    onClick={() => handleApprove(farmer.walletAddress)}
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Setujui
                  </Button>
                  <Button
                    onClick={() => handleReject(farmer.walletAddress)}
                    size="sm"
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Tolak
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default FarmerVerificationQueue;
