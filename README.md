# 🌾 Vridix - Platform Digital untuk Pertanian Berkelanjutan

Platform crowdfunding dan marketplace berbasis blockchain untuk menghubungkan petani, investor, dan konsumen dalam ekosistem pertanian yang transparan dan berkelanjutan.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm atau yarn

### Installation

```bash
# Clone repository
git clone https://github.com/irfansyhptra/Vridix-frontend.git

# Masuk ke directory
cd Vridix-frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

Server akan berjalan di `http://localhost:5173`

## 🔐 Akun Dummy untuk Testing

Aplikasi sudah dilengkapi dengan akun dummy untuk testing. Lihat file `DUMMY_ACCOUNTS.md` atau check console browser untuk daftar lengkap.

### Quick Access:

| Role        | Email                 | Password      |
| ----------- | --------------------- | ------------- |
| 💼 Investor | `investor@vridix.com` | `password123` |
| 🌾 Petani   | `petani@vridix.com`   | `password123` |
| 👨‍💼 Admin    | `admin@vridix.com`    | `admin123`    |
| 🛒 Konsumen | `konsumen@vridix.com` | `password123` |
| 👤 User     | `user@vridix.com`     | `password123` |

**📝 Note:** Akun dummy otomatis tampil di console browser saat development mode.

### Admin Access

Untuk akses admin panel: `/admin`

## ✨ Fitur Utama

### 1. 🌱 Crowdfunding Pertanian

- Dukung petani lokal dengan berinvestasi
- Tracking progress proyek real-time
- Milestone-based funding
- ROI transparency

### 2. 🛒 Marketplace

- Beli produk segar langsung dari petani
- Jaminan kualitas produk
- Review & rating system
- Order tracking

### 3. 💳 QRIS Payment

- Bayar menggunakan saldo investasi
- Scan & pay merchants
- Transaction history
- Balance management

### 4. 🔍 Traceability

- Lacak produk dari lahan ke meja
- Blockchain-based verification
- Supply chain transparency
- QR code scanning

### 5. 👨‍🌾 Farmer Dashboard

- Kelola proyek crowdfunding
- Upload produk ke marketplace
- Track penjualan
- Milestone reporting

### 6. 👨‍💼 Admin Panel

- Verifikasi aplikasi petani
- Monitor transaksi
- User management
- Platform analytics

## 🗂️ Project Structure

```
src/
├── components/          # Reusable components
│   ├── common/         # Common UI components
│   ├── dashboard/      # Dashboard components
│   ├── crowdfunding/   # Crowdfunding features
│   ├── marketplace/    # Marketplace features
│   ├── payment/        # QRIS Payment components
│   └── layout/         # Layout components
├── pages/              # Page components
├── services/           # API services
├── hooks/              # Custom React hooks
├── context/            # React context providers
├── data/               # Mock data & constants
└── utils/              # Utility functions
```

## 🛠️ Tech Stack

- **Frontend Framework:** React 18 + Vite
- **UI Library:** Material-UI (MUI)
- **Styling:** Tailwind CSS
- **Routing:** React Router v6
- **State Management:** React Context API
- **HTTP Client:** Axios
- **Animation:** AOS (Animate On Scroll)
- **QR Code:** react-qr-scanner
- **Lottie:** Lottie-react

## 📦 Available Scripts

```bash
# Development
npm run dev          # Start dev server

# Build
npm run build        # Build for production

# Preview
npm run preview      # Preview production build

# Lint
npm run lint         # Run ESLint
```

## 🌐 Environment Variables

Copy `.env.example` to `.env` and update values:

```bash
cp .env.example .env
```

Key variables:

- `VITE_API_URL` - Backend API URL
- `VITE_USE_MOCK_DATA` - Enable mock data mode
- `VITE_ENABLE_QRIS_PAYMENT` - Enable QRIS payment feature

## 📚 Documentation

- [Dummy Accounts Guide](./DUMMY_ACCOUNTS.md) - Complete list of test accounts
- [QRIS Payment System](./QRIS_PAYMENT_README.md) - QRIS payment documentation
- [Quick Reference](./LOGIN_QUICK_REFERENCE.txt) - Quick login reference

## 🧪 Testing Scenarios

### Test sebagai Investor:

1. Login dengan `investor@vridix.com`
2. Browse crowdfunding projects
3. Invest in a project
4. Withdraw returns to QRIS balance
5. Make payment using QRIS

### Test sebagai Petani:

1. Login dengan `petani@vridix.com`
2. Access Farmer Dashboard
3. Create crowdfunding proposal
4. Upload products to marketplace
5. Manage project milestones

### Test sebagai Admin:

1. Login to `/admin` dengan `admin@vridix.com`
2. Verify pending farmer applications
3. Monitor platform transactions
4. Manage users and projects

## 🔒 Security Notes

⚠️ **Development Only:**

- Default passwords are for testing only
- Do not use in production
- Implement proper authentication in production
- Enable HTTPS
- Use environment variables for sensitive data

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

- **Developer:** Irfan Syahputra
- **Organization:** Vridix Platform

## 📞 Contact

- GitHub: [@irfansyhptra](https://github.com/irfansyhptra)
- Repository: [Vridix-frontend](https://github.com/irfansyhptra/Vridix-frontend)

---

**Built with ❤️ for sustainable agriculture**

Last Updated: October 24, 2025
