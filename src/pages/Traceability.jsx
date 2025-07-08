// src/pages/Traceability.jsx

import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";

// Data dummy untuk riwayat traceability
const traceabilityData = {
  "VRDX-Kopi-001": [
    {
      status: "Pendanaan",
      detail: "Proyek didanai melalui Vridix Crowdfunding",
      timestamp: "2024-01-15",
    },
    {
      status: "Penanaman Bibit",
      detail: "Bibit kopi Arabika Gayo ditanam di lahan terverifikasi",
      timestamp: "2024-02-20",
    },
    {
      status: "Perawatan",
      detail: "Pemupukan organik tahap pertama",
      timestamp: "2024-05-10",
    },
    {
      status: "Panen",
      detail: "Ceri kopi dipanen oleh Koperasi Kopi Gayo Mandiri",
      timestamp: "2024-11-05",
    },
    {
      status: "Pengolahan",
      detail: "Biji kopi diolah dan dijemur secara alami",
      timestamp: "2024-11-12",
    },
    {
      status: "Distribusi",
      detail: "Dikirim ke gudang Vridix",
      timestamp: "2024-11-20",
    },
    {
      status: "Tersedia",
      detail: "Siap dijual di Marketplace",
      timestamp: "2024-11-22",
    },
  ],
};

const Traceability = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [productId, setProductId] = useState("");
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const idFromQuery = searchParams.get("id");
    if (idFromQuery) {
      handleSearch(idFromQuery);
    }
  }, [searchParams]);

  const handleSearch = (id) => {
    setProductId(id);
    if (traceabilityData[id]) {
      setHistory(traceabilityData[id]);
      setError("");
    } else {
      setHistory([]);
      setError("ID Produk tidak ditemukan. Silakan periksa kembali.");
    }
    navigate(`/traceability?id=${id}`, { replace: true });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    handleSearch(productId);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-2 text-center">
          Lacak Riwayat Produk Anda
        </h1>
        <p className="text-center text-gray-400 mb-10">
          Lihat seluruh perjalanan produk dari benih hingga ke tangan Anda,
          tercatat transparan di blockchain.
        </p>

        <form onSubmit={onFormSubmit} className="max-w-2xl mx-auto mb-12">
          <div className="flex">
            <input
              type="text"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              placeholder="Masukkan ID Produk dari kemasan..."
              className="w-full bg-gray-800 border border-gray-700 rounded-l-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-r-lg"
            >
              Lacak
            </button>
          </div>
        </form>

        {error && <p className="text-center text-red-500">{error}</p>}

        {history.length > 0 && (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">
              Riwayat untuk ID: {productId}
            </h2>
            <div className="relative border-l-2 border-blue-500 ml-4">
              {history.map((item, index) => (
                <div key={index} className="mb-8 pl-8">
                  <div className="absolute -left-2.5 mt-1.5 w-5 h-5 bg-blue-500 rounded-full border-4 border-gray-900"></div>
                  <time className="block mb-1 text-sm font-normal leading-none text-gray-400">
                    {item.timestamp}
                  </time>
                  <h3 className="text-lg font-semibold text-blue-300">
                    {item.status}
                  </h3>
                  <p className="text-base font-normal text-gray-500">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Traceability;
