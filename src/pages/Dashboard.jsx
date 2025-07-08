// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ProfileSummary from "../components/dashboard/ProfileSummary";
import FundedProject from "../components/dashboard/FundedProjects";
import OrderHistory from "../components/dashboard/OrderHistory";
import { useAuth } from "../../context/AuthContext";
import { localStorageService } from "../../services/localStorageService";

const Dashboard = () => {
  const { user } = useAuth();
  const [fundedProjects, setFundedProjects] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    if (user) {
      // In a real app, this data might be combined from multiple sources
      // For now, we get it directly from the user object in localStorage
      setFundedProjects(user.fundedProjects || []);
      setOrderHistory(
        localStorageService.getOrdersByWallet(user.walletAddress)
      );
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p>Memuat data pengguna...</p>
      </div>
    );
  }

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
              {fundedProjects.length > 0 ? (
                fundedProjects.map((proj, i) => (
                  <FundedProject key={i} project={proj} />
                ))
              ) : (
                <p className="text-gray-400">
                  Anda belum mendanai proyek apa pun.
                </p>
              )}
            </div>
          </div>

          {/* Kolom Riwayat Pesanan */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Riwayat Pesanan Anda</h2>
            <div className="space-y-4">
              {orderHistory.length > 0 ? (
                orderHistory.map((order) => (
                  <OrderHistory key={order.id} order={order} />
                ))
              ) : (
                <p className="text-gray-400">
                  Anda belum memiliki riwayat pesanan.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
