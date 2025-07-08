// src/components/dashboard/FundedProject.jsx
import React from "react";
import Card from "../common/Card";

const FundedProject = ({ project }) => {
  const progress = 85; // Example progress

  return (
    <Card className="flex items-center justify-between">
      <div>
        <h4 className="font-bold text-lg text-green-400">{project.name}</h4>
        <p className="text-sm text-gray-400">
          Investasi Anda: Rp {project.amount.toLocaleString()}
        </p>
      </div>
      <div className="w-1/3 text-right">
        <p className="text-sm text-gray-300 mb-1">
          Progres Proyek: {progress}%
        </p>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </Card>
  );
};

export default FundedProject;
