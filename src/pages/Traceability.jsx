// src/pages/Traceability.jsx

import React from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/layout/Header";
import { traceabilityData } from "../data/mockData";

const TimelineItem = ({ item, isLast }) => {
  return (
    <div className="relative">
      <div className="flex items-center">
        {/* Bulatan dan Garis */}
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center z-10">
          <div className="w-4 h-4 bg-gray-900 rounded-full"></div>
        </div>
        {!isLast && (
          <div className="absolute left-4 top-8 h-full w-0.5 bg-green-500"></div>
        )}

        {/* Konten Timeline */}
        <div className="ml-6 bg-gray-800 p-6 rounded-lg w-full">
          <h4 className="font-bold text-xl text-green-400">{item.status}</h4>
          <p className="text-sm text-gray-400 mb-2">{item.date}</p>
          <p className="text-gray-300">{item.description}</p>
          <a
            href={`https://etherscan.io/tx/${item.txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-400 hover:underline mt-2 inline-block break-all"
          >
            {item.txHash}
          </a>
        </div>
      </div>
    </div>
  );
};

const Traceability = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("id");
  const data = traceabilityData[productId];

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Header />
        <main className="container mx-auto px-6 py-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Produk Tidak Ditemukan</h1>
          <p className="text-gray-400">
            Maaf, data ketertelusuran untuk produk ini tidak tersedia.
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-2 text-center">
          Riwayat Produk:{" "}
          <span className="text-green-400">{data.productName}</span>
        </h1>
        <p className="text-center text-gray-400 mb-10">Dari: {data.farmer}</p>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-12">
            {data.timeline.map((item, index) => (
              <TimelineItem
                key={index}
                item={item}
                isLast={index === data.timeline.length - 1}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Traceability;
