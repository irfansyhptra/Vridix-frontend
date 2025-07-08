// src/pages/Home.jsx

import React from "react";
import Header from "../components/layout/Header";
import { Link } from "react-router-dom";

const FeatureCard = ({ title, description, linkTo, linkText }) => {
  return (
    <div className="bg-gray-800 p-8 rounded-xl shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
      <h3 className="text-2xl font-bold mb-4 text-green-400">{title}</h3>
      <p className="text-gray-400 mb-6 h-24">{description}</p>
      <Link
        to={linkTo}
        className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
      >
        {linkText}
      </Link>
    </div>
  );
};

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />

      {/* Hero Section */}
      <section className="text-center py-24 px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
          Merevolusi Pertanian dengan
          <br />
          <span className="text-green-400">Teknologi Blockchain</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
          Vridix adalah platform agrikultur terdesentralisasi yang menghubungkan
          Petani, Investor, dan Konsumen secara transparan dan adil.
        </p>
        <div className="space-x-4">
          <Link
            to="/crowdfunding"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
          >
            Mulai Investasi
          </Link>
          <Link
            to="/marketplace"
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
          >
            Jelajahi Pasar
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Ekosistem Pertanian Masa Depan
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            <FeatureCard
              title="Crowdfunding Berbasis Kinerja"
              description="Dukung petani secara langsung melalui pendanaan proyek yang aman dan akuntabel dengan smart contract."
              linkTo="/crowdfunding"
              linkText="Lihat Proyek"
            />
            <FeatureCard
              title="Marketplace Terdesentralisasi"
              description="Beli produk segar langsung dari petani dengan harga transparan, tanpa perantara yang tidak perlu."
              linkTo="/marketplace"
              linkText="Beli Sekarang"
            />
            <FeatureCard
              title="Ketertelusuran Penuh (Traceability)"
              description="Lacak perjalanan setiap produk dari benih hingga ke meja Anda. Verifikasi keaslian dan kualitas dengan mudah."
              linkTo="/marketplace"
              linkText="Lacak Produk"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
