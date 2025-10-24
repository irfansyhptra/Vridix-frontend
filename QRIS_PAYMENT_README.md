# QRIS Payment System - Vridix Platform

## 📋 Deskripsi

Sistem pembayaran QRIS terintegrasi yang memungkinkan pengguna Vridix menggunakan saldo hasil investasi mereka untuk melakukan pembayaran di merchant yang bekerja sama.

## 🎯 Fitur Utama

### 1. **Scan & Pay QRIS**

- Scan kode QRIS merchant menggunakan kamera
- Input manual kode QRIS
- Verifikasi detail pembayaran sebelum konfirmasi
- Pembayaran langsung menggunakan saldo investasi

### 2. **Manajemen Saldo**

- Lihat saldo tersedia dari hasil investasi
- Tarik hasil investasi ke saldo payment
- Riwayat transaksi lengkap
- Real-time balance update

### 3. **Keamanan Transaksi**

- Verifikasi pembayaran sebelum eksekusi
- Enkripsi data transaksi
- Notifikasi setiap transaksi
- Transaction history tracking

## 📁 Struktur File

```
src/
├── components/
│   ├── payment/
│   │   ├── QRISScanner.jsx          # Component untuk scan QRIS
│   │   ├── QRISPayment.jsx          # Component konfirmasi pembayaran
│   │   └── WithdrawToBalance.jsx    # Component withdraw ke saldo
│   └── common/
│       └── QRScanner.jsx            # Scanner QR reusable
├── pages/
│   └── QRISPaymentPage.jsx          # Halaman utama QRIS Payment
├── services/
│   └── qrisService.js               # API service untuk QRIS
└── App.jsx                          # Route configuration
```

## 🚀 Cara Penggunaan

### Untuk User/Investor:

1. **Akses QRIS Payment**

   - Login ke platform Vridix
   - Klik menu "💳 QRIS Payment" di header
   - Atau kunjungi langsung `/qris-payment`

2. **Tarik Saldo dari Investasi**

   - Buka Dashboard
   - Pada proyek yang sudah memberikan hasil, klik "Tarik ke Saldo"
   - Masukkan jumlah yang ingin ditarik
   - Konfirmasi penarikan

3. **Melakukan Pembayaran**

   - Klik "Scan QRIS untuk Bayar"
   - Scan kode QRIS merchant atau input manual
   - Verifikasi detail pembayaran (merchant, jumlah, deskripsi)
   - Pilih metode pembayaran: "Saldo Investasi Vridix"
   - Pastikan saldo mencukupi
   - Klik "Bayar Sekarang"
   - Tunggu konfirmasi pembayaran berhasil

4. **Lihat Riwayat Transaksi**
   - Scroll ke bagian "Riwayat Transaksi"
   - Filter berdasarkan jenis transaksi
   - Lihat detail setiap transaksi

## 🔧 API Endpoints

### 1. Generate QRIS

```javascript
POST /payment/qris/generate
Body: {
  amount: number,
  description: string,
  userId: string
}
```

### 2. Scan QRIS

```javascript
POST / payment / qris / scan;
Body: {
  qrisCode: string;
}
```

### 3. Pay with Balance

```javascript
POST /payment/qris/pay-with-balance
Body: {
  qrisData: object,
  userId: string
}
```

### 4. Verify Payment

```javascript
GET /payment/qris/verify/:transactionId
```

### 5. Get User Balance

```javascript
GET /payment/balance/:userId
```

### 6. Withdraw to Balance

```javascript
POST /payment/withdraw-to-balance
Body: {
  userId: string,
  projectId: string,
  amount: number
}
```

### 7. Get Transaction History

```javascript
GET /payment/qris/transactions/:userId
```

## 🎨 UI/UX Features

### Balance Card

- Gradient purple background
- Large balance display
- Quick scan button
- Responsive design

### Transaction History

- Categorized by type (debit/credit)
- Color-coded amounts
- Status badges
- Date formatting
- Searchable and filterable

### Payment Flow

1. Scanner dialog dengan preview
2. Manual input option
3. Payment confirmation dengan detail lengkap
4. Balance sufficiency check
5. Success animation
6. Auto-refresh balance

## 💡 Integrasi dengan Fitur Lain

### Dashboard Integration

- Tombol "Tarik ke Saldo" pada setiap proyek
- Withdraw dialog terintegrasi
- Real-time balance update

### Header Navigation

- Menu "💳 QRIS Payment" untuk user yang login
- Quick access dari semua halaman

### Home Page

- Feature card untuk QRIS Payment
- Call-to-action button
- Descriptive information

## 🔒 Keamanan

1. **Authentication**

   - Hanya user yang login dapat akses
   - Protected routes

2. **Authorization**

   - Verifikasi user ID pada setiap transaksi
   - Balance validation sebelum payment

3. **Data Validation**

   - Input sanitization
   - Amount validation
   - QRIS code validation

4. **Transaction Security**
   - Timestamp pada setiap transaksi
   - Transaction ID generation
   - Payment verification

## 📱 Responsive Design

- Mobile-first approach
- Adaptive layouts untuk tablet dan desktop
- Touch-friendly buttons
- Optimized scanner untuk mobile camera

## 🎯 User Journey

```
1. Login → Dashboard
2. View Funded Projects
3. Click "Tarik ke Saldo" (jika ada hasil investasi)
4. Enter withdrawal amount
5. Confirm withdrawal
6. Navigate to QRIS Payment page
7. Check available balance
8. Click "Scan QRIS untuk Bayar"
9. Scan merchant QR code
10. Review payment details
11. Confirm payment
12. View success message
13. Check transaction history
```

## 🚧 Future Enhancements

1. **Multi-Payment Methods**

   - Kartu kredit/debit
   - Virtual account
   - E-wallet integration

2. **Advanced Features**

   - Recurring payments
   - Payment scheduling
   - Split payments
   - Cashback program

3. **Analytics**

   - Spending analytics
   - Category-based tracking
   - Monthly reports
   - Budget planning

4. **Social Features**
   - Split bill dengan teman
   - Payment requests
   - Social payment history

## 📊 Mock Data Structure

### Transaction Object

```javascript
{
  id: "TRX001",
  type: "debit" | "credit",
  amount: 50000,
  description: "Pembayaran di Warung Maju",
  merchantName: "Warung Maju",
  timestamp: "2025-01-15T10:30:00Z",
  status: "success" | "pending" | "failed"
}
```

### Balance Object

```javascript
{
  userId: "USER001",
  balance: 1500000,
  lastUpdate: "2025-01-15T10:30:00Z"
}
```

### QRIS Data Object

```javascript
{
  qrisCode: "00020101021226...",
  merchantName: "Warung Maju",
  amount: 50000,
  description: "Pembayaran belanja",
  transactionId: "QRS001"
}
```

## 🤝 Contributing

Untuk menambahkan fitur atau melakukan perbaikan:

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📝 License

Copyright © 2025 Vridix Platform. All rights reserved.

---

**Developed with ❤️ for sustainable agriculture**
