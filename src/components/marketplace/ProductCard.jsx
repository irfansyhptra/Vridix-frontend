// src/components/marketplace/ProductCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import Card from "../common/Card";

const ProductCard = ({ product }) => {
  return (
    <Card className="flex flex-col justify-between transition-transform duration-300 hover:-translate-y-2">
      <div>
        <h3 className="text-2xl font-bold mb-2 text-blue-400">
          {product.nama}
        </h3>
        <p className="text-sm font-semibold text-gray-300 mb-2">
          Dari: {product.petani}
        </p>
        <p className="text-gray-400 mb-4">{product.lokasi}</p>
      </div>

      <div>
        <div className="my-4">
          <span className="text-3xl font-bold text-white">
            Rp {product.harga.toLocaleString()}
          </span>
          <span className="text-gray-400 ml-2">{product.satuan}</span>
        </div>

        <div className="flex justify-between items-center text-gray-300 border-t border-gray-700 pt-4 mt-4">
          <Link
            to={`/traceability?id=${product.traceabilityId}`}
            className="text-sm text-blue-400 hover:underline"
          >
            Lacak Produk Ini
          </Link>
          <Button variant="secondary">Beli Sekarang</Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
