// src/pages/TopUp.jsx
import React from "react";
import Button from "../components/common/Button";
import Card from "../components/common/Card";

const TopUp = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Top Up Saldo Fiat Digital
      </h1>
      <Card className="max-w-lg mx-auto p-8 bg-white text-gray-800">
        <div className="text-center mb-6">
          <p className="text-gray-500">Saldo Anda Saat Ini</p>
          <p className="text-4xl font-bold text-green-600">Rp 500.000</p>
        </div>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Jumlah Top Up
            </label>
            <input
              type="number"
              name="amount"
              id="amount"
              placeholder="Masukkan nominal, misal: 100000"
              className="w-full px-4 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div className="text-center pt-4">
            <Button type="button" className="w-full">
              Lanjutkan ke Pembayaran
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default TopUp;
