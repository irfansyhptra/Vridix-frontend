// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/layout/Header";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Revolusi Pertanian Dimulai di Sini
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Vridix memberdayakan petani, memberikan transparansi bagi konsumen,
          dan menciptakan peluang investasi berdampak. Semua ditenagai oleh
          teknologi blockchain[cite: 17, 62].
        </p>
        <div className="space-x-4">
          <Link
            to="/crowdfunding"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg"
          >
            Danai Petani
          </Link>
          <Link
            to="/marketplace"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
          >
            Jelajahi Marketplace
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
