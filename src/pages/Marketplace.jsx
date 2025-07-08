// src/pages/Marketplace.jsx

import React from "react";
import Header from "../components/layout/Header";
import { marketplaceProducts } from "../data/mockData";
import { Link } from "react-router-dom";

// Komponen Card untuk Produk di Marketplace
const ProductCard = ({ product }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-blue-500/20">
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2 text-blue-400">
          {product.nama}
        </h3>
        <p className="text-sm font-semibold text-gray-300 mb-2">
          Dari: {product.petani}
        </p>
        <p className="text-gray-400 mb-4">{product.lokasi}</p>

        <div className="my-4">
          <span className="text-3xl font-bold text-white">
            Rp {product.harga.toLocaleString()}
          </span>
          <span className="text-gray-400 ml-2">{product.satuan}</span>
        </div>

        <div className="flex justify-between items-center text-gray-300 border-t border-gray-700 pt-4 mt-4">
          <Link
            to={`/traceability?id=${product.traceabilityId}`}
            className="text-sm text-blue-400 hover:underline"
          >
            Lacak Produk Ini
          </Link>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
            Beli Sekarang
          </button>
        </div>
      </div>
    </div>
  );
};

const Marketplace = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-2 text-center text-white">
          Marketplace Hasil Tani
        </h1>
        <p className="text-center text-gray-400 mb-10">
          Beli produk segar, berkualitas, dan transparan langsung dari
          petaninya.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {marketplaceProducts.map((prod) => (
            <ProductCard key={prod.id} project={prod} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Marketplace;
