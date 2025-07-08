// src/components/layout/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-400 mt-20">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Vridix */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              Vridi<span className="text-green-400">x</span>
            </h3>
            <p>
              Merekayasa ulang fondasi ekonomi pertanian menuju masa depan yang
              lebih adil, transparan, dan berkelanjutan.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Tautan Cepat
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/crowdfunding" className="hover:text-green-400">
                  Crowdfunding
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="hover:text-green-400">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-green-400">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Terhubung Dengan Kami
            </h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white">
                Twitter
              </a>
              <a href="#" className="hover:text-white">
                Discord
              </a>
              <a href="#" className="hover:text-white">
                Telegram
              </a>
            </div>
          </div>
        </div>
        <div className="text-center mt-8 border-t border-gray-700 pt-6">
          <p>&copy; {new Date().getFullYear()} Vridix. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
