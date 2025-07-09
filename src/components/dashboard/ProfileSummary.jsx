// src/components/dashboard/ProfileSummary.jsx
import React from "react";
import Card from "../common/Card";

const ProfileSummary = ({ user }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatAddress = (address) => {
    if (!address) return "Tidak terhubung";
    return `${address.substring(0, 6)}...${address.substring(
      address.length - 4
    )}`;
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "Petani":
        return "🧑‍🌾";
      case "Investor":
        return "💼";
      case "Admin":
        return "👑";
      case "Konsumen":
        return "🛒";
      default:
        return "👤";
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "Petani":
        return "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200";
      case "Investor":
        return "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200";
      case "Admin":
        return "bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-200";
      case "Konsumen":
        return "bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "terverifikasi":
        return "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200";
      case "menunggu":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200";
      case "ditolak":
        return "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  return (
    <Card className="mb-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          {/* Avatar */}
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {getRoleIcon(user.role)}
          </div>

          {/* User Info */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
              {user.name}
            </h2>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(
                  user.role
                )}`}
              >
                {user.role}
              </span>
              {user.statusVerifikasi && (
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(
                    user.statusVerifikasi
                  )}`}
                >
                  {user.statusVerifikasi === "terverifikasi"
                    ? "✅ Terverifikasi"
                    : user.statusVerifikasi === "menunggu"
                    ? "⏳ Menunggu"
                    : "❌ Ditolak"}
                </span>
              )}
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              🔗 {formatAddress(user.walletAddress)}
            </p>
            {user.email && (
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                📧 {user.email}
              </p>
            )}
            {user.joinDate && (
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                📅 Bergabung:{" "}
                {new Date(user.joinDate).toLocaleDateString("id-ID")}
              </p>
            )}
          </div>
        </div>

        {/* Balance Display */}
        <div className="text-right">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900 dark:to-blue-900 rounded-lg p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Saldo Fiat Digital
            </p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {formatCurrency(user.saldoFiat || 0)}
            </p>
          </div>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t dark:border-gray-700">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {formatCurrency(user.totalInvestasi || 0)}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Total Investasi
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {user.proyekDidanai || 0}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Proyek Didanai
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {formatCurrency(user.totalBelanja || 0)}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Total Belanja
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {user.fundedProjects?.length || 0}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Investasi Aktif
          </div>
        </div>
      </div>

      {/* Additional Info for Farmers */}
      {user.role === "Petani" && user.alamat && (
        <div className="mt-4 pt-4 border-t dark:border-gray-700">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
            Informasi Usaha
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600 dark:text-gray-400">
                📍 Lokasi:
              </span>
              <span className="ml-2 text-gray-900 dark:text-white">
                {user.alamat}
              </span>
            </div>
            {user.jenisUsaha && (
              <div>
                <span className="text-gray-600 dark:text-gray-400">
                  🌱 Jenis Usaha:
                </span>
                <span className="ml-2 text-gray-900 dark:text-white">
                  {user.jenisUsaha}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </Card>
  );
};

export default ProfileSummary;
