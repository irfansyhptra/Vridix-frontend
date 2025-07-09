// src/pages/Marketplace.jsx

import React, { useState, useEffect } from "react";
import ProductCard from "../components/marketplace/ProductCard";
import { useAuth } from "../hooks/useAuth";
import { mockData } from "../data/mockData";

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const { showToast } = useAuth();

  // Categories untuk filter
  const categories = ["Semua", "Beras", "Sayuran", "Buah", "Kopi", "Rempah"];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simulasi delay loading untuk UX yang lebih baik
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Menggunakan data mock sebagai fallback jika API tidak tersedia
        const mockProducts = mockData.marketplaceProducts || [];

        if (mockProducts.length === 0) {
          throw new Error("Data produk tidak tersedia");
        }

        setProducts(mockProducts);
        showToast(`Berhasil memuat ${mockProducts.length} produk`, "success");
      } catch (error) {
        console.error("Gagal mengambil data produk:", error);
        setError(error.message);
        showToast("Gagal memuat produk. Menggunakan data offline.", "warning");

        // Fallback data jika mockData juga gagal
        const fallbackProducts = [
          {
            id: 1,
            nama: "Beras Organik Premium",
            petani: "Petani Inovatif",
            harga: 25000,
            unit: "kg",
            stok: 150,
            deskripsi:
              "Beras organik berkualitas tinggi, bebas pestisida dan pupuk kimia",
            kategori: "Beras",
            lokasi: "Bogor, Jawa Barat",
            qrCode: "VRDX-BERAS-001",
            rating: 4.8,
            terjual: 85,
            harvest_date: "2024-12-01",
            certification: "Organik Sertifikat",
          },
          {
            id: 2,
            nama: "Cabai Rawit Super",
            petani: "Kelompok Tani Maju Jaya",
            harga: 45000,
            unit: "kg",
            stok: 75,
            deskripsi: "Cabai rawit segar dengan tingkat kepedasan tinggi",
            kategori: "Sayuran",
            lokasi: "Aceh Besar, Aceh",
            qrCode: "VRDX-CABAI-001",
            rating: 4.6,
            terjual: 42,
            harvest_date: "2024-11-28",
            certification: "GAP Certified",
          },
        ];
        setProducts(fallbackProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [showToast]);

  const handleBuyNow = (productId) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      console.log(`Buying product ${productId}:`, product);
      showToast(
        `${product.nama} berhasil ditambahkan ke keranjang!`,
        "success"
      );
    }
  };

  const handleRetry = () => {
    setProducts([]);
    setError(null);
    // Re-run useEffect
    window.location.reload();
  };

  // Filter products based on search and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.petani.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.lokasi.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "Semua" || product.kategori === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            Marketplace
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Temukan produk pertanian segar dan terverifikasi langsung dari
            petani.
          </p>

          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Cari produk, petani, atau lokasi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-gray-500 bg-white dark:bg-gray-800 transition ease-in-out duration-150 cursor-not-allowed">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Memuat produk...
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md mx-auto">
              <div className="text-red-400 text-5xl mb-4">⚠️</div>
              <h3 className="text-lg font-semibold text-red-800 dark:text-red-400 mb-2">
                Gagal Memuat Produk
              </h3>
              <p className="text-red-600 dark:text-red-300 text-sm mb-4">
                {error}
              </p>
              <button
                onClick={handleRetry}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Coba Lagi
              </button>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <>
            {/* Results Info */}
            <div className="mb-6 text-center text-gray-600 dark:text-gray-400">
              Menampilkan {filteredProducts.length} dari {products.length}{" "}
              produk
              {searchTerm && <span> untuk "{searchTerm}"</span>}
              {selectedCategory !== "Semua" && (
                <span> dalam kategori {selectedCategory}</span>
              )}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  Produk Tidak Ditemukan
                </h3>
                <p className="text-gray-500 dark:text-gray-500 mb-4">
                  Coba ubah kata kunci pencarian atau filter kategori
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("Semua");
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Reset Filter
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onBuyNow={() => handleBuyNow(product.id)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
