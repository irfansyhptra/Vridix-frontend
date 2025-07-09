// src/pages/Crowdfunding.jsx

import React, { useState, useEffect } from "react";
import ProjectCard from "../components/crowdfunding/ProjectCard";
import { useAuth } from "../context/AuthContext"; // PERBAIKAN: Impor useAuth
import { apiService } from "../services/apiService";

const Crowdfunding = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useAuth(); // PERBAIKAN: Gunakan useAuth()

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await apiService.getProjects();
        setProjects(response.data);
      } catch (error) {
        console.error("Gagal mengambil data proyek:", error);
        showToast("Gagal memuat proyek crowdfunding.", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [showToast]);

  const handleFundProject = (projectId, amount) => {
    console.log(`Funding project ${projectId} with ${amount}`);
    // TODO: Implement funding logic via apiService
    showToast(
      `Investasi pada proyek ${projectId} sebesar ${amount} berhasil (simulasi).`,
      "success"
    );
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
        Proyek Crowdfunding
      </h1>
      <p className="text-center text-gray-500 mb-12">
        Dukung inovasi pertanian dengan berinvestasi pada proyek-proyek pilihan.
      </p>

      {loading ? (
        <p className="text-center">Memuat proyek...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onFundClick={handleFundProject}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Crowdfunding;
