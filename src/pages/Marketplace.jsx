// src/pages/Marketplace.jsx
import React, { useState, useEffect } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ProductCard from "../components/marketplace/ProductCard";
import { localStorageService } from "../services/localStorageService";

const Marketplace = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(localStorageService.getProducts());
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header />
      <main className="container mx-auto px-6 py-12 flex-grow">
        <h1 className="text-4xl font-bold mb-2 text-center text-white">
          Marketplace Hasil Tani
        </h1>
        <p className="text-center text-gray-400 mb-10">
          Beli produk segar, berkualitas, dan transparan langsung dari
          petaninya.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Marketplace;
