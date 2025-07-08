// src/components/layout/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useWallet } from "../../hooks/useWallet";

const Header = () => {
  const { account, connectWallet, disconnectWallet } = useWallet();

  return (
    <header className="bg-gray-800/50 backdrop-blur-sm sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white">
          Vridix
        </Link>
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/marketplace" className="text-gray-300 hover:text-white">
            Marketplace
          </Link>
          <Link to="/crowdfunding" className="text-gray-300 hover:text-white">
            Crowdfunding
          </Link>
          <Link to="/traceability" className="text-gray-300 hover:text-white">
            Lacak Produk
          </Link>
        </div>
        {account ? (
          <div className="flex items-center space-x-4">
            <span className="text-sm bg-gray-700 px-3 py-1 rounded-full">{`${account.substring(
              0,
              6
            )}...${account.substring(account.length - 4)}`}</span>
            <button
              onClick={disconnectWallet}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <button
            onClick={connectWallet}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            Connect Wallet
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
