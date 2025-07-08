import React from "react";
import { Link, NavLink } from "react-router-dom";
import useWallet from "../../hooks/useWallet";

const Header = () => {
  const { wallet, connectWallet, disconnectWallet } = useWallet();

  const getButtonText = () => {
    if (wallet.address) {
      return `${wallet.address.substring(0, 6)}...${wallet.address.substring(
        wallet.address.length - 4
      )}`;
    }
    return "Connect Wallet";
  };

  const handleWalletAction = () => {
    if (wallet.address) {
      disconnectWallet();
    } else {
      connectWallet();
    }
  };

  return (
    <header className="bg-gray-800/50 backdrop-blur-sm sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          {/* GUNAKAN PATH ABSOLUT DARI FOLDER PUBLIC */}
          <img src="/logo.png" alt="Vridix Logo" className="h-10" />
          <span className="text-2xl font-bold text-white">Vridix</span>
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <NavLink
            to="/crowdfunding"
            className={({ isActive }) =>
              `text-lg hover:text-green-400 transition-colors ${
                isActive ? "text-green-400" : "text-gray-300"
              }`
            }
          >
            Crowdfunding
          </NavLink>
          <NavLink
            to="/marketplace"
            className={({ isActive }) =>
              `text-lg hover:text-blue-400 transition-colors ${
                isActive ? "text-blue-400" : "text-gray-300"
              }`
            }
          >
            Marketplace
          </NavLink>
          <NavLink
            to="/traceability"
            className={({ isActive }) =>
              `text-lg hover:text-yellow-400 transition-colors ${
                isActive ? "text-yellow-400" : "text-gray-300"
              }`
            }
          >
            Traceability
          </NavLink>
        </div>
        <button
          onClick={handleWalletAction}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          {getButtonText()}
        </button>
      </nav>
    </header>
  );
};

export default Header;
