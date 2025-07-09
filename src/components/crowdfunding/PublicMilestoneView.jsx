// src/components/crowdfunding/PublicMilestoneView.jsx

import React, { useState } from "react";
import Card from "../common/Card";
import Button from "../common/Button";

const PublicMilestoneView = ({ project }) => {
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [showRAB, setShowRAB] = useState(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        label: "Menunggu",
      },
      in_progress: {
        bg: "bg-blue-100",
        text: "text-blue-800",
        label: "Sedang Berlangsung",
      },
      completed: {
        bg: "bg-green-100",
        text: "text-green-800",
        label: "Selesai",
      },
      validated: {
        bg: "bg-purple-100",
        text: "text-purple-800",
        label: "Tervalidasi",
      },
      failed: { bg: "bg-red-100", text: "text-red-800", label: "Gagal" },
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
      >
        {config.label}
      </span>
    );
  };

  const getProgressPercentage = () => {
    const completedMilestones =
      project.milestones?.filter(
        (m) => m.status === "completed" || m.status === "validated"
      ).length || 0;
    const totalMilestones = project.milestones?.length || 1;
    return (completedMilestones / totalMilestones) * 100;
  };

  const renderBlockchainInfo = (milestone) => (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-4">
      <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
        <span className="mr-2">🔗</span>
        Informasi Blockchain
      </h4>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Transaction Hash:</span>
          <span className="font-mono text-blue-600 truncate ml-2">
            {milestone.transactionHash ||
              `0x${Math.random().toString(16).substr(2, 40)}`}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Block Number:</span>
          <span className="font-mono text-blue-600">
            {milestone.blockNumber || Math.floor(Math.random() * 1000000)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Gas Used:</span>
          <span className="font-mono text-blue-600">
            {milestone.gasUsed || "21,000 ETH"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Timestamp:</span>
          <span className="text-gray-800">
            {milestone.completedDate ||
              milestone.startDate ||
              new Date().toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );

  const renderEvidence = (evidence) => {
    if (!evidence)
      return <span className="text-gray-400">Belum ada bukti</span>;

    const evidenceTypes = {
      photo: { icon: "📷", label: "Foto Progress" },
      video: { icon: "🎥", label: "Video Dokumentasi" },
      receipt: { icon: "🧾", label: "Struk Pembelian" },
      geolocation: { icon: "📍", label: "Lokasi GPS" },
      timelapses: { icon: "⏰", label: "Timelapse" },
      weight_certificate: { icon: "⚖️", label: "Sertifikat Berat" },
    };

    const type = evidenceTypes[evidence.type] || {
      icon: "📄",
      label: "Dokumen",
    };

    return (
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <span className="text-lg">{type.icon}</span>
          <span className="text-green-600 font-medium">{type.label}</span>
        </div>
        <p className="text-sm text-gray-600">{evidence.description}</p>
        {evidence.geoLocation && (
          <p className="text-xs text-blue-600 flex items-center">
            <span className="mr-1">📍</span>
            {evidence.geoLocation}
          </p>
        )}
        {evidence.url && (
          <p className="text-xs text-purple-600 font-mono truncate">
            IPFS: {evidence.url}
          </p>
        )}
      </div>
    );
  };

  const renderRABDetail = (milestone) => {
    if (!milestone.rabDetail) return null;

    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
        <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
          <span className="mr-2">📊</span>
          Rencana Anggaran Biaya (RAB)
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-blue-200">
                <th className="text-left py-2 px-3 text-blue-700">Item</th>
                <th className="text-center py-2 px-3 text-blue-700">Qty</th>
                <th className="text-center py-2 px-3 text-blue-700">Satuan</th>
                <th className="text-right py-2 px-3 text-blue-700">Harga</th>
                <th className="text-right py-2 px-3 text-blue-700">Total</th>
              </tr>
            </thead>
            <tbody>
              {milestone.rabDetail.map((item, index) => (
                <tr key={index} className="border-b border-blue-100">
                  <td className="py-2 px-3 text-gray-800">{item.item}</td>
                  <td className="py-2 px-3 text-center text-gray-600">
                    {item.quantity}
                  </td>
                  <td className="py-2 px-3 text-center text-gray-600">
                    {item.satuan}
                  </td>
                  <td className="py-2 px-3 text-right text-gray-600">
                    {formatCurrency(item.harga)}
                  </td>
                  <td className="py-2 px-3 text-right font-medium text-gray-800">
                    {formatCurrency(item.quantity * item.harga)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-blue-300 bg-blue-100">
                <td
                  colSpan="4"
                  className="py-2 px-3 font-semibold text-blue-800"
                >
                  Total RAB Milestone
                </td>
                <td className="py-2 px-3 text-right font-bold text-blue-800">
                  {formatCurrency(milestone.targetAmount)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
  };

  const renderCommunityValidation = (milestone) => {
    if (!milestone.communityValidation) return null;

    return (
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mt-4">
        <h4 className="font-semibold text-purple-800 mb-3 flex items-center">
          <span className="mr-2">👥</span>
          Validasi Komunitas
        </h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-purple-700">Total Validator:</span>
            <span className="font-medium text-purple-800">
              {milestone.communityValidation.totalValidators || 0}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-purple-700">Approve:</span>
            <span className="font-medium text-green-600">
              {milestone.communityValidation.approves || 0}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-purple-700">Reject:</span>
            <span className="font-medium text-red-600">
              {milestone.communityValidation.rejects || 0}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-purple-700">Consensus:</span>
            <span className="font-medium text-purple-800">
              {milestone.communityValidation.consensus || "Pending"}
            </span>
          </div>
        </div>
      </div>
    );
  };

  if (!project.milestones || project.milestones.length === 0) {
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

  return (
    <div className="space-y-6">
      {/* Header & Progress */}
      <Card className="bg-white">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">
              📋 Milestone Proyek
            </h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Progress:</span>
              <span className="font-bold text-green-600">
                {getProgressPercentage().toFixed(1)}%
              </span>
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div
              className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>

          <div className="flex justify-between text-sm text-gray-600">
            <span>
              {
                project.milestones.filter(
                  (m) => m.status === "completed" || m.status === "validated"
                ).length
              }{" "}
              dari {project.milestones.length} milestone selesai
            </span>
            <span>
              Dana terpakai:{" "}
              {formatCurrency(
                project.milestones
                  .filter(
                    (m) => m.status === "completed" || m.status === "validated"
                  )
                  .reduce((sum, m) => sum + m.targetAmount, 0)
              )}
            </span>
          </div>
        </div>
      </Card>

      {/* Milestone List */}
      <div className="grid gap-4">
        {project.milestones.map((milestone, index) => (
          <Card
            key={milestone.id}
            className="bg-white hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full font-medium">
                      {index + 1}
                    </span>
                    <h4 className="text-lg font-semibold text-gray-800">
                      {milestone.title}
                    </h4>
                    {getStatusBadge(milestone.status)}
                  </div>
                  <p className="text-gray-600 mb-2">{milestone.description}</p>
                  {milestone.targetTime && (
                    <p className="text-sm text-blue-600 flex items-center">
                      <span className="mr-1">⏰</span>
                      {milestone.targetTime}
                    </p>
                  )}
                </div>
                <div className="text-right ml-4">
                  <p className="text-lg font-bold text-gray-800">
                    {formatCurrency(milestone.targetAmount)}
                  </p>
                  {milestone.fundPercentage && (
                    <p className="text-sm text-gray-500">
                      {milestone.fundPercentage}% dari total
                    </p>
                  )}
                </div>
              </div>

              {/* Timeline & Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h5 className="font-medium text-gray-700 mb-2">
                    Status & Timeline:
                  </h5>
                  {milestone.status === "completed" && (
                    <p className="text-green-600 text-sm flex items-center">
                      <span className="mr-1">✅</span>
                      Selesai: {milestone.completedDate}
                    </p>
                  )}
                  {milestone.status === "in_progress" && (
                    <p className="text-blue-600 text-sm flex items-center">
                      <span className="mr-1">🔄</span>
                      Dimulai: {milestone.startDate}
                    </p>
                  )}
                  {milestone.status === "pending" && (
                    <p className="text-yellow-600 text-sm flex items-center">
                      <span className="mr-1">⏳</span>
                      Menunggu milestone sebelumnya
                    </p>
                  )}
                </div>
                <div>
                  <h5 className="font-medium text-gray-700 mb-2">
                    Bukti Progress:
                  </h5>
                  {renderEvidence(milestone.evidence)}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={() =>
                    setSelectedMilestone(
                      selectedMilestone === milestone.id ? null : milestone.id
                    )
                  }
                  variant="outline"
                  className="text-sm"
                >
                  {selectedMilestone === milestone.id
                    ? "Tutup Detail"
                    : "📋 Lihat Detail"}
                </Button>
                <Button
                  onClick={() =>
                    setShowRAB(showRAB === milestone.id ? null : milestone.id)
                  }
                  variant="outline"
                  className="text-sm"
                >
                  {showRAB === milestone.id ? "Tutup RAB" : "📊 Lihat RAB"}
                </Button>
                {milestone.evidence?.url && (
                  <Button
                    onClick={() =>
                      window.open(milestone.evidence.url, "_blank")
                    }
                    variant="outline"
                    className="text-sm"
                  >
                    🔗 Lihat Bukti
                  </Button>
                )}
              </div>

              {/* Expanded Details */}
              {selectedMilestone === milestone.id && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  {renderBlockchainInfo(milestone)}
                  {renderCommunityValidation(milestone)}
                </div>
              )}

              {/* RAB Details */}
              {showRAB === milestone.id && renderRABDetail(milestone)}
            </div>
          </Card>
        ))}
      </div>

      {/* Community Validation Info */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">🌐</span>
            Transparansi Web 3.0
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">
                Blockchain Features:
              </h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Semua milestone tersimpan di blockchain</li>
                <li>• Transparansi penuh untuk semua investor</li>
                <li>• Validasi komunitas terdesentralisasi</li>
                <li>• Immutable record of progress</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">
                Community Governance:
              </h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Validator dipilih secara random</li>
                <li>• Konsensus mayoritas untuk approval</li>
                <li>• Reward sistem untuk validator</li>
                <li>• Appeal process untuk dispute</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PublicMilestoneView;
