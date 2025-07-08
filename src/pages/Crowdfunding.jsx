// src/pages/Crowdfunding.jsx
import React from "react";
import Header from "../components/layout/Header";
// Anda akan mengambil data ini dari smart contract di masa depan
import { crowdfundingProjects } from "../data/mockData";

const ProjectCard = ({ project }) => {
  const progress = (project.terkumpul / project.target) * 100;
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2">{project.nama}</h3>
        <p className="text-gray-400 mb-4">{project.deskripsi}</p>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1 text-sm">
            <span>Terkumpul: Rp {project.terkumpul.toLocaleString()}</span>
            <span className="font-semibold">
              Target: Rp {project.target.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div
              className="bg-green-500 h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        <div className="flex justify-between items-center text-gray-300">
          <span>Imbal Hasil: {project.imbal}</span>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
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
        <h1 className="text-4xl font-bold mb-8 text-center">
          Proyek Crowdfunding Pertanian
        </h1>
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
