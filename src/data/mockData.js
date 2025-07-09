// src/data/mockData.js

export const mockData = {
  users: [
    {
      walletAddress: "0xInvestorWalletAddress...1234",
      name: "Investor Visioner",
      role: "Investor", // Peran sebagai Investor
      totalInvestasi: 7500000,
      proyekDidanai: 2,
      totalBelanja: 850000,
      fundedProjects: [
        { id: 1, name: "Kebun Cabai Organik di Aceh", amount: 2500000 },
        { id: 2, name: "Budidaya Padi Sawah Premium", amount: 5000000 },
      ],
    },
    {
      walletAddress: "0xPetaniWalletAddress...5678",
      name: "Petani Inovatif",
      role: "Petani", // Peran sebagai Petani
      statusVerifikasi: "terverifikasi", // Status petani
      totalInvestasi: 0,
      proyekDidanai: 0,
      totalBelanja: 150000,
      fundedProjects: [],
      proposals: [
        { id: 2, name: "Budidaya Padi Sawah Premium", status: "Didanai" },
      ],
    },
    {
      walletAddress: "0xAdminWalletAddress...9012",
      name: "Admin Utama",
      role: "Admin", // Peran sebagai Admin
      totalInvestasi: 0,
      proyekDidanai: 0,
      totalBelanja: 0,
    },
    {
      walletAddress: "0xPetaniBaruWalletAddress...3456",
      name: "Petani Baru Menunggu",
      role: "User", // Role awal sebelum verifikasi
      statusVerifikasi: "menunggu", // Status petani
      totalInvestasi: 0,
      proyekDidanai: 0,
      totalBelanja: 0,
    },
  ],
  crowdfundingProjects: [
    {
      id: 1,
      nama: "Kebun Cabai Organik di Aceh",
      petani: "Kelompok Tani Maju Jaya",
      deskripsi:
        "Pendanaan untuk budidaya cabai rawit organik seluas 2 hektar dengan metode pertanian berkelanjutan. Kami menggunakan pupuk kandang terfermentasi dan pestisida nabati untuk menjaga kualitas dan kesehatan tanah. Proyek ini diharapkan dapat meningkatkan pendapatan anggota kelompok tani sebesar 30%.",
      target: 50000000,
      terkumpul: 35000000,
      imbal: "15% per Panen",
      lokasi: "Aceh Besar, Aceh",
      durasi: "6 Bulan",
    },
    {
      id: 2,
      nama: "Budidaya Padi Sawah Premium",
      petani: "Bapak Suripto",
      deskripsi:
        "Dibutuhkan modal untuk pembelian bibit unggul dan pupuk organik untuk meningkatkan hasil panen padi berkualitas. Lahan sawah seluas 1 hektar ini memiliki potensi hasil hingga 8 ton gabah kering.",
      target: 30000000,
      terkumpul: 28500000,
      imbal: "Bagi Hasil 60/40",
      lokasi: "Bireuen, Aceh",
      durasi: "4 Bulan",
    },
    // ...proyek lain
  ],
  marketplaceProducts: [
    {
      id: 1,
      nama: "Kopi Arabika Gayo (Biji Sangrai)",
      harga: 120000,
      satuan: "per 500g",
      petani: "Koperasi Kopi Gayo Mandiri",
      lokasi: "Takengon, Aceh Tengah",
      deskripsi:
        "Biji kopi Arabika Gayo grade 1 yang disangrai dengan level medium, menghasilkan aroma floral dan rasa yang seimbang.",
      traceabilityId: "VRDX-Kopi-001",
    },
    {
      id: 2,
      nama: "Beras Organik Mentik Wangi",
      harga: 85000,
      satuan: "per 5kg",
      petani: "Bapak Suripto",
      lokasi: "Bireuen, Aceh",
      deskripsi:
        "Beras pulen dan wangi yang ditanam tanpa pestisida kimia, aman untuk konsumsi keluarga.",
      traceabilityId: "VRDX-Beras-015",
    },
    // ...produk lain
  ],
  // ...sisa mockData
};
