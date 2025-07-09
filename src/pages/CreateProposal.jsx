// src/pages/CreateProposal.jsx
import React from "react";
import Button from "../components/common/Button";
import Card from "../components/common/Card";

const CreateProposal = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Buat Proposal Crowdfunding Baru
      </h1>
      <Card className="max-w-4xl mx-auto p-8 bg-white">
        <form className="space-y-6">
          <div>
            <label
              htmlFor="namaProyek"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Nama Proyek
            </label>
            <input
              type="text"
              name="namaProyek"
              id="namaProyek"
              className="w-full px-4 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label
              htmlFor="deskripsi"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Deskripsi Lengkap Proyek
            </label>
            <textarea
              name="deskripsi"
              id="deskripsi"
              rows="5"
              className="w-full px-4 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
            ></textarea>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="targetDana"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Target Pendanaan (Rp)
              </label>
              <input
                type="number"
                name="targetDana"
                id="targetDana"
                className="w-full px-4 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label
                htmlFor="imbalHasil"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Skema Imbal Hasil
              </label>
              <input
                type="text"
                name="imbalHasil"
                id="imbalHasil"
                placeholder="Contoh: 15% per panen atau Bagi Hasil 60/40"
                className="w-full px-4 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
          <div className="text-center pt-6">
            <Button type="submit">Ajukan Proposal</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateProposal;
