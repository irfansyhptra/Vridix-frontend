# Vridix Frontend - Flow Pendaftaran Petani

## Overview

Telah diimplementasikan sistem pendaftaran petani yang terintegrasi dengan routing dan dashboard dinamis.

## Flow Pendaftaran Petani

### 1. Entry Points - Button "Daftar Sebagai Petani"

- **Home Page**: Button muncul di hero section dan call-to-action jika user sudah login dan bukan petani
- **User Dashboard**: Card khusus dengan CTA untuk mendaftar sebagai petani
- **Header Navigation**: Link pendaftaran petani (opsional)

### 2. Halaman Pendaftaran (`/register-farmer`)

- Form lengkap dengan validasi:
  - Nama Lengkap
  - NIK
  - Alamat Lengkap
  - NPWP
  - Rekening Bank
  - Jenis Usaha Tani
  - Upload KTP
  - Upload Sertifikat Lahan

### 3. Setelah Submit Berhasil

- User role diupdate menjadi "Petani"
- Status verifikasi diset menjadi "menunggu"
- Data pendaftaran disimpan di localStorage dan context
- Redirect ke `/dashboard`

### 4. Dashboard Routing Berdasarkan Status

- **Jika role = "Petani" && statusVerifikasi = "menunggu"**:
  - Tampilkan `ApplicationStatus` (status pending verifikasi)
- **Jika role = "Petani" && statusVerifikasi = "terverifikasi"**:
  - Tampilkan `FarmerDashboard` (dashboard petani penuh)
- **Role lainnya**:
  - Tampilkan `UserDashboard` dengan opsi daftar petani

### 5. Halaman Status Aplikasi (`ApplicationStatus`)

- Menampilkan status "Menunggu Verifikasi"
- Info estimasi waktu verifikasi (2-3 hari kerja)
- Detail data yang telah disubmit
- Langkah-langkah selanjutnya

### 6. Verifikasi Admin (Simulasi)

- Admin dapat mengakses `/dashboard` dengan role "Admin"
- AdminDashboard memiliki tombol simulasi verifikasi
- Setelah diverifikasi, petani dapat mengakses FarmerDashboard penuh

## Komponen Terkait

### Context & State Management

- `AuthContext`: Mengelola user state dan update
- `updateUser()`: Method untuk update user data tanpa reload
- LocalStorage: Persist user data

### Pages

- `Home.jsx`: Entry points untuk pendaftaran
- `RegisterFarmer.jsx`: Form pendaftaran
- `Dashboard.jsx`: Router dashboard dinamis
- `ApplicationStatus.jsx`: Status pending verifikasi
- `AdminDashboard.jsx`: Panel admin dengan simulasi verifikasi

### Components

- `UserDashboard.jsx`: Dashboard user dengan CTA pendaftaran
- `FarmerDashboard.jsx`: Dashboard khusus petani terverifikasi
- `Button.jsx`, `Modal.jsx`: UI components

## Testing Flow

1. Login sebagai user (bukan petani)
2. Klik "Daftar Sebagai Petani" di Home atau Dashboard
3. Isi form pendaftaran lengkap
4. Submit → akan redirect ke Dashboard dengan status pending
5. Login sebagai Admin untuk simulasi verifikasi
6. Setelah verifikasi, petani dapat akses FarmerDashboard

## Features

- ✅ Multiple entry points untuk pendaftaran
- ✅ Form validasi lengkap
- ✅ State management tanpa reload
- ✅ Routing dinamis berdasarkan role dan status
- ✅ Status tracking yang informatif
- ✅ Simulasi verifikasi admin
- ✅ Responsive design
- ✅ Loading states dan error handling

## Mock Data

User roles yang tersedia dalam mockData:

- Investor/User: Dapat mendaftar sebagai petani
- Petani: Sudah terdaftar, bisa terverifikasi atau menunggu
- Admin: Dapat melakukan verifikasi

## Routes Terkait

- `/` - Home dengan CTA pendaftaran
- `/register-farmer` - Form pendaftaran petani
- `/dashboard` - Dashboard dinamis berdasarkan role
- `/admin` - Admin dashboard (jika diperlukan route khusus)
