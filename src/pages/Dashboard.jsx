// src/pages/Dashboard.jsx
import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ProfileSummary from "../components/dashboard/ProfileSummary";
import FundedProject from "../components/dashboard/FundedProjects";
import OrderHistory from "../components/dashboard/OrderHistory";

// Dummy data for the dashboard
const user = {
  name: "Investor Visioner",
  walletAddress: "0xAbCd...1234",
  totalInvestasi: 7500000,
  proyekDidanai: 3,
  totalBelanja: 850000,
};

const fundedProjects = [
  { name: "Kebun Cabai Merah Organik", amount: 2500000 },
  { name: "Hidroponik Selada", amount: 5000000 },
];

const orderHistory = [
  {
    id: "ORD-001",
    date: "2025-06-15",
    productName: "Telur Ayam Probiotik",
    total: 30000,
    status: "Selesai",
  },
  {
    id: "ORD-002",
    date: "2025-06-28",
    productName: "Selada Romain Hidroponik",
    total: 45000,
    status: "Dalam Pengiriman",
  },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-6 py-12">
        <ProfileSummary user={user} />

        <div className="mt-12 grid md:grid-cols-2 gap-10">
          {/* Kolom Proyek yang Didanai */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Proyek yang Anda Danai</h2>
            <div className="space-y-4">
              {fundedProjects.map((proj, i) => (
                <FundedProject key={i} project={proj} />
              ))}
            </div>
          </div>

          {/* Kolom Riwayat Pesanan */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Riwayat Pesanan Anda</h2>
            <div className="space-y-4">
              {orderHistory.map((order) => (
                <OrderHistory key={order.id} order={order} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
