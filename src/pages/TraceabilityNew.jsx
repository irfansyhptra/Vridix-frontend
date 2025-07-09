// src/pages/Traceability.jsx

import React, { useState } from "react";
import Card from "../components/common/Card";
import QRScanner from "../components/common/QRScanner";
import { mockData } from "../data/mockData";

const TimelineItem = ({ item, isLast }) => {
  return (
    <div className="flex">
      <div className="flex flex-col items-center mr-4">
        <div className="w-4 h-4 bg-green-600 rounded-full"></div>
        {!isLast && <div className="w-0.5 h-8 bg-green-600 mt-2"></div>}
      </div>
      <div className="pb-8">
        <div className="flex items-center mb-2">
          <h4 className="font-semibold text-gray-900 dark:text-white mr-2">
            {item.stage}
          </h4>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(item.date).toLocaleDateString("id-ID")}
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
          {item.description}
        </p>
        <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
          <div>📍 {item.location}</div>
          <div>🔗 Hash: {item.hash.substring(0, 20)}...</div>
        </div>
      </div>
    </div>
  );
};

const Traceability = () => {
  const [searchCode, setSearchCode] = useState("");
  const [traceData, setTraceData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (code = searchCode) => {
    if (!code.trim()) {
      setError("Silakan masukkan kode produk");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Simulasi pencarian data traceability
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const data = mockData.traceabilityData.find(
        (item) => item.qrCode === code.trim()
      );

      if (data) {
        setTraceData(data);
      } else {
        setError(
          "Kode produk tidak ditemukan. Pastikan kode yang dimasukkan benar."
        );
        setTraceData(null);
      }
    } catch (error) {
      console.error("Search error:", error);
      setError("Terjadi kesalahan saat mencari data. Silakan coba lagi.");
      setTraceData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleScanResult = (result) => {
    setSearchCode(result);
    setShowScanner(false);
    handleSearch(result);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Pelacakan Produk
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Lacak perjalanan produk pertanian dari lahan hingga meja Anda dengan
            teknologi blockchain
          </p>
        </div>

        {/* Search Section */}
        <Card className="mb-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Cari Produk
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Kode Produk atau QR Code
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={searchCode}
                  onChange={(e) => setSearchCode(e.target.value)}
                  placeholder="Contoh: VRDX-BERAS-001"
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowScanner(true)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  📱 Scan
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Mencari...
                </div>
              ) : (
                "🔍 Lacak Produk"
              )}
            </button>
          </form>

          {error && (
            <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
        </Card>

        {/* QR Scanner Modal */}
        {showScanner && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
              <QRScanner
                onScan={handleScanResult}
                onClose={() => setShowScanner(false)}
              />
            </div>
          </div>
        )}

        {/* Results Section */}
        {traceData && (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Product Info */}
            <Card>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/3">
                  <div className="w-full h-48 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-6xl">🌾</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {traceData.productName}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-semibold text-gray-700 dark:text-gray-300">
                        Petani:
                      </span>
                      <span className="ml-2 text-gray-900 dark:text-white">
                        {traceData.farmer}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700 dark:text-gray-300">
                        Lokasi Kebun:
                      </span>
                      <span className="ml-2 text-gray-900 dark:text-white">
                        {traceData.farmLocation}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700 dark:text-gray-300">
                        Tanggal Tanam:
                      </span>
                      <span className="ml-2 text-gray-900 dark:text-white">
                        {new Date(traceData.plantingDate).toLocaleDateString(
                          "id-ID"
                        )}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700 dark:text-gray-300">
                        Tanggal Panen:
                      </span>
                      <span className="ml-2 text-gray-900 dark:text-white">
                        {new Date(traceData.harvestDate).toLocaleDateString(
                          "id-ID"
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="mt-4">
                    <span className="font-semibold text-gray-700 dark:text-gray-300">
                      Sertifikasi:
                    </span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {traceData.certifications.map((cert, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200 rounded-full text-xs font-medium"
                        >
                          ✅ {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Timeline */}
            <Card>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Riwayat Perjalanan Produk
              </h3>
              <div className="space-y-4">
                {traceData.timeline.map((item, index) => (
                  <TimelineItem
                    key={index}
                    item={item}
                    isLast={index === traceData.timeline.length - 1}
                  />
                ))}
              </div>
            </Card>

            {/* Blockchain Verification */}
            <Card>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Verifikasi Blockchain
              </h3>
              <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    ✓
                  </div>
                  <span className="font-semibold text-green-800 dark:text-green-200">
                    Data Terverifikasi di Blockchain
                  </span>
                </div>
                <p className="text-sm text-green-700 dark:text-green-300 mb-3">
                  Semua data perjalanan produk ini telah direkam secara permanen
                  di blockchain dan tidak dapat diubah.
                </p>
                <div className="text-xs text-green-600 dark:text-green-400 space-y-1">
                  <div>🔗 Kode QR: {traceData.qrCode}</div>
                  <div>
                    ⏰ Terakhir Diperbarui:{" "}
                    {new Date().toLocaleDateString("id-ID")}
                  </div>
                  <div>🔒 Status: Terverifikasi</div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Sample QR Codes for Testing */}
        <Card className="mt-12 max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            Contoh Kode untuk Uji Coba
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <button
              onClick={() => {
                setSearchCode("VRDX-BERAS-001");
                handleSearch("VRDX-BERAS-001");
              }}
              className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 p-4 rounded-lg transition-colors"
            >
              <div className="text-2xl mb-2">🌾</div>
              <div className="text-sm font-medium">VRDX-BERAS-001</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Beras Organik
              </div>
            </button>
            <button
              onClick={() => {
                setSearchCode("VRDX-CABAI-001");
                handleSearch("VRDX-CABAI-001");
              }}
              className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 p-4 rounded-lg transition-colors"
            >
              <div className="text-2xl mb-2">🌶️</div>
              <div className="text-sm font-medium">VRDX-CABAI-001</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Cabai Rawit
              </div>
            </button>
            <button
              onClick={() => {
                setSearchCode("VRDX-JAGUNG-001");
                handleSearch("VRDX-JAGUNG-001");
              }}
              className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 p-4 rounded-lg transition-colors"
            >
              <div className="text-2xl mb-2">🌽</div>
              <div className="text-sm font-medium">VRDX-JAGUNG-001</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Jagung Manis
              </div>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Traceability;
