// src/components/crowdfunding/RABDetails.jsx

import React from "react";
import Card from "../common/Card";

const RABDetails = ({ milestones }) => {
  if (!milestones || milestones.length === 0) {
    return (
      <Card className="bg-white">
        <div className="p-6 text-center">
          <div className="text-gray-400 text-4xl mb-4">📊</div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            Rencana Anggaran Belum Tersedia
          </h3>
          <p className="text-gray-500">
            Detail anggaran proyek belum diunggah ke blockchain.
          </p>
        </div>
      </Card>
    );
  }

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate RAB total
  const calculateRabTotal = () => {
    return milestones.reduce(
      (total, milestone) => total + milestone.targetAmount,
      0
    );
  };

  // Calculate completion percentage
  const calculateCompletion = () => {
    const completedAmount = milestones
      .filter((m) => m.status === "completed")
      .reduce((sum, m) => sum + m.targetAmount, 0);

    return (completedAmount / calculateRabTotal()) * 100;
  };

  return (
    <Card className="bg-white">
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Rencana Anggaran Biaya (RAB)
          </h2>
          <div className="md:text-right">
            <p className="text-sm text-gray-500">Total RAB:</p>
            <p className="text-xl font-bold text-green-600">
              {formatCurrency(calculateRabTotal())}
            </p>
            <div className="mt-2">
              <div className="text-xs text-gray-500 mb-1">Pencapaian:</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${calculateCompletion()}%` }}
                ></div>
              </div>
              <p className="text-xs text-right text-gray-600 mt-1">
                {calculateCompletion().toFixed(1)}% Terealisasi
              </p>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-200 mb-6"></div>

        {/* Summary by category */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-3">
            Ringkasan Anggaran per Kategori
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-sm text-blue-700 mb-1">
                Persiapan &amp; Penanaman
              </div>
              <div className="text-xl font-bold text-blue-800">
                {formatCurrency(
                  milestones
                    .filter((m, i) => i < 2)
                    .reduce((sum, m) => sum + m.targetAmount, 0)
                )}
              </div>
              <div className="text-xs text-blue-600 mt-1">
                {Math.round(
                  (milestones
                    .filter((m, i) => i < 2)
                    .reduce((sum, m) => sum + m.targetAmount, 0) /
                    calculateRabTotal()) *
                    100
                )}
                % dari total
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-sm text-green-700 mb-1">
                Perawatan &amp; Pemeliharaan
              </div>
              <div className="text-xl font-bold text-green-800">
                {formatCurrency(
                  milestones
                    .filter((m, i) => i >= 2 && i < 3)
                    .reduce((sum, m) => sum + m.targetAmount, 0)
                )}
              </div>
              <div className="text-xs text-green-600 mt-1">
                {Math.round(
                  (milestones
                    .filter((m, i) => i >= 2 && i < 3)
                    .reduce((sum, m) => sum + m.targetAmount, 0) /
                    calculateRabTotal()) *
                    100
                )}
                % dari total
              </div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="text-sm text-purple-700 mb-1">
                Panen &amp; Distribusi
              </div>
              <div className="text-xl font-bold text-purple-800">
                {formatCurrency(
                  milestones
                    .filter((m, i) => i >= 3)
                    .reduce((sum, m) => sum + m.targetAmount, 0)
                )}
              </div>
              <div className="text-xs text-purple-600 mt-1">
                {Math.round(
                  (milestones
                    .filter((m, i) => i >= 3)
                    .reduce((sum, m) => sum + m.targetAmount, 0) /
                    calculateRabTotal()) *
                    100
                )}
                % dari total
              </div>
            </div>
          </div>
        </div>

        {/* Detailed RAB by milestone */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-700 mb-3">
            Detail RAB per Milestone
          </h3>

          {milestones.map((milestone, index) => (
            <div
              key={milestone.id}
              className="rounded-lg border border-gray-200"
            >
              <div className="bg-gray-50 p-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <span className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full font-medium">
                      {index + 1}
                    </span>
                    <h4 className="font-semibold text-gray-800">
                      {milestone.title}
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-green-600">
                      {formatCurrency(milestone.targetAmount)}
                    </span>
                    {milestone.status && (
                      <span
                        className={`ml-2 px-2 py-1 text-xs rounded-full ${
                          milestone.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : milestone.status === "in_progress"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {milestone.status === "completed"
                          ? "Selesai"
                          : milestone.status === "in_progress"
                          ? "Dalam Proses"
                          : "Menunggu"}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-4">
                {milestone.rabDetail ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 px-3 text-gray-700">
                            Item
                          </th>
                          <th className="text-center py-2 px-3 text-gray-700">
                            Qty
                          </th>
                          <th className="text-center py-2 px-3 text-gray-700">
                            Satuan
                          </th>
                          <th className="text-right py-2 px-3 text-gray-700">
                            Harga
                          </th>
                          <th className="text-right py-2 px-3 text-gray-700">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {milestone.rabDetail.map((item, idx) => (
                          <tr key={idx} className="border-b border-gray-100">
                            <td className="py-2 px-3 text-gray-800">
                              {item.item}
                            </td>
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
                        <tr className="bg-gray-50">
                          <td
                            colSpan="4"
                            className="py-2 px-3 font-semibold text-gray-700"
                          >
                            Total Milestone
                          </td>
                          <td className="py-2 px-3 text-right font-bold text-green-600">
                            {formatCurrency(milestone.targetAmount)}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    <p>Detail RAB untuk milestone ini belum tersedia.</p>
                  </div>
                )}
              </div>

              {milestone.transactionHash && (
                <div className="bg-gray-50 p-3 border-t border-gray-200">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">
                      Verified on Blockchain:
                    </span>
                    <span className="font-mono text-blue-600 truncate">
                      {milestone.transactionHash.substring(0, 18)}...
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Blockchain Info Box */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-5">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
            <span className="mr-2">🔗</span>
            Transparansi RAB di Blockchain
          </h3>
          <p className="text-gray-700 mb-3">
            Setiap item dalam RAB ini tercatat di blockchain untuk memastikan
            transparansi. Investor dapat melihat rencana penggunaan dana dan
            verifikasi pencairan dana pada setiap milestone.
          </p>
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
            <div className="md:w-1/2 mb-3 md:mb-0">
              <div className="bg-white border border-gray-200 rounded-lg p-3 font-mono">
                <div className="flex items-center justify-between">
                  <span>Smart Contract:</span>
                  <span className="truncate">
                    0x721F6EF5ef02439fF8eFB95a774a15598AD8346D
                  </span>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-4">
              <div className="flex space-x-4 justify-center md:justify-end">
                <button
                  className="px-3 py-2 bg-white border border-blue-500 text-blue-600 rounded hover:bg-blue-50 text-sm flex items-center"
                  onClick={() =>
                    alert(
                      "This would open the blockchain explorer in a production app"
                    )
                  }
                >
                  <span className="mr-1">🔍</span> Lihat di Explorer
                </button>
                <button
                  className="px-3 py-2 bg-white border border-purple-500 text-purple-600 rounded hover:bg-purple-50 text-sm flex items-center"
                  onClick={() =>
                    alert(
                      "This would verify the RAB data on-chain in a production app"
                    )
                  }
                >
                  <span className="mr-1">✅</span> Verifikasi
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RABDetails;
