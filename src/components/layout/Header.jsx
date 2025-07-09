// src/components/layout/Header.jsx
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../common/Button";

const Header = () => {
  const { user, login, logout, walletAddress } = useAuth();

  const truncateAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <header className="bg-gray-800/80 backdrop-blur-sm sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white">
          Vridi<span className="text-green-400">x</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-gray-300">
          <NavLink
            to="/crowdfunding"
            className={({ isActive }) =>
              `hover:text-green-400 ${isActive && "text-green-400"}`
            }
          >
            Crowdfunding
          </NavLink>
          <NavLink
            to="/marketplace"
            className={({ isActive }) =>
              `hover:text-green-400 ${isActive && "text-green-400"}`
            }
          >
            Marketplace
          </NavLink>
          {user && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `hover:text-green-400 ${isActive && "text-green-400"}`
              }
            >
              Dashboard
            </NavLink>
          )}
          {user && (user.role === "Investor" || user.role === "User") && (
            <NavLink
              to="/top-up"
              className={({ isActive }) =>
                `hover:text-green-400 ${isActive && "text-green-400"}`
              }
            >
              Top Up
            </NavLink>
          )}
          {user && user.role === "Admin" && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `hover:text-green-400 ${isActive && "text-green-400"}`
              }
            >
              Admin Panel
            </NavLink>
          )}
        </nav>

        <div>
          {user ? (
            <div className="flex items-center space-x-3">
              <span className="bg-gray-700 text-green-400 px-4 py-2 rounded-lg text-sm font-mono">
                {truncateAddress(user.walletAddress || walletAddress)}
              </span>
              <Button
                onClick={logout}
                variant="danger"
                className="py-2 px-4 text-sm"
              >
                Keluar
              </Button>
            </div>
          ) : (
            <Button onClick={login}>Hubungkan Wallet</Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
