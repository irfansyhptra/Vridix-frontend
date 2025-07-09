// src/components/crowdfunding/BlockchainVerification.jsx

import React from "react";

const BlockchainVerification = ({
  transactionHash,
  blockNumber,
  timestamp,
  validators,
  consensusStatus,
}) => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 p-4">
      <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
        <span className="mr-2">🔗</span>
        Validasi Blockchain
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Transaction Details */}
        <div className="bg-white rounded-lg border border-gray-200 p-3 shadow-sm">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Detail Transaksi
          </h4>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-500">Transaction Hash:</span>
              <span className="font-mono text-blue-600 truncate ml-2 max-w-[200px]">
                {transactionHash || "0x0000...0000"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Block Number:</span>
              <span className="font-mono text-blue-600">
                {blockNumber || "N/A"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Timestamp:</span>
              <span className="text-gray-800">{timestamp || "Pending"}</span>
            </div>
          </div>
        </div>

        {/* Validation Status */}
        <div className="bg-white rounded-lg border border-gray-200 p-3 shadow-sm">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Status Validasi
          </h4>

          <div className="mb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-500">Consensus:</span>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  consensusStatus === "Approved"
                    ? "bg-green-100 text-green-800"
                    : consensusStatus === "Rejected"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {consensusStatus || "Pending"}
              </span>
            </div>

            {validators && (
              <div className="mt-2">
                <span className="text-xs text-gray-500 block mb-1">
                  Validators ({validators.total || 0}):
                </span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                    <span className="text-xs">
                      {validators.approves || 0} Approve
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>
                    <span className="text-xs">
                      {validators.rejects || 0} Reject
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert(
                "This would open the blockchain explorer in a real application"
              );
            }}
            className="text-xs text-blue-600 hover:underline flex items-center"
          >
            <span className="mr-1">🔍</span>
            View on Block Explorer
          </a>
        </div>
      </div>

      <div className="mt-4 text-xs text-gray-500 italic">
        <p>
          Semua milestone dan transaksi tercatat secara transparan dan
          terverifikasi di blockchain untuk memastikan kepercayaan dan
          akuntabilitas.
        </p>
      </div>
    </div>
  );
};

export default BlockchainVerification;
