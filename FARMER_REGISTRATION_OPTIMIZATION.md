# Flow Pendaftaran Petani - Optimasi

## Overview

Flow pendaftaran petani telah dioptimalkan untuk memberikan pengalaman yang seamless dari dashboard user sampai dengan verifikasi dan redirect ke dashboard petani.

## Flow Diagram

```
User Dashboard → Daftar Sebagai Petani → Form Register → Submit → ApplicationStatus → Dashboard Petani
```

## Komponen yang Terlibat

### 1. UserDashboard.jsx

- **Lokasi**: `src/components/dashboard/UserDashboard.jsx`
- **Fitur**: Section "Daftar Sebagai Petani" dengan tombol untuk redirect ke form register
- **Button**: Link ke `/register-farmer` dengan style CTA yang menarik

### 2. RegisterFarmer.jsx

- **Lokasi**: `src/pages/RegisterFarmer.jsx`
- **Fitur**: Form lengkap untuk pendaftaran petani dengan validasi
- **State Management**: Menggunakan `updateUser` dari AuthContext
- **Redirect**: Setelah submit berhasil → `/application-status`

### 3. ApplicationStatus.jsx

- **Lokasi**: `src/pages/ApplicationStatus.jsx`
- **Fitur**: Menampilkan status pending verifikasi
- **Auto Redirect**: Jika status sudah terverifikasi → dashboard petani

### 4. AdminDashboard.jsx

- **Lokasi**: `src/pages/AdminDashboard.jsx`
- **Fitur**: Test actions untuk simulasi verifikasi
- **Buttons**:
  - ✅ Verifikasi Sebagai Petani
  - ⏳ Jadi Petani Menunggu
  - 👤 Jadi Investor

## Perubahan Teknis

### AuthContext Optimization

- Menambahkan `updateUser` function untuk update state tanpa reload
- Menggunakan localStorage key `vridixUser` untuk konsistensi
- Menghapus dependensi pada apiService (menggunakan mock data)

### Form Validation

- Validasi real-time untuk semua field
- Upload simulasi file untuk dokumen
- Error handling yang informatif

### State Management

- User state update langsung melalui context
- Redirect otomatis berdasarkan status verifikasi
- Integrasi dengan mock data untuk testing

## Cara Testing Flow

1. **Start sebagai User**:

   - Buka `/dashboard` sebagai user biasa
   - Klik "Daftar Sebagai Petani"

2. **Isi Form Register**:

   - Lengkapi semua field required
   - Upload file dokumen (simulasi)
   - Submit form

3. **Status Pending**:

   - Redirect otomatis ke `/application-status`
   - Lihat status "menunggu verifikasi"

4. **Admin Approval**:

   - Login sebagai Admin
   - Buka `/dashboard` (akan redirect ke AdminDashboard)
   - Klik "Tampilkan Test Actions"
   - Klik "✅ Verifikasi Sebagai Petani"

5. **Dashboard Petani**:
   - User akan otomatis terupdate menjadi petani terverifikasi
   - Dashboard akan menampilkan dashboard petani

## Error Fixes

- ✅ Fixed `updateUser` not used error in AdminDashboard
- ✅ Removed axios dependency (AxiosError fix)
- ✅ Added proper error handling in form validation
- ✅ Optimized context state management

## Future Enhancements

- Real API integration
- File upload to cloud storage
- Email notification system
- Multi-step form dengan progress indicator
