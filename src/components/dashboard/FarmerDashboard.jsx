// src/components/dashboard/FarmerDashboard.jsx
import React from "react";
import { useAuth } from "../../hooks/useAuth";
import Card from "../common/Card";
import Button from "../common/Button";
import { Link } from "react-router-dom";

const FarmerDashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return <p>Memuat data petani...</p>;
  }

  return (
    <main className="flex-grow container mx-auto px-6 py-12">
      <Card className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-2">{user.name}</h2>
        <p className="text-green-400 font-mono break-all">
          {user.walletAddress}
        </p>
        <div className="mt-4">
          <span className="bg-blue-500/20 text-blue-300 px-3 py-1 text-sm rounded-full">
            Status: Terverifikasi
          </span>
        </div>
      </Card>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Kolom Proposal Saya */}
        <Card className="md:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-white">
              Proposal Crowdfunding Saya
            </h3>
            <Link to="/create-proposal">
              <Button>+ Buat Proposal Baru</Button>
            </Link>
          </div>
          <div className="space-y-4">
            {user.proposals?.length > 0 ? (
              user.proposals.map((p) => (
                <Card
                  key={p.id}
                  className="flex justify-between items-center bg-gray-700"
                >
                  <span className="text-white font-semibold">{p.name}</span>
                  <span className="text-yellow-400">{p.status}</span>
                </Card>
              ))
            ) : (
              <p className="text-gray-400">Anda belum memiliki proposal.</p>
            )}
          </div>
        </Card>

        {/* Kolom Keuangan */}
        <Card>
          <h3 className="text-2xl font-bold text-white mb-6">Keuangan</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-400">Saldo Dapat Ditarik</p>
              <p className="text-3xl font-bold text-green-400">Rp 12.500.000</p>
            </div>
            <Button variant="secondary" className="w-full">
              Tarik Dana
            </Button>
            <hr className="border-gray-700" />
            <p className="text-sm text-center text-gray-400">
              Riwayat Pencairan
            </p>
            {/* Dummy History */}
            <div className="text-sm text-gray-300">
              <p>Rp 5.000.000 - 15 Juni 2025</p>
              <p>Rp 8.000.000 - 10 Mei 2025</p>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
};

export default FarmerDashboard;
