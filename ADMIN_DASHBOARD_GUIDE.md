# Admin Dashboard - Vridix

## Overview

Halaman admin khusus untuk mengelola platform Vridix dengan akses terbatas hanya untuk role "Admin".

## Akses Admin

### Login Admin

- **URL**: `http://localhost:5174/admin-login`
- **Credentials**:
  - Username: `admin`
  - Password: `admin123`

### URL Admin Dashboard

- **URL**: `http://localhost:5174/admin`
- **Proteksi**: Hanya bisa diakses oleh user dengan role "Admin"

## Fitur Admin Dashboard

### 1. Validasi Pendaftaran Petani

- **Tab**: "Validasi Petani" 🌾
- **Fitur**:
  - Melihat list petani yang menunggu validasi
  - Detail data petani (nama, NIK, alamat, jenis usaha)
  - Dokumen pendukung (KTP, sertifikat lahan)
  - Tombol **Approve** ✅ dan **Reject** ❌
  - Modal detail untuk melihat informasi lengkap
  - Preview dan download dokumen

### 2. Monitoring Transaksi Crowdfunding

- **Tab**: "Transaksi" 💳
- **Fitur**:
  - Tabel transaksi lengkap (ID, tipe, user, detail, jumlah, status, tanggal)
  - Status badge untuk setiap transaksi (completed, pending, processing)
  - Format currency yang proper
  - Total volume transaksi dalam statistik

### 3. Manajemen Saldo Fiat User

- **Tab**: "Saldo User" 💰
- **Fitur**:
  - List semua user dengan saldo fiat dan crypto
  - Total investasi per user
  - Tombol **Update Saldo** untuk mengubah saldo fiat
  - Tombol **Lihat Riwayat** untuk tracking aktivitas
  - Format currency yang proper

### 4. Log Aktivitas Sistem

- **Tab**: "Log Aktivitas" 📋
- **Fitur**:
  - Timeline aktivitas sistem real-time
  - Level badge (info, success, warning, error)
  - Detail aksi dan user yang melakukan
  - Timestamp yang akurat
  - Auto-update saat ada aksi admin

## Dashboard Statistics

Dashboard menampilkan 4 kartu statistik utama:

1. **Petani Menunggu** - Jumlah petani yang pending validasi
2. **Transaksi Selesai** - Total transaksi yang completed
3. **Total User** - Jumlah user terdaftar
4. **Total Volume** - Total volume transaksi dalam Rupiah

## Navigasi & UI

### Header

- Tombol "Admin Login" tersedia di header untuk akses cepat
- Tombol berubah menjadi "Admin" jika user sudah login tapi bukan admin
- Admin yang sudah login memiliki akses "Admin Panel" di navigasi

### Tab Navigation

- UI tab yang intuitif dengan icon dan label jelas
- Active state yang jelas untuk navigasi
- Responsive design untuk mobile dan desktop

### Aksi Admin

- Semua aksi admin memberikan feedback toast
- Konfirmasi untuk aksi kritis
- Auto-update log aktivitas sistem
- Loading state untuk semua aksi

## Proteksi Akses

### Route Protection

- Route `/admin` dilindungi oleh `ProtectedRoute` dengan `allowedRoles={["Admin"]}`
- User non-admin akan diredirect dengan pesan error
- Fallback UI jika user bukan admin

### Error Handling

- Error boundary untuk global error handling
- Fallback UI yang informatif
- Toast notifications untuk feedback

## Mock Data

### Petani Pending

- Budi Santoso (Pertanian Padi, Bogor)
- Siti Nurhaliza (Hortikultura, Purwokerto)
- Ahmad Fauzi (Singkong & Ubi, Yogyakarta)

### Transaksi

- Investment crowdfunding
- Purchase marketplace
- Withdrawal dan top-up

### User Balances

- John Doe, Jane Smith, Bob Wilson
- Dengan saldo fiat, crypto, dan total investasi

### System Logs

- User registration, transaction failures
- Farmer approvals, balance updates
- Project creations dengan timestamp

## Teknologi

### Frontend

- React.js dengan hooks
- Tailwind CSS untuk styling
- React Router untuk routing
- Context API untuk state management

### Komponen

- Card dan Button components yang reusable
- ErrorBoundary untuk error handling
- ProtectedRoute untuk akses control
- Toast notifications dengan react-toastify

## Testing Flow

1. Buka `http://localhost:5174`
2. Klik "Admin Login" di header
3. Login dengan admin/admin123
4. Akan diredirect ke `/admin`
5. Test semua tab dan fitur:
   - Approve/reject petani
   - Lihat detail transaksi
   - Update saldo user
   - Monitor log aktivitas

## Security Notes

- Demo menggunakan hard-coded credentials
- Dalam production, implementasikan:
  - JWT authentication
  - Role-based access control
  - API endpoint protection
  - Session management
  - Audit logging

## Future Enhancements

1. **Real Database Integration**

   - Connect dengan backend API
   - Real-time data synchronization

2. **Advanced Features**

   - Bulk actions untuk farmer approval
   - Export data functionality
   - Advanced filtering dan search
   - Data visualization charts

3. **Security Improvements**

   - Two-factor authentication
   - Session timeout
   - Activity monitoring
   - IP whitelist for admin access

4. **UI/UX Enhancements**
   - Dark/light mode toggle
   - Customizable dashboard
   - Drag & drop functionality
   - Advanced data tables
