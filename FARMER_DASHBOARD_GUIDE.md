# Farmer Dashboard - Vridix Platform

## Overview

Dashboard khusus untuk petani yang sudah terverifikasi dengan akses lengkap untuk mengelola proyek crowdfunding, milestone, dan pencairan dana.

## Akses Farmer Dashboard

### URL

- **URL**: `http://localhost:5174/farmer`
- **Proteksi**: Hanya bisa diakses oleh user dengan role "Petani" yang sudah terverifikasi

### Cara Akses

1. Login dengan akun petani yang sudah terverifikasi
2. Klik "🌾 Dashboard Petani" di header navigasi
3. Atau akses langsung `/farmer` (akan diredirect jika belum login/terverifikasi)

## Data Dummy Petani Terverifikasi

### Petani 1: Petani Inovatif

- **Email**: petani@vridix.com
- **Wallet**: 0xPetaniWalletAddress...5678
- **Status**: Terverifikasi ✅
- **Saldo**: Rp 2,500,000
- **Proyek**: Budidaya Padi Sawah Premium (Progress 65%)

### Petani 2: Sari Wulandari

- **Email**: sari@vridix.com
- **Wallet**: 0xPetaniHortikultura...9999
- **Status**: Terverifikasi ✅
- **Saldo**: Rp 1,200,000
- **Proyek**: Greenhouse Tomat Premium (Progress 40%)

## Fitur Dashboard Petani

### 1. **Dashboard Overview** 🏠

- **Statistik Utama**:
  - Total Proyek
  - Proyek Aktif
  - Dana Terkumpul
  - Pencairan Pending
- **Proyek Terbaru**: Quick overview proyek dengan progress
- **Aksi Cepat**: Button untuk buat proposal, lihat proyek, ajukan pencairan

### 2. **Proyek Saya** 🌾

- **List Semua Proyek**: Dengan status badge (active/completed/pending)
- **Progress Bar**: Visual progress pendanaan real-time
- **Detail Proyek**:
  - ROI target
  - Jumlah investor
  - Target panen
  - Sisa dana
- **Aksi Proyek**:
  - 📋 **Lihat Milestone**: Detail progress setiap tahap
  - 💰 **Ajukan Pencairan**: Untuk milestone yang aktif

### 3. **Pencairan Dana** 💰

- **Riwayat Pencairan**: List semua pengajuan dengan status
- **Status Tracking**: Pending/Processing/Completed dengan timeline
- **Estimasi Waktu**: Informasi waktu pemrosesan pencairan
- **Auto-notification**: Toast feedback untuk setiap pengajuan

### 4. **Proposal Baru** ➕

Form lengkap untuk membuat proposal crowdfunding baru:

#### **Basic Information**

- **Judul Proyek**: Nama proyek yang menarik
- **Jenis Usaha**: Dropdown (Pertanian Padi, Hortikultura, Perkebunan, Peternakan)
- **Target Dana**: Input dalam Rupiah
- **Durasi**: Estimasi waktu proyek (bulan)
- **ROI Target**: Return on Investment yang dijanjikan (%)
- **Deskripsi**: Detail lengkap proyek

#### **RAB Auto-Generated**

- **Smart Template**: Otomatis generate milestone berdasarkan jenis usaha
- **Percentage Calculation**: Pembagian dana proporsional per milestone
- **Bukti Required**: Auto-assign jenis bukti yang dibutuhkan per tahap

#### **Upload Documents**

- **IPFS Integration**: Simulasi upload dokumen ke IPFS
- **Multi-format Support**: PDF, JPG, PNG, DOC
- **File Size Limit**: Max 10MB per file

#### **Blockchain Integration**

- **Smart Contract**: Hash proposal disimpan ke blockchain
- **IPFS Hash**: Dokumen disimpan terdesentralisasi
- **Immutable Record**: Proposal tidak bisa diubah setelah submit

## Sistem Milestone Terstruktur

### Template RAB untuk Pertanian Padi:

1. **Persiapan Lahan**

   - Pembersihan lahan (Rp 5,000/m²)
   - Pengolahan tanah (Rp 8,000/m²)
   - Pembuatan bedengan (Rp 3,000/m²)
   - **Bukti**: foto, geolocation

2. **Pembelian Benih**

   - Benih padi premium (Rp 15,000/kg)
   - Biaya transportasi (Rp 50,000/trip)
   - **Bukti**: receipt, photo

3. **Penanaman**

   - Biaya tanam (Rp 2,000/m²)
   - Upah tenaga kerja (Rp 100,000/hari)
   - **Bukti**: video, geolocation, timelapses

4. **Pemupukan dan Perawatan**

   - Pupuk organik (Rp 85,000/karung)
   - Pestisida nabati (Rp 45,000/liter)
   - Upah aplikasi (Rp 75,000/kali)
   - **Bukti**: receipt, photo, video

5. **Panen dan Pasca Panen**
   - Biaya panen (Rp 3,000/m²)
   - Pengolahan hasil (Rp 1,500/kg)
   - Packaging (Rp 5,000/unit)
   - **Bukti**: photo, video, weight_certificate

### Template RAB untuk Hortikultura:

1. **Pembangunan Greenhouse**

   - Rangka greenhouse, plastik UV, upah konstruksi
   - **Bukti**: photo, video, receipt

2. **Instalasi Sistem Irigasi**

   - Pompa air, pipa dan fitting, timer otomatis
   - **Bukti**: photo, video, receipt

3. **Persiapan Media Tanam**
   - Polybag, media tanam, pupuk dasar
   - **Bukti**: receipt, photo

## Sistem Bukti dan Verifikasi

### Jenis Bukti Required:

- 📷 **Photo**: Dokumentasi visual progress
- 🎥 **Video**: Video proses kerja
- 🧾 **Receipt**: Struk pembelian bahan/alat
- 📍 **Geolocation**: Koordinat lokasi GPS
- ⏰ **Timelapses**: Video time-lapse proses
- ⚖️ **Weight Certificate**: Sertifikat berat hasil panen

### Status Milestone:

- ⏳ **Pending**: Belum dimulai
- 🔄 **In Progress**: Sedang dikerjakan, bisa ajukan pencairan
- ✅ **Completed**: Selesai dengan bukti terverifikasi

## Auto-Reminder System (Future Enhancement)

### Checklist Otomatis:

- Reminder untuk upload bukti setiap milestone
- Notifikasi deadline milestone
- Auto-update progress berdasarkan bukti
- Smart contract trigger untuk pencairan otomatis

### Geo-Validation:

- Validasi lokasi dengan GPS coordinates
- Timestamp validation untuk bukti
- Weather data integration untuk validasi kondisi

## Smart Contract Integration

### On-Chain Data:

- Proposal hash dan metadata
- Milestone progress dan status
- Pencairan dana dengan approval
- Investor tracking dan ROI calculation

### IPFS Storage:

- Dokumen proposal lengkap
- Bukti milestone (foto, video, dokumen)
- Immutable content addressing
- Distributed file storage

## Security & Validation

### Access Control:

- Role-based access (hanya Petani terverifikasi)
- Wallet address validation
- Project ownership verification

### Data Integrity:

- Blockchain-based proposal storage
- IPFS content validation
- Timestamp verification untuk bukti

## Testing Flow

1. **Login sebagai Petani**:

   - Gunakan akun dengan role "Petani"
   - Pastikan statusVerifikasi = "approved"

2. **Test Dashboard**:

   - Lihat statistik dan overview
   - Check proyek aktif dan progress

3. **Test Milestone**:

   - Klik "Lihat Milestone" pada proyek
   - Review status dan bukti
   - Test ajukan pencairan untuk milestone aktif

4. **Test Proposal Baru**:

   - Fill form proposal lengkap
   - Lihat auto-generated RAB
   - Submit dan check blockchain hash

5. **Test Pencairan**:
   - Ajukan pencairan dari milestone aktif
   - Check status di tab "Pencairan Dana"
   - Verify toast notifications

## Future Enhancements

### 1. **Real Backend Integration**

- API integration untuk CRUD operations
- Real IPFS upload functionality
- Actual smart contract deployment

### 2. **Advanced Milestone Tracking**

- IoT sensor integration
- Satellite imagery validation
- Weather data correlation

### 3. **Enhanced UI/UX**

- Photo/video upload dengan preview
- Drag & drop file management
- Real-time progress updates

### 4. **Analytics & Reporting**

- Performance dashboard
- ROI analysis dan projection
- Investor communication tools

Sistem Farmer Dashboard ini memberikan petani kontrol penuh atas proyek crowdfunding mereka dengan transparansi tinggi dan sistem bukti yang terstruktur! 🚀
