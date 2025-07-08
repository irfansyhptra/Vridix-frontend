// src/pages/Crowdfunding.jsx

import React from "react";
import Header from "../components/layout/Header";
import { crowdfundingProjects } from "../data/mockData"; // Impor data dummy

// Komponen Card untuk Proyek Crowdfunding
const ProjectCard = ({ project }) => {
  const progress = (project.terkumpul / project.target) * 100;

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-green-500/20">
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2 text-green-400">
          {project.nama}
        </h3>
        <p className="text-sm font-semibold text-gray-300 mb-2">
          {project.petani}
        </p>
        <p className="text-gray-400 mb-4 h-20">{project.deskripsi}</p>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-1 text-sm text-gray-300">
            <span>Terkumpul: Rp {project.terkumpul.toLocaleString()}</span>
            <span>Target: Rp {project.target.toLocaleString()}</span>
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

        <div className="flex justify-between items-center text-gray-300 border-t border-gray-700 pt-4 mt-4">
          <div>
            <span className="block text-xs text-gray-400">
              Estimasi Imbal Hasil
            </span>
            <span className="font-bold text-green-400">{project.imbal}</span>
          </div>
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
            Danai Proyek
          </button>
        </div>
      </div>
    </div>
  );
};

const Crowdfunding = () => {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {crowdfundingProjects.map((proj) => (
            <ProjectCard key={proj.id} project={proj} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Crowdfunding;
