// src/pages/ProjectDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { mockData } from "../data/mockData";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import PublicMilestoneView from "../components/crowdfunding/PublicMilestoneView";
import MilestoneTracker from "../components/crowdfunding/MilestoneTracker";
import RABDetails from "../components/crowdfunding/RABDetails";

const ProjectDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [projectWithMilestones, setProjectWithMilestones] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("timeline"); // "timeline" or "detailed"

  // Fetch project data with milestones
  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        setLoading(true);
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        const projectData = mockData.crowdfundingProjects.find(
          (p) => p.id.toString() === id
        );

        if (!projectData) {
          setLoading(false);
          return;
        }

        // Find milestones for this project
        const milestoneData =
          mockData.projectMilestones?.find(
            (pm) => pm.projectId.toString() === id
          )?.milestones || [];

        // Check validated farmers data for more detailed milestone info
        const farmerProjects = mockData.validatedFarmers?.flatMap(
          (f) => f.projects || []
        );
        const detailedProject = farmerProjects?.find(
          (p) => p.id.toString() === id
        );

        const enrichedMilestones = milestoneData.map((m) => {
          const detailedMilestone = detailedProject?.milestones?.find(
            (dm) => dm.id === m.id
          );
          return { ...m, ...detailedMilestone };
        });

        setProjectWithMilestones({
          ...projectData,
          milestones: enrichedMilestones,
        });
      } catch (error) {
        console.error("Error fetching project data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [id]);

  if (loading) {
    return <div className="text-center py-20">Memuat informasi proyek...</div>;
  }

  if (!projectWithMilestones) {
    return <div className="text-center py-20">Proyek tidak ditemukan.</div>;
  }

  const progress =
    (projectWithMilestones.terkumpul / projectWithMilestones.target) * 100;

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Format currency is already defined above

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="bg-white shadow-xl mb-8">
        <div className="p-8">
          {/* Project Hero Image */}
          <div className="w-full h-64 rounded-lg mb-6 overflow-hidden">
            <img
              src={
                projectWithMilestones.jenis === "Padi"
                  ? "/sawah.jpg"
                  : projectWithMilestones.jenis === "Jagung"
                  ? "/jagung.jpg"
                  : projectWithMilestones.jenis === "Kopi"
                  ? "/kopi.jpg"
                  : projectWithMilestones.jenis === "Cabai"
                  ? "/kebuncabai.jpg"
                  : "/sawah.jpg"
              }
              alt={projectWithMilestones.nama}
              className="w-full h-full object-cover"
            />
          </div>

          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {projectWithMilestones.nama}
          </h1>
          <p className="text-lg text-gray-500 mb-6">
            oleh {projectWithMilestones.petani}
          </p>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-1 text-gray-600">
              <span className="font-semibold">
                {formatCurrency(projectWithMilestones.terkumpul)}
              </span>
              <span>
                Target: {formatCurrency(projectWithMilestones.target)}
              </span>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-center">
            <div className="bg-gray-100 p-4 rounded-lg">
              <span className="block text-sm text-gray-500">
                Estimasi Imbal Hasil
              </span>
              <span className="font-bold text-lg text-green-600">
                {projectWithMilestones.imbal}
              </span>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <span className="block text-sm text-gray-500">Lokasi Proyek</span>
              <span className="font-bold text-lg text-gray-800">
                {projectWithMilestones.lokasi}
              </span>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <span className="block text-sm text-gray-500">Durasi Proyek</span>
              <span className="font-bold text-lg text-gray-800">
                {projectWithMilestones.durasi}
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

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="flex overflow-x-auto border-b">
          <button
            className={`px-6 py-4 font-medium text-sm transition-colors ${
              activeTab === "overview"
                ? "border-b-2 border-green-600 text-green-600"
                : "text-gray-500 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            Deskripsi Proyek
          </button>
          <button
            className={`px-6 py-4 font-medium text-sm transition-colors ${
              activeTab === "milestones"
                ? "border-b-2 border-green-600 text-green-600"
                : "text-gray-500 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("milestones")}
          >
            Milestone & Progress
          </button>
          <button
            className={`px-6 py-4 font-medium text-sm transition-colors ${
              activeTab === "rab"
                ? "border-b-2 border-green-600 text-green-600"
                : "text-gray-500 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("rab")}
          >
            Rencana Anggaran Biaya (RAB)
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="mb-8">
        {activeTab === "overview" && (
          <Card className="bg-white">
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Tentang Proyek
              </h2>
              <p className="text-gray-700 leading-relaxed mb-8">
                {projectWithMilestones.deskripsi}
              </p>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2 flex items-center">
                  <span className="mr-2">🌱</span>
                  Manfaat Proyek
                </h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Meningkatkan kesejahteraan petani lokal</li>
                  <li>Mendukung praktek pertanian berkelanjutan</li>
                  <li>Meningkatkan kualitas hasil panen</li>
                  <li>Membuka akses pasar yang lebih luas</li>
                </ul>
              </div>
            </div>
          </Card>
        )}

        {activeTab === "milestones" && (
          <>
            <div className="bg-white rounded-lg shadow mb-4 px-4 py-3 flex justify-end">
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <button
                  type="button"
                  className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                    viewMode === "timeline"
                      ? "bg-green-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => setViewMode("timeline")}
                >
                  Timeline
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                    viewMode === "detailed"
                      ? "bg-green-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => setViewMode("detailed")}
                >
                  Detailed View
                </button>
              </div>
            </div>

            {viewMode === "timeline" ? (
              <MilestoneTracker milestones={projectWithMilestones.milestones} />
            ) : (
              <PublicMilestoneView project={projectWithMilestones} />
            )}
          </>
        )}

        {activeTab === "rab" && (
          <RABDetails milestones={projectWithMilestones.milestones} />
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;
