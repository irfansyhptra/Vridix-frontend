// src/components/dashboard/UserDashboard.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProfileSummary from "./ProfileSummary";
import FundedProject from "./FundedProjects";
import OrderHistory from "./OrderHistory";
import { useAuth } from "../../hooks/useAuth";
import { localStorageService } from "../../services/localStorageService";

const UserDashboard = () => {
  const { user } = useAuth();
  const [fundedProjects, setFundedProjects] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    if (user) {
      setFundedProjects(user.fundedProjects || []);
      setOrderHistory(
        localStorageService.getOrdersByWallet(user.walletAddress)
      );
    }
  }, [user]);

  if (!user) {
    return <p>Memuat data...</p>;
  }

  return (
    <main className="flex-grow container mx-auto px-6 py-12">
      <ProfileSummary user={user} />

      {/* Section untuk Pendaftaran Petani - hanya muncul jika user bukan petani */}
      {user.role !== "Petani" && user.statusVerifikasi !== "menunggu" && (
        <div className="mt-8 bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-8 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <h3 className="text-2xl font-bold text-white mb-2">
                🌾 Bergabung Sebagai Petani
              </h3>
              <p className="text-green-100">
                Daftarkan diri Anda sebagai petani dan mulai menjual hasil panen
                serta mengajukan proposal crowdfunding.
              </p>
            </div>
            <Link
              to="/register-farmer"
              className="bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg whitespace-nowrap"
            >
              Daftar Sekarang
            </Link>
          </div>
        </div>
      )}

      <div className="mt-12 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-3xl font-bold mb-6 text-white">
            Proyek yang Anda Danai
          </h2>
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
        <div>
          <h2 className="text-3xl font-bold mb-6 text-white">
            Riwayat Pesanan Anda
          </h2>
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
  );
};

export default UserDashboard;
