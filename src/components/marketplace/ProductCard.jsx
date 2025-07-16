// src/components/marketplace/ProductCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import Card from "../common/Card";

const ProductCard = ({ product, onBuyNow }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getRatingStars = (rating) => {
    if (!rating) return null;
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push("⭐");
    }
    if (hasHalfStar) {
      stars.push("⭐");
    }

    return (
      <div className="flex items-center text-sm">
        <span className="text-yellow-400">{stars.join("")}</span>
        <span className="text-gray-400 ml-1">({rating})</span>
      </div>
    );
  };

  const getUnit = () => {
    return product.unit || product.satuan || "unit";
  };

  const getQRCode = () => {
    return product.qrCode || product.traceabilityId || `VRDX-${product.id}`;
  };

  return (
    <Card className="flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white dark:bg-gray-800">
      {/* Product Image */}
      <div className="relative h-48 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800 dark:to-green-900 rounded-t-lg overflow-hidden">
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
              : product.foto || "/sawah.jpg"
          }
          alt={product.nama}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
        <div
          className="w-full h-full flex items-center justify-center text-6xl"
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

        {/* Stock Badge */}
        {product.stok && (
          <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
            Stok: {product.stok}
          </div>
        )}

        {/* Certification Badge */}
        {product.certification && (
          <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
            {product.certification}
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        {/* Product Info */}
        <div className="flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white line-clamp-2">
              {product.nama}
            </h3>
            {product.kategori && (
              <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded text-xs whitespace-nowrap ml-2">
                {product.kategori}
              </span>
            )}
          </div>

          <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-1">
            🌾 {product.petani}
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            📍 {product.lokasi}
          </p>

          {product.deskripsi && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
              {product.deskripsi}
            </p>
          )}

          {/* Rating and Sales */}
          <div className="flex justify-between items-center mb-3">
            {getRatingStars(product.rating)}
            {product.terjual && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Terjual: {product.terjual}
              </span>
            )}
          </div>

          {/* Harvest Date */}
          {product.harvest_date && (
            <p className="text-xs text-green-600 dark:text-green-400 mb-2">
              🗓️ Panen:{" "}
              {new Date(product.harvest_date).toLocaleDateString("id-ID")}
            </p>
          )}
        </div>

        {/* Price */}
        <div className="mb-4">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-gray-800 dark:text-white">
              {formatPrice(product.harga)}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              /{getUnit()}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <Button
            onClick={onBuyNow}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
            disabled={product.stok === 0}
          >
            {product.stok === 0 ? "Stok Habis" : "🛒 Beli Sekarang"}
          </Button>

          <div className="flex space-x-2">
            <Link
              to={`/traceability?id=${getQRCode()}`}
              className="flex-1 text-center bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              🔍 Lacak
            </Link>
            <Link
              to={`/marketplace/${product.id}`}
              className="flex-1 text-center bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              📖 Detail
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
