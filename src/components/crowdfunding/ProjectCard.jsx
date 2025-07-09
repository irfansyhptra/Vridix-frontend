// src/components/crowdfunding/ProjectCard.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import Card from "../common/Card";
import Modal from "../common/Modal";

const ProjectCard = ({ project, onFundClick }) => {
  const [showFundModal, setShowFundModal] = useState(false);
  const [fundAmount, setFundAmount] = useState("");

  const progress = (project.terkumpul / project.target) * 100;
  const isCompleted = progress >= 100;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleFund = () => {
    const amount = parseInt(fundAmount);
    if (amount && amount > 0 && onFundClick) {
      onFundClick(project.id, amount);
      setShowFundModal(false);
      setFundAmount("");
    }
  };

  return (
    <>
      <Card className="flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-white dark:bg-gray-800">
        <div>
          {/* Project Image */}
          <div className="w-full h-48 rounded-lg mb-4 overflow-hidden">
            <img
              src={
                project.kategori === "Beras"
                  ? "/beras.jpeg"
                  : project.kategori === "Sayuran"
                  ? "/hidroponik_kebun_sayur.jpg"
                  : project.kategori === "Cabai"
                  ? "/kebuncabai.jpg"
                  : project.jenis === "Padi"
                  ? "/sawah.jpg"
                  : "/sawah.jpg"
              }
              alt={project.nama}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            <div className="text-6xl" style={{ display: "none" }}>
              🌱
            </div>
          </div>

          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
            {project.nama}
          </h3>
          <p className="text-sm font-semibold text-green-600 dark:text-green-400 mb-2">
            👨‍🌾 {project.petani}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
            📍 {project.lokasi}
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
            {project.deskripsi}
          </p>
        </div>

        <div>
          {/* Progress Section */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2 text-sm">
              <span className="font-semibold text-gray-900 dark:text-white">
                {formatCurrency(project.terkumpul)}
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                dari {formatCurrency(project.target)}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-500 ${
                  isCompleted ? "bg-green-500" : "bg-blue-500"
                }`}
                style={{ width: `${Math.min(progress, 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center mt-2 text-xs">
              <span
                className={`font-medium ${
                  isCompleted ? "text-green-600" : "text-blue-600"
                }`}
              >
                {progress.toFixed(1)}% Tercapai
              </span>
              {isCompleted && (
                <span className="text-green-600 font-bold">
                  ✅ Target Tercapai!
                </span>
              )}
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
              <div className="text-gray-600 dark:text-gray-400 text-xs">
                Imbal Hasil
              </div>
              <div className="font-bold text-green-600 dark:text-green-400">
                {project.imbal}
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
              <div className="text-gray-600 dark:text-gray-400 text-xs">
                Deadline
              </div>
              <div className="font-bold text-orange-600 dark:text-orange-400">
                {project.deadline}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <div className="flex gap-2">
              <Button
                onClick={() => setShowFundModal(true)}
                disabled={isCompleted}
                className="flex-1"
                variant={isCompleted ? "secondary" : "primary"}
              >
                {isCompleted ? "🎉 Selesai" : "💰 Investasi"}
              </Button>
              <Link to={`/crowdfunding/${project.id}`} className="flex-1">
                <Button variant="outline" className="w-full">
                  Detail
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Card>

      {/* Fund Modal */}
      <Modal
        isOpen={showFundModal}
        onClose={() => setShowFundModal(false)}
        title={`Investasi pada ${project.nama}`}
      >
        <div className="space-y-4">
          <div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Masukkan jumlah investasi yang ingin Anda berikan untuk proyek
              ini.
            </p>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Informasi Proyek:
              </h4>
              <div className="text-sm space-y-1">
                <div>Target: {formatCurrency(project.target)}</div>
                <div>Terkumpul: {formatCurrency(project.terkumpul)}</div>
                <div>
                  Sisa: {formatCurrency(project.target - project.terkumpul)}
                </div>
                <div>Imbal Hasil: {project.imbal}</div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Jumlah Investasi (IDR)
            </label>
            <input
              type="number"
              value={fundAmount}
              onChange={(e) => setFundAmount(e.target.value)}
              placeholder="Masukkan nominal investasi"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
              min="100000"
              step="100000"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Minimum investasi: {formatCurrency(100000)}
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={() => setShowFundModal(false)}
              variant="secondary"
              className="flex-1"
            >
              Batal
            </Button>
            <Button
              onClick={handleFund}
              disabled={!fundAmount || parseInt(fundAmount) < 100000}
              className="flex-1"
            >
              Konfirmasi Investasi
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProjectCard;
