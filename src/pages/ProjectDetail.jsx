// src/pages/ProjectDetail.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { mockData } from "../data/mockData";
import Button from "../components/common/Button";
import Card from "../components/common/Card";

const ProjectDetail = () => {
  const { id } = useParams();
  const project = mockData.crowdfundingProjects.find(
    (p) => p.id.toString() === id
  );

  if (!project) {
    return <div className="text-center py-20">Proyek tidak ditemukan.</div>;
  }

  const progress = (project.terkumpul / project.target) * 100;

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="bg-white shadow-xl">
        <div className="p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {project.nama}
          </h1>
          <p className="text-lg text-gray-500 mb-6">oleh {project.petani}</p>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-1 text-gray-600">
              <span className="font-semibold">
                Rp {project.terkumpul.toLocaleString()}
              </span>
              <span>Target: Rp {project.target.toLocaleString()}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-green-500 h-4 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-right text-green-600 mt-1">
              {progress.toFixed(2)}% Tercapai
            </p>
          </div>

          <p className="text-gray-700 leading-relaxed mb-8">
            {project.deskripsi}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-center">
            <div className="bg-gray-100 p-4 rounded-lg">
              <span className="block text-sm text-gray-500">
                Estimasi Imbal Hasil
              </span>
              <span className="font-bold text-lg text-green-600">
                {project.imbal}
              </span>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <span className="block text-sm text-gray-500">Lokasi Proyek</span>
              <span className="font-bold text-lg text-gray-800">
                {project.lokasi}
              </span>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <span className="block text-sm text-gray-500">Durasi Proyek</span>
              <span className="font-bold text-lg text-gray-800">
                {project.durasi}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <input
              type="number"
              placeholder="Masukkan jumlah dana"
              className="w-full md:w-1/2 px-4 py-2 border rounded-md mb-4 text-center"
            />
            <Button className="w-full md:w-1/2">Danai Proyek Sekarang</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProjectDetail;
