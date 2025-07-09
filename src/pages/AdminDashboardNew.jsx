// src/pages/AdminDashboardNew.jsx

import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { mockData } from "../data/mockData";
import Card from "../components/common/Card";
import Button from "../components/common/Button";

const AdminDashboardNew = () => {
  const { user, updateUser, showToast } = useAuth();
  const [activeTab, setActiveTab] = useState("farmers");
  const [pendingFarmers] = useState([
    {
      id: 1,
      name: "Budi Santoso",
      nik: "3201234567891234",
      alamat: "Jl. Sawah No. 123, Bogor",
      jenisUsaha: "Pertanian Padi",
      status: "menunggu",
      submitDate: "2024-12-20",
      documents: {
        ktp: "ktp_budi.jpg",
        sertifikat: "sertifikat_lahan_budi.pdf",
      },
    },
    {
      id: 2,
      name: "Siti Nurhaliza",
      nik: "3301234567891235",
      alamat: "Desa Maju Jaya, Purwokerto",
      jenisUsaha: "Hortikultura",
      status: "menunggu",
      submitDate: "2024-12-19",
      documents: {
        ktp: "ktp_siti.jpg",
        sertifikat: "sertifikat_lahan_siti.pdf",
      },
    },
  ]);

  const [transactions] = useState([
    {
      id: 1,
      type: "investment",
      from: "Investor Visioner",
      to: "Kebun Cabai Organik",
      amount: 2500000,
      date: "2024-12-20",
      status: "completed",
    },
    {
      id: 2,
      type: "topup",
      from: "Bank Transfer",
      to: "Investor Visioner",
      amount: 5000000,
      date: "2024-12-19",
      status: "completed",
    },
  ]);

  const [userBalances] = useState(mockData.users);

  const handleApprove = (farmerId) => {
    showToast(`Petani dengan ID ${farmerId} berhasil disetujui!`, "success");
  };

  const handleReject = (farmerId) => {
    showToast(`Pendaftaran petani dengan ID ${farmerId} ditolak.`, "error");
  };

  const handleBalanceUpdate = (userId, newBalance) => {
    showToast(
      `Saldo user ${userId} berhasil diupdate menjadi ${newBalance.toLocaleString(
        "id-ID",
        { style: "currency", currency: "IDR" }
      )}`,
      "success"
    );
  };

  const renderFarmerValidation = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">
        Validasi Pendaftaran Petani
      </h2>

      {pendingFarmers.map((farmer) => (
        <Card key={farmer.id} className="bg-gray-800">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Data Petani */}
            <div className="lg:col-span-2">
              <h3 className="text-xl font-semibold text-white mb-4">
                {farmer.name}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">NIK:</span>
                  <p className="text-white">{farmer.nik}</p>
                </div>
                <div>
                  <span className="text-gray-400">Jenis Usaha:</span>
                  <p className="text-white">{farmer.jenisUsaha}</p>
                </div>
                <div className="md:col-span-2">
                  <span className="text-gray-400">Alamat:</span>
                  <p className="text-white">{farmer.alamat}</p>
                </div>
                <div>
                  <span className="text-gray-400">Tanggal Daftar:</span>
                  <p className="text-white">{farmer.submitDate}</p>
                </div>
                <div>
                  <span className="text-gray-400">Status:</span>
                  <span className="inline-block px-2 py-1 rounded text-xs bg-yellow-600 text-yellow-100">
                    {farmer.status}
                  </span>
                </div>
              </div>

              {/* Dokumen */}
              <div className="mt-4">
                <h4 className="text-lg font-medium text-white mb-2">Dokumen</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-gray-700 rounded">
                    <span className="text-gray-300">
                      KTP: {farmer.documents.ktp}
                    </span>
                    <Button variant="secondary" size="small">
                      View
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-700 rounded">
                    <span className="text-gray-300">
                      Sertifikat Lahan: {farmer.documents.sertifikat}
                    </span>
                    <Button variant="secondary" size="small">
                      View
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col justify-center space-y-3">
              <Button
                variant="primary"
                onClick={() => handleApprove(farmer.id)}
                className="w-full"
              >
                ✅ Approve
              </Button>
              <Button
                variant="danger"
                onClick={() => handleReject(farmer.id)}
                className="w-full"
              >
                ❌ Reject
              </Button>
              <Button variant="secondary" className="w-full">
                📄 Detail
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderTransactionMonitoring = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">
        Monitoring Transaksi
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-green-800 bg-opacity-30 border-green-600">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">156</div>
            <div className="text-green-200">Total Transaksi</div>
          </div>
        </Card>
        <Card className="bg-blue-800 bg-opacity-30 border-blue-600">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">₹87.5M</div>
            <div className="text-blue-200">Volume Transaksi</div>
          </div>
        </Card>
        <Card className="bg-purple-800 bg-opacity-30 border-purple-600">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">45</div>
            <div className="text-purple-200">Proyek Didanai</div>
          </div>
        </Card>
        <Card className="bg-orange-800 bg-opacity-30 border-orange-600">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-400">892</div>
            <div className="text-orange-200">User Aktif</div>
          </div>
        </Card>
      </div>

      <Card className="bg-gray-800">
        <h3 className="text-xl font-semibold text-white mb-4">
          Transaksi Terbaru
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-300">ID</th>
                <th className="text-left py-3 px-4 text-gray-300">Type</th>
                <th className="text-left py-3 px-4 text-gray-300">From</th>
                <th className="text-left py-3 px-4 text-gray-300">To</th>
                <th className="text-left py-3 px-4 text-gray-300">Amount</th>
                <th className="text-left py-3 px-4 text-gray-300">Date</th>
                <th className="text-left py-3 px-4 text-gray-300">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-b border-gray-700">
                  <td className="py-3 px-4 text-white">#{tx.id}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        tx.type === "investment"
                          ? "bg-green-600 text-green-100"
                          : "bg-blue-600 text-blue-100"
                      }`}
                    >
                      {tx.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-300">{tx.from}</td>
                  <td className="py-3 px-4 text-gray-300">{tx.to}</td>
                  <td className="py-3 px-4 text-white">
                    {tx.amount.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </td>
                  <td className="py-3 px-4 text-gray-300">{tx.date}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded text-xs bg-green-600 text-green-100">
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  const renderUserBalanceManagement = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">
        Manajemen Saldo User
      </h2>

      <Card className="bg-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-300">Name</th>
                <th className="text-left py-3 px-4 text-gray-300">Role</th>
                <th className="text-left py-3 px-4 text-gray-300">
                  Saldo Fiat
                </th>
                <th className="text-left py-3 px-4 text-gray-300">
                  Total Investasi
                </th>
                <th className="text-left py-3 px-4 text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userBalances.map((user, index) => (
                <tr key={index} className="border-b border-gray-700">
                  <td className="py-3 px-4">
                    <div>
                      <div className="text-white font-medium">{user.name}</div>
                      <div className="text-gray-400 text-xs">{user.email}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        user.role === "Admin"
                          ? "bg-red-600 text-red-100"
                          : user.role === "Petani"
                          ? "bg-green-600 text-green-100"
                          : "bg-blue-600 text-blue-100"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-white">
                    {user.saldoFiat?.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }) || "Rp 0"}
                  </td>
                  <td className="py-3 px-4 text-white">
                    {user.totalInvestasi?.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }) || "Rp 0"}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <Button
                        variant="secondary"
                        size="small"
                        onClick={() =>
                          handleBalanceUpdate(
                            user.walletAddress,
                            (user.saldoFiat || 0) + 1000000
                          )
                        }
                      >
                        +1M
                      </Button>
                      <Button variant="secondary" size="small">
                        Edit
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  const renderSystemLogs = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">
        Log Aktivitas Sistem
      </h2>

      <Card className="bg-gray-800">
        <div className="space-y-3">
          {[
            {
              time: "2024-12-20 14:30",
              user: "Investor Visioner",
              action: "Investasi pada proyek Kebun Cabai",
              type: "info",
            },
            {
              time: "2024-12-20 14:25",
              user: "Budi Santoso",
              action: "Mendaftar sebagai petani",
              type: "success",
            },
            {
              time: "2024-12-20 14:20",
              user: "Admin",
              action: "Approve pendaftaran Siti Nurhaliza",
              type: "warning",
            },
            {
              time: "2024-12-20 14:15",
              user: "System",
              action: "Backup database completed",
              type: "info",
            },
            {
              time: "2024-12-20 14:10",
              user: "User123",
              action: "Failed login attempt",
              type: "error",
            },
          ].map((log, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-700 rounded"
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`w-3 h-3 rounded-full ${
                    log.type === "success"
                      ? "bg-green-500"
                      : log.type === "warning"
                      ? "bg-yellow-500"
                      : log.type === "error"
                      ? "bg-red-500"
                      : "bg-blue-500"
                  }`}
                ></div>
                <div>
                  <div className="text-white text-sm">{log.action}</div>
                  <div className="text-gray-400 text-xs">by {log.user}</div>
                </div>
              </div>
              <div className="text-gray-400 text-xs">{log.time}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  if (user?.role !== "Admin") {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Card className="text-center">
          <h2 className="text-xl font-bold text-red-400 mb-4">Access Denied</h2>
          <p className="text-gray-300 mb-4">
            Anda tidak memiliki akses ke halaman ini.
          </p>
          <Button onClick={() => window.history.back()}>Kembali</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-400">Selamat datang, {user.name}</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="secondary" onClick={() => setActiveTab("farmers")}>
              Refresh Data
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                updateUser({ role: "Investor" });
                showToast("Logout admin berhasil", "info");
              }}
            >
              Logout Admin
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-800 p-1 rounded-lg">
          {[
            {
              id: "farmers",
              label: "👥 Validasi Petani",
              count: pendingFarmers.length,
            },
            {
              id: "transactions",
              label: "💰 Transaksi",
              count: transactions.length,
            },
            {
              id: "balances",
              label: "💳 Saldo User",
              count: userBalances.length,
            },
            { id: "logs", label: "📊 System Logs", count: "∞" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 px-4 rounded-md transition-colors ${
                activeTab === tab.id
                  ? "bg-green-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-700"
              }`}
            >
              {tab.label}
              {tab.count !== "∞" && (
                <span className="ml-2 bg-gray-600 text-xs px-2 py-1 rounded-full">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="min-h-96">
          {activeTab === "farmers" && renderFarmerValidation()}
          {activeTab === "transactions" && renderTransactionMonitoring()}
          {activeTab === "balances" && renderUserBalanceManagement()}
          {activeTab === "logs" && renderSystemLogs()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardNew;
