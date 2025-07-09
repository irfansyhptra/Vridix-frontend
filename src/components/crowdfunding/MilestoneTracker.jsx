// src/components/crowdfunding/MilestoneTracker.jsx

import React, { useState } from "react";
import Card from "../common/Card";
import Button from "../common/Button";
import BlockchainVerification from "./BlockchainVerification";

const MilestoneTracker = ({ milestones }) => {
  const [expandedMilestone, setExpandedMilestone] = useState(null);

  if (!milestones || milestones.length === 0) {
    return (
      <Card className="bg-white">
        <div className="p-6 text-center">
          <div className="text-gray-400 text-4xl mb-4">📋</div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            Milestone Belum Tersedia
          </h3>
          <p className="text-gray-500">
            Petani belum mengatur milestone untuk proyek ini.
          </p>
        </div>
      </Card>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "in_progress":
        return "bg-blue-500";
      case "pending":
        return "bg-gray-300";
      default:
        return "bg-gray-300";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return "✅";
      case "in_progress":
        return "🔄";
      case "pending":
        return "⏳";
      default:
        return "⏳";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "Selesai";
      case "in_progress":
        return "Sedang Berlangsung";
      case "pending":
        return "Menunggu";
      default:
        return "Menunggu";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Timeline Milestone Proyek
      </h2>

      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-6 top-2 bottom-0 w-1 bg-gray-200" />

        {/* Milestones */}
        <div className="space-y-8">
          {milestones.map((milestone, index) => (
            <div key={milestone.id} className="relative pl-16">
              {/* Circle */}
              <div
                className={`absolute left-0 top-0 w-12 h-12 rounded-full flex items-center justify-center text-white ${getStatusClass(
                  milestone.status
                )}`}
              >
                <span>{index + 1}</span>
              </div>

              <Card className="bg-white border">
                <div className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600 mt-1">
                        {milestone.description}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          milestone.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : milestone.status === "in_progress"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {getStatusIcon(milestone.status)}{" "}
                        {getStatusText(milestone.status)}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="block text-gray-500 mb-1">
                        Target Anggaran:
                      </span>
                      <span className="font-medium text-blue-600">
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                        }).format(milestone.targetAmount)}
                      </span>
                    </div>
                    <div>
                      <span className="block text-gray-500 mb-1">
                        {milestone.status === "completed"
                          ? "Selesai pada:"
                          : milestone.status === "in_progress"
                          ? "Dimulai pada:"
                          : "Estimasi selesai:"}
                      </span>
                      <span className="font-medium text-gray-800">
                        {milestone.status === "completed"
                          ? formatDate(milestone.completedDate)
                          : milestone.status === "in_progress"
                          ? formatDate(milestone.startDate)
                          : formatDate(milestone.expectedDate)}
                      </span>
                    </div>
                  </div>

                  {milestone.evidence && (
                    <div className="mt-4 pt-3 border-t">
                      <div className="flex items-center">
                        <div className="mr-3">
                          <span className="inline-block p-2 bg-green-100 text-green-600 rounded-full text-xl">
                            {milestone.evidence.type === "photo"
                              ? "📷"
                              : milestone.evidence.type === "video"
                              ? "🎥"
                              : milestone.evidence.type === "receipt"
                              ? "🧾"
                              : "📄"}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">
                            Bukti Progress
                          </h4>
                          <p className="text-sm text-gray-600">
                            {milestone.evidence.description ||
                              "Bukti telah diunggah ke blockchain"}
                          </p>

                          {milestone.evidence.url && (
                            <a
                              href="#"
                              className="text-xs text-blue-600 mt-1 inline-block hover:underline"
                              onClick={(e) => {
                                e.preventDefault();
                                alert("Link bukti: " + milestone.evidence.url);
                              }}
                            >
                              Lihat bukti di IPFS
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 pt-2 flex justify-end">
                    <Button
                      variant="outline"
                      onClick={() =>
                        setExpandedMilestone(
                          expandedMilestone === milestone.id
                            ? null
                            : milestone.id
                        )
                      }
                      className="text-sm"
                    >
                      {expandedMilestone === milestone.id
                        ? "Tutup Detail"
                        : "Detail Blockchain"}
                    </Button>
                  </div>

                  {expandedMilestone === milestone.id && (
                    <div className="mt-4 pt-3 border-t">
                      {milestone.transactionHash && milestone.blockNumber ? (
                        <BlockchainVerification
                          transactionHash={milestone.transactionHash}
                          blockNumber={milestone.blockNumber}
                          timestamp={
                            milestone.completedDate || milestone.startDate
                          }
                          validators={milestone.communityValidation}
                          consensusStatus={
                            milestone.communityValidation?.consensus
                          }
                        />
                      ) : (
                        <div className="text-center py-3 text-gray-500 text-sm italic">
                          <p>
                            Data blockchain belum tersedia untuk milestone ini.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Blockchain Info */}
      <div className="mt-10 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-lg p-5">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
          <span className="mr-2">🔗</span>
          Transparansi Blockchain
        </h3>
        <p className="text-gray-600 mb-4">
          Semua milestone proyek ini dicatat dalam smart contract dan tersimpan
          dalam blockchain. Investor dapat memverifikasi setiap progres dan
          validasi milestone melalui blockchain explorer.
        </p>
        <div className="flex justify-between items-center text-sm text-gray-600 font-mono bg-white border border-gray-200 rounded-lg p-3">
          <span>Smart Contract:</span>
          <span>0x721F6EF5ef02439fF8eFB95a774a15598AD8346D</span>
        </div>
      </div>
    </div>
  );
};

export default MilestoneTracker;
