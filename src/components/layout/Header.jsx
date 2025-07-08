// src/components/layout/Header.jsx
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { user, login, logout, walletError } = useAuth();

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
          {user && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `transition-colors ${
                  isActive
                    ? "text-green-400"
                    : "text-gray-300 hover:text-green-400"
                }`
              }
            >
              Dasbor
            </NavLink>
          )}
        </nav>

        {/* Tombol Wallet & Auth */}
        <div>
          {user ? (
            <div className="flex items-center space-x-3">
              <span className="bg-gray-800 text-green-400 px-4 py-2 rounded-lg text-sm font-mono">
                {truncateAddress(user.walletAddress)}
              </span>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
              >
                Keluar
              </button>
            </div>
          ) : (
            <button
              onClick={login}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              Hubungkan Wallet
            </button>
          )}
          {walletError && (
            <p className="text-red-500 text-xs mt-1">{walletError}</p>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
