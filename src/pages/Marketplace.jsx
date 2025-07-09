// src/pages/Marketplace.jsx

import React, { useState, useEffect } from "react";
import ProductCard from "../components/marketplace/ProductCard";
import { useAuth } from "../context/AuthContext"; // PERBAIKAN: Impor useAuth, bukan AuthContext
import { apiService } from "../services/apiService";

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useAuth(); // PERBAIKAN: Gunakan useAuth() untuk mendapatkan value dari context

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await apiService.getProducts();
        setProducts(response.data);
      } catch (error) {
        console.error("Gagal mengambil data produk:", error);
        showToast("Gagal memuat produk.", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
    // Menambahkan showToast sebagai dependency jika ingin menghilangkan warning lint,
    // namun dalam kasus ini tidak wajib karena fungsinya stabil.
  }, [showToast]);

  const handleBuyNow = (productId) => {
    console.log(`Buying product ${productId}`);
    // TODO: Implement purchase logic via apiService
    showToast(
      `Produk berhasil ditambahkan ke keranjang (simulasi).`,
      "success"
    );
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
        Marketplace
      </h1>
      <p className="text-center text-gray-500 mb-12">
        Temukan produk pertanian segar dan terverifikasi langsung dari petani.
      </p>

      {loading ? (
        <p className="text-center">Memuat produk...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onBuyNow={() => handleBuyNow(product.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Marketplace;
