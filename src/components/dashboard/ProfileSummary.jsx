// src/components/dashboard/ProfileSummary.jsx
import React from "react";
import Card from "../common/Card";

const ProfileSummary = ({ user }) => {
  return (
    <Card className="text-center">
      <h2 className="text-3xl font-bold text-white mb-2">{user.name}</h2>
      <p className="text-green-400 font-mono break-all">{user.walletAddress}</p>
      <div className="mt-6 grid grid-cols-3 gap-4 border-t border-gray-700 pt-6">
        <div>
          <p className="text-sm text-gray-400">Total Investasi</p>
          <p className="text-2xl font-bold text-white">
            Rp {user.totalInvestasi.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Proyek Didanai</p>
          <p className="text-2xl font-bold text-white">{user.proyekDidanai}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Total Belanja</p>
          <p className="text-2xl font-bold text-white">
            Rp {user.totalBelanja.toLocaleString()}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default ProfileSummary;
