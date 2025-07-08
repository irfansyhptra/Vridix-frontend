// src/pages/Crowdfunding.jsx

import React, { useState, useEffect, useCallback } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ProjectCard from "../components/crowdfunding/ProjectCard"; // Make sure path is correct
import { localStorageService } from "../services/localStorageService";
import { useAuth } from "../context/AuthContext";

const Crowdfunding = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchProjects = useCallback(() => {
    setLoading(true);
    try {
      const storedProjects = localStorageService.getProjects();
      setProjects(storedProjects);
    } catch (error) {
      console.error("Gagal memuat proyek dari Local Storage:", error);
      alert("Gagal memuat data proyek.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleFundProject = useCallback(
    (projectId) => {
      if (!user) {
        alert("Harap hubungkan wallet dan login terlebih dahulu.");
        return;
      }

      const amountStr = prompt("Masukkan jumlah dana (dalam Rp):", "100000");
      if (!amountStr || isNaN(amountStr) || parseFloat(amountStr) <= 0) {
        alert("Jumlah dana tidak valid.");
        return;
      }

      const amount = parseFloat(amountStr);

      setLoading(true);
      try {
        localStorageService.fundProject(projectId, amount);
        alert("Pendanaan proyek berhasil!");
        fetchProjects(); // Refresh data from local storage
      } catch (error) {
        console.error("Gagal mendanai proyek:", error);
        alert("Gagal mendanai proyek. Lihat konsol untuk detail.");
      } finally {
        setLoading(false);
      }
    },
    [user, fetchProjects]
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header />
      <main className="container mx-auto px-6 py-12 flex-grow">
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
                onFundClick={() => handleFundProject(proj.id)}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Crowdfunding;
