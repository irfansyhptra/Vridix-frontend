// src/data/mockData.js

export const mockData = {
  users: [
    {
      walletAddress: "0xAbCd...1234",
      name: "Investor Visioner",
      role: "Investor",
      totalInvestasi: 7500000,
      proyekDidanai: 2,
      totalBelanja: 850000,
      fundedProjects: [
        { id: 1, name: "Kebun Cabai Organik di Aceh", amount: 2500000 },
        { id: 2, name: "Budidaya Padi Sawah Premium", amount: 5000000 },
      ],
    },
    {
      walletAddress: "0x5678...AbCd",
      name: "Petani Inovatif",
      role: "Petani",
      totalInvestasi: 0,
      proyekDidanai: 0,
      totalBelanja: 150000,
      fundedProjects: [],
    },
  ],
  crowdfundingProjects: [
    {
      id: 1,
      nama: "Kebun Cabai Organik di Aceh",
      petani: "Kelompok Tani Maju Jaya",
      deskripsi:
        "Pendanaan untuk budidaya cabai rawit organik seluas 2 hektar dengan metode pertanian berkelanjutan.",
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
        "Dibutuhkan modal untuk pembelian bibit unggul dan pupuk organik untuk meningkatkan hasil panen padi berkualitas.",
      target: 30000000,
      terkumpul: 28500000,
      imbal: "Bagi Hasil 60/40",
      lokasi: "Bireuen, Aceh",
      durasi: "4 Bulan",
    },
    {
      id: 3,
      nama: "Investasi Kebun Kopi Gayo",
      petani: "Koperasi Kopi Gayo Mandiri",
      deskripsi:
        "Ekspansi lahan dan pembelian mesin pengolahan baru untuk meningkatkan produksi kopi arabika Gayo kualitas ekspor.",
      target: 150000000,
      terkumpul: 95000000,
      imbal: "18% per Tahun",
      lokasi: "Takengon, Aceh Tengah",
      durasi: "24 Bulan",
    },
  ],
  marketplaceProducts: [
    {
      id: 1,
      nama: "Kopi Arabika Gayo (Biji Sangrai)",
      harga: 120000,
      satuan: "per 500g",
      petani: "Koperasi Kopi Gayo Mandiri",
      lokasi: "Takengon, Aceh Tengah",
      traceabilityId: "VRDX-Kopi-001",
    },
    {
      id: 2,
      nama: "Beras Organik Mentik Wangi",
      harga: 85000,
      satuan: "per 5kg",
      petani: "Bapak Suripto",
      lokasi: "Bireuen, Aceh",
      traceabilityId: "VRDX-Beras-015",
    },
    {
      id: 3,
      nama: "Cabai Rawit Merah Segar",
      harga: 45000,
      satuan: "per kg",
      petani: "Kelompok Tani Maju Jaya",
      lokasi: "Aceh Besar, Aceh",
      traceabilityId: "VRDX-Cabai-042",
    },
  ],
  orderHistory: [
    {
      id: "ORD-001",
      userWallet: "0xAbCd...1234",
      date: "2025-06-15",
      productName: "Telur Ayam Probiotik",
      total: 30000,
      status: "Selesai",
    },
    {
      id: "ORD-002",
      userWallet: "0xAbCd...1234",
      date: "2025-06-28",
      productName: "Selada Romain Hidroponik",
      total: 45000,
      status: "Dalam Pengiriman",
    },
  ],
  traceabilityData: {
    "VRDX-Kopi-001": {
      productName: "Kopi Arabika Gayo (Biji Sangrai)",
      farmer: "Koperasi Kopi Gayo Mandiri",
      timeline: [
        {
          status: "Penanaman Bibit",
          date: "2024-01-15",
          description:
            "Bibit kopi varietas Gayo 1 ditanam di lahan seluas 5 hektar.",
          txHash: "0xabc...123",
        },
        {
          status: "Perawatan & Pemupukan",
          date: "2024-03-20",
          description: "Pemberian pupuk organik kompos dan pemangkasan rutin.",
          txHash: "0xdef...456",
        },
        {
          status: "Panen",
          date: "2024-09-05",
          description:
            "Pemanenan ceri kopi merah matang secara selektif (petik merah).",
          txHash: "0xghi...789",
        },
        {
          status: "Pengolahan & Pengeringan",
          date: "2024-09-10",
          description:
            "Proses semi-washed dan pengeringan biji kopi di bawah sinar matahari.",
          txHash: "0xjkl...012",
        },
        {
          status: "Distribusi ke Konsumen",
          date: "2024-10-01",
          description:
            "Biji kopi yang telah disangrai dikemas dan siap didistribusikan.",
          txHash: "0xmno...345",
        },
      ],
    },
    // ... data untuk produk lain
  },
};
