# 🔐 Akun Dummy untuk Login - Platform Vridix

## Daftar Akun Testing

Berikut adalah daftar akun dummy yang dapat digunakan untuk testing dan development platform Vridix:

---

## 1. 💼 **Investor Visioner**

**Role:** Investor  
**Email:** `investor@vridix.com`  
**Password:** `password123`

**Detail Akun:**

- NIK: 3201234567890001
- Saldo: Rp 15.000.000
- Total Investasi: Rp 7.500.000
- Proyek Didanai: 2
- Status: Aktif

**Fitur yang Dapat Diakses:**

- ✅ Dashboard Investor
- ✅ Crowdfunding (Invest ke proyek)
- ✅ Marketplace (Belanja produk)
- ✅ QRIS Payment
- ✅ Top Up Saldo
- ✅ Traceability
- ✅ Riwayat Investasi

---

## 2. 🌾 **Petani Inovatif**

**Role:** Petani (Terverifikasi)  
**Email:** `petani@vridix.com`  
**Password:** `password123`

**Detail Akun:**

- NIK: 3201234567890002
- Saldo: Rp 2.500.000
- Status Verifikasi: Terverifikasi
- Alamat: Jl. Sawah Indah No. 123, Bogor
- Jenis Usaha: Pertanian Padi

**Fitur yang Dapat Diakses:**

- ✅ Dashboard Petani
- ✅ Farmer Dashboard (Khusus)
- ✅ Create Proposal (Pengajuan crowdfunding)
- ✅ Marketplace (Jual produk)
- ✅ QRIS Payment
- ✅ Traceability
- ✅ Kelola Proyek

---

## 3. 👨‍💼 **Admin Utama**

**Role:** Admin  
**Email:** `admin@vridix.com`  
**Password:** `admin123`

**Detail Akun:**

- NIK: 3201234567890003
- Akses: Full Administrator

**Fitur yang Dapat Diakses:**

- ✅ Admin Dashboard
- ✅ Verifikasi Petani
- ✅ Kelola Users
- ✅ Kelola Proyek
- ✅ Kelola Produk
- ✅ Monitoring Transaksi
- ✅ Laporan & Statistik

**Cara Login Admin:**

1. Kunjungi `/admin` untuk halaman login admin khusus
2. Gunakan kredensial di atas
3. Akan diarahkan ke Admin Dashboard

---

## 4. 👤 **Petani Baru Menunggu**

**Role:** User (Aplikasi Petani Pending)  
**Email:** `petanibaru@vridix.com`  
**Password:** `password123`

**Detail Akun:**

- NIK: 3201234567890004
- Saldo: Rp 500.000
- Status Verifikasi: Menunggu Persetujuan

**Fitur yang Dapat Diakses:**

- ✅ Dashboard User
- ✅ Application Status (Cek status aplikasi petani)
- ✅ Marketplace
- ✅ QRIS Payment
- ✅ Top Up Saldo
- ⏳ Menunggu verifikasi untuk fitur petani

---

## 5. 🛒 **Konsumen Organik**

**Role:** Konsumen  
**Email:** `konsumen@vridix.com`  
**Password:** `password123`

**Detail Akun:**

- NIK: 3201234567890005
- Saldo: Rp 1.200.000
- Fokus: Pembeli produk organik

**Fitur yang Dapat Diakses:**

- ✅ Marketplace (Fokus belanja)
- ✅ QRIS Payment
- ✅ Traceability (Lacak produk)
- ✅ Order History
- ✅ Dashboard Konsumen

---

## 6. 👨‍💼 **User Biasa**

**Role:** User  
**Email:** `user@vridix.com`  
**Password:** `password123`

**Detail Akun:**

- NIK: 3201234567890006
- Saldo: Rp 800.000
- Status: User reguler

**Fitur yang Dapat Diakses:**

- ✅ Dashboard User
- ✅ Marketplace
- ✅ Crowdfunding (Lihat proyek)
- ✅ QRIS Payment
- ✅ Top Up Saldo
- ✅ Register sebagai Petani

---

## 🚀 Cara Login

### Method 1: Login Normal

1. Kunjungi halaman login: `/login`
2. Masukkan email dan password dari daftar di atas
3. Klik "Login"

### Method 2: Login Admin

1. Kunjungi halaman admin: `/admin`
2. Gunakan kredensial Admin (admin@vridix.com)
3. Akses Admin Dashboard

---

## 🧪 Skenario Testing

### Testing sebagai Investor:

```
1. Login dengan: investor@vridix.com
2. Lihat dashboard dengan investasi aktif
3. Coba invest ke proyek baru di Crowdfunding
4. Tarik hasil investasi ke saldo QRIS
5. Gunakan QRIS Payment untuk bayar
6. Belanja di Marketplace
```

### Testing sebagai Petani:

```
1. Login dengan: petani@vridix.com
2. Akses Farmer Dashboard
3. Buat proposal crowdfunding baru
4. Upload produk ke Marketplace
5. Kelola milestone proyek
6. Lihat hasil penjualan
```

### Testing sebagai Admin:

```
1. Login ke /admin dengan: admin@vridix.com
2. Verifikasi aplikasi petani pending
3. Monitor semua transaksi
4. Kelola users dan proyek
5. Lihat statistik platform
```

### Testing QRIS Payment:

```
1. Login dengan akun apapun (kecuali Admin)
2. Pergi ke Dashboard
3. Tarik saldo dari investasi (jika ada)
4. Buka QRIS Payment
5. Scan QR dummy atau input manual
6. Bayar menggunakan saldo
7. Cek transaction history
```

---

## 💡 Tips Testing

1. **Multiple Roles:** Buka browser berbeda atau incognito untuk test multiple roles secara bersamaan
2. **Data Reset:** Refresh page untuk reset mock data
3. **Console Logs:** Buka DevTools untuk melihat API calls dan state management
4. **Responsive:** Test di berbagai device sizes
5. **Flow Lengkap:** Test end-to-end dari registration sampai transaction

---

## 🔒 Keamanan (Development Only)

⚠️ **PENTING:** Akun-akun ini hanya untuk development dan testing!

Untuk production:

- ❌ Jangan gunakan password sederhana seperti "password123"
- ✅ Implementasi password hashing (bcrypt)
- ✅ Implementasi JWT authentication
- ✅ Implementasi rate limiting
- ✅ Enable HTTPS
- ✅ Implementasi 2FA untuk admin

---

## 📝 Catatan Tambahan

### Balance QRIS Payment:

- Investor Visioner: Rp 5.500.000
- Petani Inovatif: Rp 1.200.000
- User Biasa: Rp 3.000.000

### Transaction History Available:

- Investor Visioner: 5 transaksi (mix debit/credit)
- Petani Inovatif: 2 transaksi
- Semua akun memiliki mock transaction history

### Funded Projects:

- Investor Visioner: 2 proyek aktif dengan hasil investasi
- Dapat withdraw hasil ke saldo QRIS

---

## 🆘 Troubleshooting

**Problem:** Login tidak berhasil

- **Solution:** Pastikan menggunakan email dan password yang exact match
- Check console untuk error messages

**Problem:** Tidak bisa akses fitur tertentu

- **Solution:** Pastikan role user sesuai dengan fitur yang diakses
- Beberapa fitur restricted by role

**Problem:** Saldo tidak muncul

- **Solution:** Refresh page atau check mockData.js
- Pastikan user memiliki balance di qrisPayments.userBalances

**Problem:** QRIS Scanner tidak berfungsi

- **Solution:** Berikan permission camera ke browser
- Atau gunakan manual input untuk testing

---

**Happy Testing! 🚀**

Last Updated: October 24, 2025
