// src/pages/ProductDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { mockData } from "../data/mockData";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/common/Button";
import Card from "../components/common/Card";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, showToast } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = () => {
      try {
        setLoading(true);
        const foundProduct = mockData.marketplaceProducts.find(
          (p) => p.id.toString() === id
        );

        if (!foundProduct) {
          showToast("Produk tidak ditemukan", "error");
          navigate("/marketplace");
          return;
        }

        setProduct(foundProduct);
      } catch (error) {
        console.error("Error loading product:", error);
        showToast("Gagal memuat detail produk", "error");
        navigate("/marketplace");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate, showToast]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleBuyNow = () => {
    if (!user) {
      showToast("Silakan login terlebih dahulu", "warning");
      return;
    }

    const totalPrice = product.harga * quantity;
    showToast(
      `Berhasil membeli ${quantity} ${
        product.unit || product.satuan || "unit"
      } ${product.nama} seharga ${formatPrice(totalPrice)}`,
      "success"
    );
  };

  const handleAddToCart = () => {
    if (!user) {
      showToast("Silakan login terlebih dahulu", "warning");
      return;
    }

    showToast(`${product.nama} ditambahkan ke keranjang`, "success");
  };

  const getQRCode = () => {
    return product.qrCode || product.traceabilityId || `VRDX-${product.id}`;
  };

  const getUnit = () => {
    return product.unit || product.satuan || "unit";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Memuat detail produk...
          </p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <Card className="max-w-md">
          <div className="text-center p-6">
            <div className="text-gray-400 text-6xl mb-4">📦</div>
            <h2 className="text-xl font-bold mb-2">Produk Tidak Ditemukan</h2>
            <p className="text-gray-500 mb-4">
              Produk yang Anda cari tidak tersedia atau telah dihapus.
            </p>
            <Button onClick={() => navigate("/marketplace")} className="w-full">
              Kembali ke Marketplace
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <li>
              <Link to="/" className="hover:text-green-600">
                Beranda
              </Link>
            </li>
            <li>→</li>
            <li>
              <Link to="/marketplace" className="hover:text-green-600">
                Marketplace
              </Link>
            </li>
            <li>→</li>
            <li className="text-gray-700 dark:text-gray-300">{product.nama}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="space-y-4">
            <Card className="p-0 overflow-hidden">
              <div className="relative h-96">
                <img
                  src={
                    product.kategori === "Beras"
                      ? "/beras.jpeg"
                      : product.kategori === "Sayuran"
                      ? "/hidroponik_kebun_sayur.jpg"
                      : product.kategori === "Buah"
                      ? "/jagung.jpg"
                      : product.kategori === "Kopi"
                      ? "/kopi.jpg"
                      : product.kategori === "Cabai"
                      ? "/cabe.jpg"
                      : product.kategori === "Ayam"
                      ? "/ayam_organik.jpg"
                      : "/Mentik-Susu-Pack-min-scaled-1.jpg"
                  }
                  alt={product.nama}
                  className="w-full h-full object-cover"
                />
                <div
                  className="w-full h-full flex items-center justify-center text-8xl"
                  style={{ display: "none" }}
                >
                  {product.kategori === "Beras"
                    ? "🌾"
                    : product.kategori === "Sayuran"
                    ? "🥬"
                    : product.kategori === "Buah"
                    ? "🍎"
                    : product.kategori === "Kopi"
                    ? "☕"
                    : "🌱"}
                </div>

                {/* Badges */}
                {product.certification && (
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {product.certification}
                  </div>
                )}
                {product.stok && (
                  <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Stok: {product.stok}
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <Card>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                    {product.nama}
                  </h1>
                  {product.kategori && (
                    <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-sm">
                      {product.kategori}
                    </span>
                  )}
                </div>

                <div className="space-y-3 mb-6">
                  <p className="text-lg text-green-600 dark:text-green-400 font-medium">
                    🌾 {product.petani}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    📍 {product.lokasi}
                  </p>
                  {product.harvest_date && (
                    <p className="text-green-600 dark:text-green-400">
                      🗓️ Dipanen:{" "}
                      {new Date(product.harvest_date).toLocaleDateString(
                        "id-ID"
                      )}
                    </p>
                  )}
                </div>

                {/* Rating and Sales */}
                <div className="flex justify-between items-center mb-6">
                  {product.rating && (
                    <div className="flex items-center">
                      <span className="text-yellow-400">
                        {"⭐".repeat(Math.floor(product.rating))}
                      </span>
                      <span className="text-gray-500 ml-2">
                        ({product.rating})
                      </span>
                    </div>
                  )}
                  {product.terjual && (
                    <span className="text-gray-500 dark:text-gray-400">
                      Terjual: {product.terjual}
                    </span>
                  )}
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
                    Deskripsi Produk
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {product.deskripsi}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-3xl font-bold text-gray-800 dark:text-white">
                      {formatPrice(product.harga)}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      per {getUnit()}
                    </span>
                  </div>

                  {/* Quantity Selector */}
                  <div className="flex items-center space-x-3 mt-4">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Jumlah:
                    </label>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500"
                      >
                        -
                      </button>
                      <span className="w-12 text-center font-medium">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="mt-3 text-right">
                    <span className="text-lg font-semibold text-gray-800 dark:text-white">
                      Total: {formatPrice(product.harga * quantity)}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <Button
                    onClick={handleBuyNow}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
                    disabled={product.stok === 0}
                  >
                    {product.stok === 0 ? "Stok Habis" : "🛒 Beli Sekarang"}
                  </Button>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      onClick={handleAddToCart}
                      variant="outline"
                      className="w-full"
                    >
                      🛍️ Tambah ke Keranjang
                    </Button>
                    <Link
                      to={`/traceability?id=${getQRCode()}`}
                      className="flex items-center justify-center bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      🔍 Lacak Produk
                    </Link>
                  </div>
                </div>
              </div>
            </Card>

            {/* Farmer Info */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                  Informasi Petani
                </h3>
                <div className="space-y-2">
                  <p className="text-gray-600 dark:text-gray-300">
                    <span className="font-medium">Nama:</span> {product.petani}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    <span className="font-medium">Lokasi:</span>{" "}
                    {product.lokasi}
                  </p>
                  {product.certification && (
                    <p className="text-gray-600 dark:text-gray-300">
                      <span className="font-medium">Sertifikasi:</span>{" "}
                      {product.certification}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
