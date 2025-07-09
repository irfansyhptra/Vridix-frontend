// src/components/dashboard/UserDashboard.jsx
import React, { useState, useEffect } from "react";
import ProfileSummary from "./ProfileSummary";
import FundedProject from "./FundedProjects";
import OrderHistory from "./OrderHistory";
import { useAuth } from "../../context/AuthContext";
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
