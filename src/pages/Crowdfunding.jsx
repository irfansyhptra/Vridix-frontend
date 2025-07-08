// src/pages/Crowdfunding.jsx

import React, { useState, useEffect, useCallback } from "react"; // 1. Impor useCallback
import Header from "../components/layout/Header";
import { useWallet } from "../hooks/useWallet";
import { getProjects, fundProject } from "../services/contractService";
import api from "../api/axiosConfig";
import { ErrorBoundary } from "./ErrorBoundary";

// Komponen Card tidak perlu diubah, karena sudah menerima onFundClick
const ProjectCard = ({ project, onFundClick }) => {
  // Menghitung progress. Pastikan properti terkumpul & target ada.
  const progress =
    project.terkumpul && project.target
      ? (project.terkumpul / project.target) * 100
      : 0;

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-green-500/20">
      <div className="p-6 flex flex-col justify-between h-full">
        <div>
          <h3 className="text-2xl font-bold mb-2 text-green-400">
            {project.nama || "Nama Proyek.."}
          </h3>
          <p className="text-sm font-semibold text-gray-300 mb-2">
            {project.petani || "Nama Petani.."}
          </p>
          <p className="text-gray-400 mb-4 h-20">
            {project.deskripsi || "Deskripsi singkat proyek..."}
          </p>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-1 text-sm text-gray-300">
              <span>
                Terkumpul: Rp {project.terkumpul?.toLocaleString() || 0}
              </span>
              <span>Target: Rp {project.target?.toLocaleString() || 0}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div
                className="bg-green-500 h-2.5 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-right text-xs text-green-400 mt-1">
              {progress.toFixed(2)}%
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center text-gray-300 border-t border-gray-700 pt-4 mt-4">
          <div>
            <span className="block text-xs text-gray-400">
              Estimasi Imbal Hasil
            </span>
            <span className="font-bold text-green-400">
              {project.imbal || "N/A"}
            </span>
          </div>
          <button
            onClick={() => onFundClick(project.id)}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Danai Proyek
          </button>
        </div>
      </div>
    </div>
  );
};

const Crowdfunding = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { provider, account } = useWallet();

  // 2. Bungkus fetchProjects dengan useCallback
  const fetchProjects = useCallback(async () => {
    if (!provider) return;
    setLoading(true);
    try {
      // 3. Gunakan getProjects untuk mengambil data on-chain.
      // Baris ini sekarang diaktifkan kembali untuk menghilangkan error 'getProjects' is unused.
      // CATATAN: Ini mengasumsikan getProjects mengembalikan array dan backend Anda siap.
      const onChainProjects = await getProjects(provider);

      // Ambil metadata dari backend (jika ada)
      const projectIds = onChainProjects.map((p) => p.id.toString());
      const metadataRes = await api.post("/api/projects/metadata", {
        ids: projectIds,
      });
      const metadataMap = new Map(metadataRes.data.map((m) => [m.id, m]));

      // Gabungkan data on-chain dan off-chain
      const combinedProjects = onChainProjects.map((p) => ({
        ...p, // Data dari smart contract (id, terkumpul, target)
        ...(metadataMap.get(p.id.toString()) || {}), // Data dari backend (nama, deskripsi)
      }));

      setProjects(combinedProjects);
    } catch (error) {
      console.error("Gagal memuat proyek dari blockchain/backend:", error);
      // Fallback ke mockData jika terjadi error
      const { crowdfundingProjects } = await import("../data/mockData.js");
      setProjects(crowdfundingProjects);
      alert("Gagal memuat data proyek. Menampilkan data contoh.");
    } finally {
      setLoading(false);
    }
  }, [provider]); // provider adalah dependensi dari useCallback

  const handleFundProject = useCallback(
    async (projectId) => {
      if (!provider || !account) {
        alert("Harap hubungkan wallet Anda terlebih dahulu.");
        return;
      }
      const amount = prompt("Masukkan jumlah dana (dalam ETH):", "0.01");
      if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
        alert("Jumlah dana tidak valid.");
        return;
      }
      setLoading(true);
      try {
        const signer = provider.getSigner();
        await fundProject(signer, projectId, amount);
        alert("Pendanaan proyek berhasil!");
        fetchProjects(); // Panggil fetchProjects untuk refresh data
      } catch (error) {
        console.error("Gagal mendanai proyek:", error);
        alert("Gagal mendanai proyek. Lihat konsol untuk detail.");
      } finally {
        setLoading(false);
      }
    },
    [provider, account, fetchProjects]
  ); // fetchProjects sekarang menjadi dependensi

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]); // 4. Tambahkan fetchProjects sebagai dependensi

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-2 text-center text-white">
          Dukung Petani Lokal
        </h1>
        <p className="text-center text-gray-400 mb-10">
          Investasi berdampak langsung pada proyek pertanian yang transparan dan
          akuntabel.
        </p>
        {loading && <p className="text-center text-lg">Memuat Proyek...</p>}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((proj) => (
              <ProjectCard
                key={proj.id}
                project={proj}
                onFundClick={handleFundProject}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Crowdfunding;
