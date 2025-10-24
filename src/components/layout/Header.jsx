// src/components/layout/Header.jsx
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Button from "../common/Button";

const Header = () => {
  const { user, logout, loading } = useAuth();

  // Loading state
  if (loading) {
    return (
      <header className="bg-gray-800/80 backdrop-blur-sm sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-white">
            Vridi<span className="text-green-400">x</span>
          </Link>
          <div className="text-white">Loading...</div>
        </div>
      </header>
    );
  }

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
          <NavLink
            to="/traceability"
            className={({ isActive }) =>
              `hover:text-green-400 ${isActive && "text-green-400"}`
            }
          >
            Traceability
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
          {user && user.role !== "Petani" && (
            <NavLink
              to="/register-farmer"
              className={({ isActive }) =>
                `hover:text-orange-400 text-orange-300 ${
                  isActive && "text-orange-400"
                }`
              }
            >
              🌾 Daftar Petani
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
          {user && (
            <NavLink
              to="/qris-payment"
              className={({ isActive }) =>
                `hover:text-green-400 ${isActive && "text-green-400"}`
              }
            >
              💳 QRIS Payment
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
          {user && user.role === "Petani" && (
            <NavLink
              to="/farmer"
              className={({ isActive }) =>
                `hover:text-green-400 ${isActive && "text-green-400"}`
              }
            >
              🌾 Dashboard Petani
            </NavLink>
          )}
        </nav>

        <div>
          {user ? (
            <div className="flex items-center space-x-3">
              <span className="bg-gray-700 text-green-400 px-4 py-2 rounded-lg text-sm">
                {user.name}
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
            <div className="flex items-center space-x-3">
              <NavLink to="/login">
                <Button variant="secondary" className="py-2 px-4 text-sm">
                  Login
                </Button>
              </NavLink>
              <NavLink to="/register">
                <Button className="py-2 px-4 text-sm">Daftar</Button>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
