// src/pages/Crowdfunding.jsx

import React, { useState, useEffect } from "react";
import ProjectCard from "../components/crowdfunding/ProjectCard";
import { useAuth } from "../hooks/useAuth";
import { mockData } from "../data/mockData";

const Crowdfunding = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const { showToast, user } = useAuth();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        // Simulasi loading untuk pengalaman yang lebih baik
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Pastikan mockData dan crowdfundingProjects tersedia
        if (mockData && mockData.crowdfundingProjects) {
          setProjects(mockData.crowdfundingProjects);
        } else {
          throw new Error("Mock data tidak tersedia");
        }
      } catch (error) {
        console.error("Gagal mengambil data proyek:", error);
        if (showToast) {
          showToast("Gagal memuat proyek crowdfunding.", "error");
        }
        // Set data kosong jika gagal
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [showToast]);

  const handleFundProject = (projectId, amount) => {
    if (!user) {
      showToast("Silakan login terlebih dahulu untuk berinvestasi.", "warning");
      return;
    }

    console.log(`Funding project ${projectId} with ${amount}`);
    // TODO: Implement funding logic via smart contract
    const project = projects.find((p) => p.id === projectId);
    if (project) {
      showToast(
        `Investasi pada proyek "${
          project.nama
        }" sebesar ${amount.toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
        })} berhasil!`,
        "success"
      );
    }
  };

  const filteredProjects = projects.filter((project) => {
    if (filter === "all") return true;
    if (filter === "active") return project.terkumpul < project.target;
    if (filter === "completed") return project.terkumpul >= project.target;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Proyek Crowdfunding Pertanian
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Dukung inovasi pertanian berkelanjutan dengan berinvestasi pada
            proyek-proyek pilihan dari petani lokal
          </p>

          {/* Filter Buttons */}
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={() => setFilter("all")}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                filter === "all"
                  ? "bg-green-600 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              Semua Proyek ({projects.length})
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                filter === "active"
                  ? "bg-blue-600 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              Aktif (
              {filteredProjects.filter((p) => p.terkumpul < p.target).length})
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                filter === "completed"
                  ? "bg-purple-600 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              Selesai (
              {filteredProjects.filter((p) => p.terkumpul >= p.target).length})
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300">
                Memuat proyek crowdfunding...
              </p>
            </div>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">🌱</div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Belum Ada Proyek
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {filter === "all"
                ? "Belum ada proyek crowdfunding yang tersedia saat ini."
                : `Belum ada proyek dengan status ${
                    filter === "active" ? "aktif" : "selesai"
                  }.`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onFundClick={handleFundProject}
              />
            ))}
          </div>
        )}

        {/* Call to Action for Farmers */}
        {user && user.role === "Petani" && (
          <div className="mt-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Punya Proyek Pertanian?</h3>
            <p className="text-xl mb-6">
              Ajukan proposal crowdfunding untuk mendapatkan pendanaan dari
              investor
            </p>
            <button
              onClick={() => (window.location.href = "/create-proposal")}
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Buat Proposal Baru
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Crowdfunding;
