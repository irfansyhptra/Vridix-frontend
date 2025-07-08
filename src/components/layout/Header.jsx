// src/components/layout/Header.jsx

import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useWallet } from "../../context/useWallet"; // Menggunakan path yang benar

const Header = () => {
  const { account, connectWallet, disconnectWallet, error } = useWallet();

  // Fungsi untuk memotong alamat wallet agar lebih pendek
  const truncateAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <header className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white">
          Vridi<span className="text-green-400">x</span>
        </Link>

        {/* Menu Navigasi */}
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition-colors ${
                isActive
                  ? "text-green-400"
                  : "text-gray-300 hover:text-green-400"
              }`
            }
          >
            Beranda
          </NavLink>
          <NavLink
            to="/crowdfunding"
            className={({ isActive }) =>
              `transition-colors ${
                isActive
                  ? "text-green-400"
                  : "text-gray-300 hover:text-green-400"
              }`
            }
          >
            Crowdfunding
          </NavLink>
          <NavLink
            to="/marketplace"
            className={({ isActive }) =>
              `transition-colors ${
                isActive
                  ? "text-green-400"
                  : "text-gray-300 hover:text-green-400"
              }`
            }
          >
            Marketplace
          </NavLink>
        </nav>

        {/* Tombol Wallet */}
        <div>
          {account ? (
            <div className="flex items-center space-x-3">
              <span className="bg-gray-800 text-green-400 px-4 py-2 rounded-lg text-sm font-mono">
                {truncateAddress(account)}
              </span>
              <button
                onClick={disconnectWallet}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
              >
                Putuskan
              </button>
            </div>
          ) : (
            <button
              onClick={connectWallet}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              Hubungkan Wallet
            </button>
          )}
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
      </div>
    </header>
  );
};

export default Header;
