// src/components/crowdfunding/ProjectCard.jsx
import React from "react";
import Button from "../common/Button";
import Card from "../common/Card";

const ProjectCard = ({ project }) => {
  const progress = (project.terkumpul / project.target) * 100;

  return (
    <Card className="flex flex-col justify-between transition-transform duration-300 hover:-translate-y-2">
      <div>
        <h3 className="text-2xl font-bold mb-2 text-green-400">
          {project.nama}
        </h3>
        <p className="text-sm font-semibold text-gray-300 mb-2">
          {project.petani}
        </p>
        <p className="text-gray-400 mb-4 h-24">{project.deskripsi}</p>
      </div>

      <div>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1 text-sm text-gray-300">
            <span>Rp {project.terkumpul.toLocaleString()}</span>
            <span className="text-gray-400">
              dari Rp {project.target.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div
              className="bg-green-500 h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-right text-xs text-green-400 mt-1">
            {progress.toFixed(2)}% Tercapai
          </p>
        </div>

        <div className="flex justify-between items-center text-gray-300 border-t border-gray-700 pt-4 mt-4">
          <div>
            <span className="block text-xs text-gray-400">
              Estimasi Imbal Hasil
            </span>
            <span className="font-bold text-green-400">{project.imbal}</span>
          </div>
          <Button>Danai Proyek</Button>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
