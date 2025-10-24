// src/utils/devHelper.js
// Development Helper - Console Log Dummy Accounts

export const logDummyAccounts = () => {
  if (import.meta.env.DEV) {
    console.log(
      "%c🔐 VRIDIX DUMMY ACCOUNTS ",
      "background: #4ade80; color: black; font-weight: bold; padding: 10px 20px; border-radius: 5px; font-size: 16px;"
    );

    console.log("\n");

    console.log(
      "%c💼 INVESTOR",
      "background: #667eea; color: white; font-weight: bold; padding: 5px 10px; border-radius: 3px;"
    );
    console.log("📧 Email    : investor@vridix.com");
    console.log("🔑 Password : password123");
    console.log("💰 Saldo    : Rp 15.000.000");
    console.log("📊 Investasi: 2 proyek (Rp 7.500.000)");

    console.log("\n");

    console.log(
      "%c🌾 PETANI (Terverifikasi)",
      "background: #34d399; color: white; font-weight: bold; padding: 5px 10px; border-radius: 3px;"
    );
    console.log("📧 Email    : petani@vridix.com");
    console.log("🔑 Password : password123");
    console.log("💰 Saldo    : Rp 2.500.000");
    console.log("✅ Status   : Terverifikasi");

    console.log("\n");

    console.log(
      "%c👨‍💼 ADMIN",
      "background: #ef4444; color: white; font-weight: bold; padding: 5px 10px; border-radius: 3px;"
    );
    console.log("📧 Email    : admin@vridix.com");
    console.log("🔑 Password : admin123");
    console.log("🔗 URL      : /admin");
    console.log("🔐 Access   : Full Administrator");

    console.log("\n");

    console.log(
      "%c🛒 KONSUMEN",
      "background: #f59e0b; color: white; font-weight: bold; padding: 5px 10px; border-radius: 3px;"
    );
    console.log("📧 Email    : konsumen@vridix.com");
    console.log("🔑 Password : password123");
    console.log("💰 Saldo    : Rp 1.200.000");

    console.log("\n");

    console.log(
      "%c👤 USER BIASA",
      "background: #8b5cf6; color: white; font-weight: bold; padding: 5px 10px; border-radius: 3px;"
    );
    console.log("📧 Email    : user@vridix.com");
    console.log("🔑 Password : password123");
    console.log("💰 Saldo    : Rp 800.000");

    console.log("\n");

    console.log(
      "%c⏳ PETANI PENDING",
      "background: #6b7280; color: white; font-weight: bold; padding: 5px 10px; border-radius: 3px;"
    );
    console.log("📧 Email    : petanibaru@vridix.com");
    console.log("🔑 Password : password123");
    console.log("💰 Saldo    : Rp 500.000");
    console.log("⏳ Status   : Menunggu Verifikasi");

    console.log("\n");
    console.log(
      "%c💡 Quick Test Scenarios",
      "background: #fbbf24; color: black; font-weight: bold; padding: 5px 10px; border-radius: 3px;"
    );
    console.log("🔹 Test Investasi    : investor@vridix.com");
    console.log("🔹 Test Petani       : petani@vridix.com");
    console.log("🔹 Test Admin        : admin@vridix.com (/admin)");
    console.log("🔹 Test QRIS Payment : Any user account");
    console.log("🔹 Test Marketplace  : konsumen@vridix.com");

    console.log("\n");
    console.log(
      "%c⚠️ DEVELOPMENT ONLY - DO NOT USE IN PRODUCTION",
      "background: #dc2626; color: white; font-weight: bold; padding: 5px 10px; border-radius: 3px;"
    );
    console.log("\n");
  }
};

// Export akun dummy sebagai object untuk kemudahan akses
export const dummyAccounts = {
  investor: {
    email: "investor@vridix.com",
    password: "password123",
    role: "Investor",
    saldo: 15000000,
  },
  petani: {
    email: "petani@vridix.com",
    password: "password123",
    role: "Petani",
    saldo: 2500000,
  },
  admin: {
    email: "admin@vridix.com",
    password: "admin123",
    role: "Admin",
    url: "/admin",
  },
  konsumen: {
    email: "konsumen@vridix.com",
    password: "password123",
    role: "Konsumen",
    saldo: 1200000,
  },
  user: {
    email: "user@vridix.com",
    password: "password123",
    role: "User",
    saldo: 800000,
  },
  petaniBaru: {
    email: "petanibaru@vridix.com",
    password: "password123",
    role: "User",
    status: "Pending Verification",
    saldo: 500000,
  },
};

// Function untuk auto-fill login form (debugging purpose)
export const autoFillLogin = (accountType = "investor") => {
  if (import.meta.env.DEV) {
    const account = dummyAccounts[accountType];
    if (account) {
      return {
        email: account.email,
        password: account.password,
      };
    }
  }
  return null;
};

export default { logDummyAccounts, dummyAccounts, autoFillLogin };
