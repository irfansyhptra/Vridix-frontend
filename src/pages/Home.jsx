// src/pages/Home.jsx

import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/layout/Header";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="container mx-auto px-6 py-16 text-center flex flex-col items-center justify-center h-[calc(100vh-80px)]">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
          Revolusi Pertanian Dimulai di Sini
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Vridix adalah platform agrikultur terdesentralisasi yang dirancang
          untuk merevolusi ekosistem pertanian. Kami menghubungkan petani,
          konsumen, dan investor untuk menciptakan ekosistem yang adil,
          transparan, dan berkelanjutan. [cite: 15, 17, 20]
        </p>
        <div className="space-x-4">
          <Link
            to="/crowdfunding"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105"
          >
            Danai Petani
          </Link>
          <Link
            to="/marketplace"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105"
          >
            Jelajahi Marketplace
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
