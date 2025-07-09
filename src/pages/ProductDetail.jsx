// src/pages/ProductDetail.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { mockData } from "../data/mockData";
import Button from "../components/common/Button";
import Card from "../components/common/Card";

const ProductDetail = () => {
  const { id } = useParams();
  const product = mockData.marketplaceProducts.find(
    (p) => p.id.toString() === id
  );

  if (!product) {
    return <div className="text-center py-20">Produk tidak ditemukan.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="bg-white shadow-xl">
        <div className="p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {product.nama}
          </h1>
          <p className="text-lg text-gray-500 mb-4">Dari: {product.petani}</p>
          <p className="text-md text-gray-600 mb-6">{product.lokasi}</p>
          <p className="text-gray-700 leading-relaxed mb-8">
            {product.deskripsi}
          </p>

          <div className="flex flex-col md:flex-row justify-between items-center bg-gray-100 p-6 rounded-lg">
            <div>
              <span className="text-4xl font-bold text-gray-800">
                Rp {product.harga.toLocaleString()}
              </span>
              <span className="text-gray-500 ml-2">{product.satuan}</span>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <Link
                to={`/traceability?id=${product.traceabilityId}`}
                className="text-blue-500 hover:underline font-semibold"
              >
                Lacak Keaslian
              </Link>
              <Button>Beli dengan Saldo</Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProductDetail;
