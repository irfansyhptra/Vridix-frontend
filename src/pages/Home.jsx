// src/pages/Home.jsx

import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Lottie from "lottie-react";

// Lottie animation data (simple farming animation)
const farmingAnimation = {
  v: "5.5.7",
  fr: 29.9700012207031,
  ip: 0,
  op: 90.0000036657751,
  w: 512,
  h: 512,
  nm: "Farming Animation",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Circle",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: {
          a: 1,
          k: [
            {
              i: { x: [0.833], y: [0.833] },
              o: { x: [0.167], y: [0.167] },
              t: 0,
              s: [0],
            },
            { t: 90.0000036657751, s: [360] },
          ],
        },
        p: { a: 0, k: [256, 256, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            {
              d: 1,
              ty: "el",
              s: { a: 0, k: [100, 100] },
              p: { a: 0, k: [0, 0] },
              nm: "Ellipse Path 1",
            },
            {
              ty: "fl",
              c: { a: 0, k: [0.2, 0.8, 0.2, 1] },
              o: { a: 0, k: 100 },
              r: 1,
              bm: 0,
              nm: "Fill 1",
            },
          ],
          nm: "Ellipse 1",
          bm: 0,
        },
      ],
      ip: 0,
      op: 90.0000036657751,
      st: 0,
      bm: 0,
    },
  ],
};

const FeatureCard = ({ title, description, linkTo, linkText, icon }) => {
  return (
    <div className="bg-gray-800 p-8 rounded-xl shadow-lg transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-2xl font-bold mb-4 text-green-400">{title}</h3>
      <p className="text-gray-400 mb-6 h-24">{description}</p>
      <Link
        to={linkTo}
        className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
      >
        {linkText}
      </Link>
    </div>
  );
};

const Home = () => {
  const { user, connectWallet } = useAuth();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-green-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-6xl lg:text-7xl font-extrabold mb-4 leading-tight">
                <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  VRIDIX
                </span>
              </h1>
              <h2 className="text-2xl lg:text-3xl font-semibold mb-6 text-gray-300">
                Platform Blockchain untuk Pertanian Berkelanjutan
              </h2>
              <p className="text-lg text-gray-400 mb-8 max-w-2xl">
                Bergabunglah dengan revolusi pertanian digital. Dukung petani
                lokal, investasi pada proyek berkelanjutan, dan nikmati produk
                segar dengan jaminan ketertelusuran yang transparan melalui
                teknologi blockchain.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                {!user ? (
                  <>
                    <button
                      onClick={connectWallet}
                      className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      🔗 Connect Wallet
                    </button>
                    <Link
                      to="/marketplace"
                      className="border-2 border-green-600 text-green-400 hover:bg-green-600 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                    >
                      Jelajahi Marketplace
                    </Link>
                  </>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      to="/dashboard"
                      className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      Ke Dashboard
                    </Link>
                    {user.role !== "Petani" && (
                      <Link
                        to="/register-farmer"
                        className="bg-gradient-to-r from-orange-600 to-orange-700 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-orange-700 hover:to-orange-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
                      >
                        🌾 Daftar Sebagai Petani
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right Animation */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-96 h-96 relative">
                <Lottie
                  animationData={farmingAnimation}
                  loop={true}
                  className="w-full h-full"
                />
                {/* Floating elements */}
                <div className="absolute top-10 left-10 bg-green-100 dark:bg-green-800 p-3 rounded-full shadow-lg animate-pulse">
                  🌱
                </div>
                <div
                  className="absolute top-20 right-10 bg-blue-100 dark:bg-blue-800 p-3 rounded-full shadow-lg animate-pulse"
                  style={{ animationDelay: "1s" }}
                >
                  💧
                </div>
                <div
                  className="absolute bottom-20 left-5 bg-yellow-100 dark:bg-yellow-800 p-3 rounded-full shadow-lg animate-pulse"
                  style={{ animationDelay: "2s" }}
                >
                  ☀️
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-white">
              Fitur Platform Kami
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Teknologi blockchain yang mengubah cara kita berinteraksi dengan
              pertanian
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon="🌱"
              title="Crowdfunding Pertanian"
              description="Dukung petani lokal dengan berinvestasi pada proyek pertanian berkelanjutan dan dapatkan hasil panen langsung."
              linkTo="/crowdfunding"
              linkText="Lihat Proyek"
            />
            <FeatureCard
              icon="🛒"
              title="Marketplace Hasil Panen"
              description="Beli produk segar langsung dari petani dengan jaminan kualitas dan ketertelusuran yang transparan."
              linkTo="/marketplace"
              linkText="Belanja Sekarang"
            />
            <FeatureCard
              icon="🔍"
              title="Traceability Produk"
              description="Lacak perjalanan produk dari lahan hingga meja Anda dengan teknologi blockchain yang aman."
              linkTo="/traceability"
              linkText="Lacak Produk"
            />
            <FeatureCard
              icon="🌾"
              title="Bergabung Sebagai Petani"
              description="Daftarkan diri Anda sebagai petani dan mulai menjual hasil panen serta mengajukan proposal crowdfunding."
              linkTo="/register-farmer"
              linkText="Daftar Petani"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="bg-gray-800 rounded-2xl shadow-xl p-12">
            <h2 className="text-4xl font-bold text-center mb-12 text-white">
              Dampak Platform Kami
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div className="group">
                <div className="text-5xl font-bold text-green-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  25+
                </div>
                <div className="text-gray-400 text-lg">Petani Terdaftar</div>
              </div>
              <div className="group">
                <div className="text-5xl font-bold text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  ₹15M+
                </div>
                <div className="text-gray-400 text-lg">Dana Terkumpul</div>
              </div>
              <div className="group">
                <div className="text-5xl font-bold text-purple-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  100+
                </div>
                <div className="text-gray-400 text-lg">Produk Tersedia</div>
              </div>
              <div className="group">
                <div className="text-5xl font-bold text-orange-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  500+
                </div>
                <div className="text-gray-400 text-lg">Transaksi Sukses</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Siap Bergabung dengan Revolusi Pertanian?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Mulai perjalanan Anda sebagai bagian dari ekosistem pertanian
            berkelanjutan
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {!user ? (
              <button
                onClick={connectWallet}
                className="bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Mulai Sekarang
              </button>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className="bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Ke Dashboard
                </Link>
                {user.role !== "Petani" && (
                  <Link
                    to="/register-farmer"
                    className="bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg border-2 border-white"
                  >
                    🌾 Daftar Sebagai Petani
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
