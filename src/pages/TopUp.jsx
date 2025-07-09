// src/pages/TopUp.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import { useAuth } from "../hooks/useAuth";

const TopUp = () => {
  const navigate = useNavigate();
  const { user, showToast } = useAuth();

  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [step, setStep] = useState("amount"); // amount, payment, confirm, processing, success
  const [loading, setLoading] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [transactionDetails, setTransactionDetails] = useState({
    hash: "",
    blockNumber: "",
    confirmations: 0,
    fee: 0,
    timestamp: null,
  });
  const [selectedQuickAmount, setSelectedQuickAmount] = useState(null);

  const currentBalance = user?.saldoFiat || 500000; // Fallback to 500k if user data not available

  useEffect(() => {
    // Generate a simulated wallet address
    const generatedAddress = `0x${Math.random()
      .toString(16)
      .substring(2, 14)}...${Math.random().toString(16).substring(2, 6)}`;
    setWalletAddress(generatedAddress);
  }, []);

  const paymentOptions = [
    {
      type: "e-wallet",
      name: "E-Wallet",
      description: "Transfer instan dari e-wallet pilihan Anda",
      icon: "💳",
      options: [
        {
          id: "gopay",
          name: "GoPay",
          icon: "💳",
          fee: 1.5,
          color: "bg-gradient-to-r from-green-600 to-green-500",
        },
        {
          id: "ovo",
          name: "OVO",
          icon: "💜",
          fee: 1.5,
          color: "bg-gradient-to-r from-green-700 to-green-600",
        },
        {
          id: "dana",
          name: "DANA",
          icon: "💙",
          fee: 1.5,
          color: "bg-gradient-to-r from-green-600 to-green-400",
        },
        {
          id: "shopeepay",
          name: "ShopeePay",
          icon: "🛒",
          fee: 1.5,
          color: "bg-gradient-to-r from-green-800 to-green-600",
        },
        {
          id: "linkaja",
          name: "LinkAja",
          icon: "🔴",
          fee: 2.0,
          color: "bg-gradient-to-r from-green-700 to-green-500",
        },
      ],
    },
    {
      type: "bank",
      name: "Bank Transfer",
      description: "Transfer dari rekening bank Anda",
      icon: "🏦",
      options: [
        {
          id: "bca",
          name: "BCA",
          icon: "🏦",
          fee: 0.5,
          color: "bg-gradient-to-r from-green-900 to-green-700",
        },
        {
          id: "mandiri",
          name: "Mandiri",
          icon: "🏦",
          fee: 0.7,
          color: "bg-gradient-to-r from-green-800 to-green-600",
        },
        {
          id: "bni",
          name: "BNI",
          icon: "🏦",
          fee: 0.7,
          color: "bg-gradient-to-r from-green-700 to-green-500",
        },
        {
          id: "bri",
          name: "BRI",
          icon: "🏦",
          fee: 0.7,
          color: "bg-gradient-to-r from-green-800 to-green-700",
        },
        {
          id: "permata",
          name: "Permata",
          icon: "🏦",
          fee: 1.0,
          color: "bg-gradient-to-r from-green-900 to-green-800",
        },
      ],
    },
    {
      type: "retail",
      name: "Gerai Retail",
      description: "Bayar di gerai retail terdekat",
      icon: "🏪",
      options: [
        {
          id: "indomaret",
          name: "Indomaret",
          icon: "🏪",
          fee: 2.5,
          color: "bg-gradient-to-r from-green-900 to-green-700",
        },
        {
          id: "alfamart",
          name: "Alfamart",
          icon: "🏪",
          fee: 2.5,
          color: "bg-gradient-to-r from-green-800 to-green-600",
        },
        {
          id: "alfamidi",
          name: "Alfamidi",
          icon: "🏪",
          fee: 2.5,
          color: "bg-gradient-to-r from-green-700 to-green-500",
        },
      ],
    },
    {
      type: "crypto",
      name: "Cryptocurrency",
      description: "Top up dengan aset crypto",
      icon: "₿",
      options: [
        {
          id: "btc",
          name: "Bitcoin",
          icon: "₿",
          fee: 0.2,
          color: "bg-gradient-to-r from-green-500 to-green-400",
        },
        {
          id: "eth",
          name: "Ethereum",
          icon: "Ξ",
          fee: 0.3,
          color: "bg-gradient-to-r from-green-600 to-green-500",
        },
        {
          id: "usdt",
          name: "USDT",
          icon: "💲",
          fee: 0.1,
          color: "bg-gradient-to-r from-green-700 to-green-600",
        },
      ],
    },
  ];

  // Quick amount options with display name and value
  const quickAmounts = [
    { display: "Rp 100K", value: 100000 },
    { display: "Rp 250K", value: 250000 },
    { display: "Rp 500K", value: 500000 },
    { display: "Rp 1 Juta", value: 1000000 },
    { display: "Rp 2.5 Juta", value: 2500000 },
    { display: "Rp 5 Juta", value: 5000000 },
  ];

  const calculateFee = () => {
    if (!paymentMethod || !amount) return 0;
    const fee = parseFloat(amount) * (paymentMethod.fee / 100);
    return fee;
  };

  const calculateTotal = () => {
    if (!amount) return 0;
    return parseFloat(amount) + calculateFee();
  };

  const handleSelectQuickAmount = (value) => {
    setAmount(value.toString());
    setSelectedQuickAmount(value);
  };

  const handleContinue = () => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      showToast("Mohon masukkan jumlah yang valid", "error");
      return;
    }

    if (parseFloat(amount) < 10000) {
      showToast("Minimal top up Rp 10.000", "error");
      return;
    }

    if (parseFloat(amount) > 50000000) {
      showToast("Maksimal top up Rp 50.000.000", "error");
      return;
    }

    setStep("payment");
  };

  const handleSelectPayment = (option) => {
    setPaymentMethod(option);
    setStep("confirm");
  };

  const handleConfirmPayment = () => {
    setLoading(true);

    // Generate random transaction ID for blockchain
    const txId = `TX${Date.now().toString().substring(6)}${Math.floor(
      Math.random() * 1000
    )}`;
    setTransactionId(txId);

    // Set step to processing to show blockchain animation
    setStep("processing");

    // Simulate blockchain processing
    const randomHash = `0x${Array(64)
      .fill(0)
      .map(() => Math.floor(Math.random() * 16).toString(16))
      .join("")}`;
    const randomBlock = 18000000 + Math.floor(Math.random() * 1000000);
    const networkFee = (Math.random() * 0.05 + 0.01).toFixed(4);

    // Simulate blockchain confirmations with incremental updates
    let confirmations = 0;
    const confirmInterval = setInterval(() => {
      confirmations++;
      setTransactionDetails((prev) => ({
        ...prev,
        hash: randomHash,
        blockNumber: randomBlock.toString(),
        confirmations: confirmations,
        fee: networkFee,
        timestamp: new Date().toISOString(),
      }));

      if (confirmations >= 6) {
        clearInterval(confirmInterval);
        setLoading(false);
        setStep("success");
      }
    }, 800);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const renderPaymentOptions = () => {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-green-200 mb-4">
          Pilih Metode Pembayaran
        </h2>

        {paymentOptions.map((category) => (
          <div key={category.type} className="mb-8">
            <div className="flex items-center mb-4">
              <span className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-green-300 flex items-center justify-center text-green-950 text-xl mr-3 shadow-lg">
                {category.icon}
              </span>
              <div>
                <h3 className="text-lg font-medium text-green-200">
                  {category.name}
                </h3>
                <p className="text-sm text-green-300/90">
                  {category.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {category.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleSelectPayment(option)}
                  className="flex items-center justify-between p-4 border border-green-700/50 bg-green-900/40 backdrop-blur-sm rounded-lg hover:bg-green-800/40 hover:border-green-400/50 hover:shadow-md transition-all group"
                >
                  <div className="flex items-center">
                    <span
                      className={`w-10 h-10 rounded-full ${option.color} text-white flex items-center justify-center mr-3 group-hover:scale-110 transition-transform shadow-md`}
                    >
                      {option.icon}
                    </span>
                    <span className="font-medium text-green-100">
                      {option.name}
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-green-300/90">
                      Fee {option.fee}%
                    </span>
                    <span className="text-xs text-green-400 font-medium">
                      Instan
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderConfirmation = () => {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-green-200 mb-4">
          Konfirmasi Top Up
        </h2>

        <div className="bg-green-900/40 backdrop-blur-md p-5 rounded-lg border border-green-700/50 shadow-md">
          <div className="flex items-center mb-4 pb-3 border-b border-green-700/50">
            <span
              className={`w-10 h-10 rounded-full ${paymentMethod.color} text-white flex items-center justify-center mr-3 shadow-md`}
            >
              {paymentMethod.icon}
            </span>
            <div>
              <p className="font-medium text-green-100">{paymentMethod.name}</p>
              <p className="text-sm text-green-300/90">
                Fee {paymentMethod.fee}%
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-green-700/50">
              <span className="text-green-200">Jumlah Top Up:</span>
              <span className="font-medium text-green-100">
                {formatCurrency(amount)}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-green-700/50">
              <span className="text-green-200">Biaya Layanan:</span>
              <span className="font-medium text-green-100">
                {formatCurrency(calculateFee())}
              </span>
            </div>
            <div className="flex justify-between py-2 font-medium">
              <span className="text-green-100">Total Pembayaran:</span>
              <span className="text-green-400 text-lg">
                {formatCurrency(calculateTotal())}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-900/70 to-green-800/70 p-5 rounded-lg border border-green-600/30 backdrop-blur-md">
          <h3 className="text-green-200 font-medium flex items-center mb-3">
            <span className="w-6 h-6 bg-green-500/30 rounded-full flex items-center justify-center text-green-200 mr-2 backdrop-blur-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3A5.25 5.25 0 0 0 12 1.5Zm-1.5 7.5v-3a1.5 1.5 0 0 1 3 0v3h-3Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            Informasi Blockchain
          </h3>
          <p className="text-sm text-green-300/90 mb-3">
            Saldo yang ditambahkan akan tersimpan secara aman di dompet digital
            Anda dan tercatat dalam blockchain Vridix.
          </p>
          <div className="bg-green-900/50 border border-green-700/50 rounded-lg p-3 font-mono text-xs overflow-auto space-y-2 backdrop-blur-md">
            <div className="flex justify-between items-center">
              <span className="text-green-300/90">Alamat Wallet:</span>
              <span className="text-green-200 bg-green-800/70 px-2 py-1 rounded border border-green-600/40">
                {walletAddress}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-green-300/90">Network:</span>
              <span className="text-green-200 bg-green-800/70 px-2 py-1 rounded border border-green-600/40 flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full inline-block mr-1 animate-pulse"></span>
                VRIDX Chain (VRX)
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-green-300/90">Gas Fee Estimasi:</span>
              <span className="text-green-200 bg-green-800/70 px-2 py-1 rounded border border-green-600/40">
                ~0.0025 VRX
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-3 mt-2">
          <Button
            onClick={handleConfirmPayment}
            className="w-full bg-gradient-to-r from-green-400 to-green-300 hover:from-green-500 hover:to-green-400 text-green-950 font-medium py-3 shadow-lg"
            disabled={loading}
          >
            {loading ? "Memproses..." : "Konfirmasi & Bayar"}
          </Button>
          <Button
            onClick={() => setStep("payment")}
            variant="outline"
            className="w-full border-green-600/50 text-green-200 hover:bg-green-800/40"
          >
            Kembali ke Metode Pembayaran
          </Button>
        </div>

        <div className="text-center text-xs text-green-300/90 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4 mr-1"
          >
            <path
              fillRule="evenodd"
              d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3A5.25 5.25 0 0 0 12 1.5Zm-1.5 7.5v-3a1.5 1.5 0 0 1 3 0v3h-3Z"
              clipRule="evenodd"
            />
          </svg>
          Transaksi ini aman dan terenkripsi
        </div>
      </div>
    );
  };

  const renderProcessing = () => {
    return (
      <div className="text-center space-y-6 py-8">
        <div className="relative w-28 h-28 mx-auto">
          {/* Spinning outer ring */}
          <div className="absolute inset-0 rounded-full border-4 border-green-700/50 border-t-green-400 animate-spin shadow-lg"></div>
          {/* Inner blockchain icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-12 h-12 text-green-400"
            >
              <path d="M21 6.375c0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875 4.03-4.875 9-4.875 9 2.183 9 4.875Z" />
              <path d="M12 12.75c-4.97 0-9-2.183-9-4.875v6.75c0 2.692 4.03 4.875 9 4.875s9-2.183 9-4.875v-6.75c0 2.692-4.03 4.875-9 4.875Z" />
            </svg>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-green-200 mb-2">
            Memproses Transaksi
          </h2>
          <p className="text-green-300/90">
            Mohon tunggu, transaksi sedang diproses di blockchain...
          </p>
        </div>

        <div className="bg-green-900/40 backdrop-blur-md p-4 rounded-lg border border-green-700/50 shadow-md">
          <div className="space-y-2 text-left">
            <div className="flex items-center mb-2">
              <div
                className={`w-4 h-4 rounded-full bg-green-400 mr-2 flex items-center justify-center shadow-md`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="w-3 h-3"
                >
                  <path
                    fillRule="evenodd"
                    d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 0 1 1.04-.208Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-sm text-green-100">
                Menerima permintaan top up
              </span>
            </div>

            <div className="flex items-center mb-2">
              <div
                className={`w-4 h-4 rounded-full bg-green-400 mr-2 flex items-center justify-center shadow-md`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="w-3 h-3"
                >
                  <path
                    fillRule="evenodd"
                    d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 0 1 1.04-.208Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-sm text-green-100">
                Memverifikasi metode pembayaran
              </span>
            </div>

            <div className="flex items-center mb-2">
              <div
                className={`w-4 h-4 rounded-full ${
                  transactionDetails.hash
                    ? "bg-green-400"
                    : "bg-green-500/50 animate-pulse"
                } mr-2 flex items-center justify-center shadow-md`}
              >
                {transactionDetails.hash ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    className="w-3 h-3"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 0 1 1.04-.208Z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : null}
              </div>
              <span className="text-sm text-green-100">
                Mencatat transaksi ke blockchain
              </span>
            </div>

            <div className="flex items-center mb-2">
              <div
                className={`w-4 h-4 rounded-full ${
                  transactionDetails.confirmations >= 3
                    ? "bg-green-400"
                    : "bg-green-800/70"
                } mr-2 flex items-center justify-center shadow-md`}
              >
                {transactionDetails.confirmations >= 3 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    className="w-3 h-3"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 0 1 1.04-.208Z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : null}
              </div>
              <span className="text-sm text-green-100">
                Menunggu konfirmasi blockchain
              </span>
            </div>

            <div className="flex items-center">
              <div
                className={`w-4 h-4 rounded-full ${
                  transactionDetails.confirmations >= 6
                    ? "bg-green-400"
                    : "bg-green-800/70"
                } mr-2 flex items-center justify-center shadow-md`}
              >
                {transactionDetails.confirmations >= 6 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    className="w-3 h-3"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 0 1 1.04-.208Z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : null}
              </div>
              <span className="text-sm text-green-100">
                Mengupdate saldo akun
              </span>
            </div>
          </div>

          {transactionDetails.hash && (
            <div className="mt-4 pt-4 border-t border-green-700/50">
              <div className="flex items-center justify-between text-xs">
                <span className="text-green-300/90">Konfirmasi:</span>
                <div className="flex space-x-1">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-4 h-1 rounded-full ${
                        i < transactionDetails.confirmations
                          ? "bg-green-400"
                          : "bg-green-800/70"
                      }`}
                    ></div>
                  ))}
                </div>
                <span className="font-medium text-green-200">
                  {transactionDetails.confirmations}/6
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderSuccess = () => {
    return (
      <div className="text-center space-y-6 py-4">
        <div className="bg-gradient-to-r from-green-500/30 to-green-300/30 w-24 h-24 mx-auto rounded-full flex items-center justify-center shadow-inner backdrop-blur-md border border-green-400/30">
          <div className="bg-gradient-to-r from-green-400 to-green-300 w-16 h-16 rounded-full flex items-center justify-center shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="w-10 h-10"
            >
              <path
                fillRule="evenodd"
                d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 0 1 1.04-.208Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Top Up Berhasil!
          </h2>
          <p className="text-green-100/90">
            Dana telah ditambahkan ke saldo Anda.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-5 rounded-lg border border-white/20 shadow-md">
          <div className="flex justify-between py-3 border-b border-white/20">
            <span className="text-green-100">ID Transaksi:</span>
            <span className="font-mono text-sm bg-green-900/50 border border-green-400/30 px-2 py-1 rounded text-white">
              {transactionId}
            </span>
          </div>
          <div className="flex justify-between py-3 border-b border-white/20">
            <span className="text-green-100">Jumlah:</span>
            <span className="font-medium text-white">
              {formatCurrency(amount)}
            </span>
          </div>
          <div className="flex justify-between py-3 border-b border-white/20">
            <span className="text-green-100">Metode:</span>
            <span className="font-medium flex items-center text-white">
              <span
                className={`w-6 h-6 rounded-full ${paymentMethod.color} text-white flex items-center justify-center mr-2 shadow-md`}
              >
                {paymentMethod.icon}
              </span>
              {paymentMethod.name}
            </span>
          </div>
          <div className="flex justify-between py-3 font-medium">
            <span className="text-white">Saldo Baru:</span>
            <span className="text-green-300 text-lg">
              {formatCurrency(currentBalance + parseFloat(amount))}
            </span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-900/50 to-green-800/50 p-5 rounded-lg border border-green-400/20 backdrop-blur-md">
          <h3 className="text-green-200 font-medium flex items-center mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path d="M21 6.375c0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875 4.03-4.875 9-4.875 9 2.183 9 4.875Z" />
              <path d="M12 12.75c-4.97 0-9-2.183-9-4.875v6.75c0 2.692 4.03 4.875 9 4.875s9-2.183 9-4.875v-6.75c0 2.692-4.03 4.875-9 4.875Z" />
            </svg>
            Detail Blockchain
          </h3>
          <div className="bg-white/10 border border-white/20 rounded-lg p-3 overflow-auto text-left space-y-2 backdrop-blur-md">
            <div className="flex justify-between items-center">
              <span className="text-green-100/80 text-xs">Tx Hash:</span>
              <span className="font-mono text-xs text-green-200 bg-green-900/50 border border-green-400/30 px-2 py-1 rounded truncate max-w-[220px]">
                {transactionDetails.hash ||
                  `0x${Math.random().toString(16).substring(2, 62)}`}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-green-100/80 text-xs">Block:</span>
              <span className="font-mono text-xs text-green-200 bg-green-900/50 border border-green-400/30 px-2 py-1 rounded">
                {transactionDetails.blockNumber ||
                  18000000 + Math.floor(Math.random() * 1000000)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-green-100/80 text-xs">Confirmations:</span>
              <span className="font-mono text-xs text-green-200 bg-green-900/50 border border-green-400/30 px-2 py-1 rounded">
                6 blocks
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-green-100/80 text-xs">Network Fee:</span>
              <span className="font-mono text-xs text-green-200 bg-green-900/50 border border-green-400/30 px-2 py-1 rounded">
                {transactionDetails.fee || "0.0025"} VRX
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-green-100/80 text-xs">Status:</span>
              <span className="text-xs bg-green-400/20 text-green-300 px-2 py-1 rounded flex items-center border border-green-400/30">
                <span className="w-2 h-2 bg-green-400 rounded-full inline-block mr-1 animate-pulse"></span>
                Confirmed & Finalized
              </span>
            </div>
          </div>
        </div>

        <div className="pt-4 flex flex-col space-y-3">
          <Button
            onClick={() => navigate("/")}
            className="w-full bg-gradient-to-r from-green-500 to-green-300 hover:from-green-600 hover:to-green-400 text-green-900 font-medium shadow-lg"
          >
            Kembali ke Dashboard
          </Button>
          <Button
            onClick={() => {
              setAmount("");
              setPaymentMethod(null);
              setStep("amount");
            }}
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10"
          >
            Top Up Lagi
          </Button>
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (step) {
      case "payment":
        return renderPaymentOptions();
      case "confirm":
        return renderConfirmation();
      case "processing":
        return renderProcessing();
      case "success":
        return renderSuccess();
      default:
        return (
          <div className="space-y-6">
            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-green-200 mb-1"
              >
                Jumlah Top Up
              </label>
              <div className="mt-1 relative rounded-md shadow-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-green-400 sm:text-sm">Rp</span>
                </div>
                <input
                  type="text"
                  name="amount"
                  id="amount"
                  value={amount}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setAmount(value);
                  }}
                  placeholder="100,000"
                  className="w-full pl-10 pr-4 py-3 bg-green-900/40 backdrop-blur-md border border-green-700/60 rounded-md focus:ring-green-400 focus:border-green-400 text-lg text-white placeholder-green-300/40"
                />
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-900/70 to-green-800/70 rounded-lg p-5 border border-green-600/30 backdrop-blur-md">
              <h3 className="font-medium text-green-200 mb-3">
                Pilih Jumlah Cepat:
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {quickAmounts.map((quickAmount) => (
                  <button
                    key={quickAmount.value}
                    onClick={() => handleSelectQuickAmount(quickAmount.value)}
                    className={`p-3 rounded-md transition-all transform hover:scale-105 ${
                      selectedQuickAmount === quickAmount.value
                        ? "bg-gradient-to-r from-green-400 to-green-300 text-green-950 font-medium border-0 shadow-md"
                        : "bg-green-800/40 backdrop-blur-sm border border-green-700/40 hover:border-green-400/50 hover:bg-green-800/60 text-green-100"
                    }`}
                  >
                    {quickAmount.display}
                  </button>
                ))}
              </div>

              <div className="mt-4 text-center">
                <span className="text-xs text-green-200/90 bg-green-800/60 px-3 py-1 rounded-full shadow-sm border border-green-600/30">
                  Atau masukkan jumlah kustom
                </span>
              </div>
            </div>

            <div className="pt-4">
              <Button
                onClick={handleContinue}
                className="w-full bg-gradient-to-r from-green-400 to-green-300 hover:from-green-500 hover:to-green-400 text-green-950 font-medium py-3 shadow-lg"
                disabled={!amount || parseFloat(amount) <= 0}
              >
                Lanjutkan
              </Button>
              <p className="text-xs text-green-200/90 text-center mt-3">
                Minimal top up Rp 10.000. Maksimal Rp 50.000.000 per transaksi.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-950 via-green-900 to-green-800 py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Header with Steps */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-center mb-4 text-white">
            {step === "success" ? "Top Up Berhasil" : "Top Up Saldo Digital"}
          </h1>

          {step !== "success" && step !== "processing" && (
            <div className="flex items-center justify-center max-w-lg mx-auto">
              <div
                className={`h-1 flex-1 ${
                  step === "amount" ? "bg-green-400" : "bg-green-900/50"
                }`}
              ></div>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                  step === "amount"
                    ? "bg-gradient-to-r from-green-400 to-green-300 text-green-950"
                    : "bg-green-900/50 text-green-300/70"
                } backdrop-blur-sm shadow-lg`}
              >
                1
              </div>
              <div
                className={`h-1 flex-1 ${
                  step === "payment" ? "bg-green-400" : "bg-green-900/50"
                }`}
              ></div>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                  step === "payment"
                    ? "bg-gradient-to-r from-green-400 to-green-300 text-green-950"
                    : "bg-green-900/50 text-green-300/70"
                } backdrop-blur-sm shadow-lg`}
              >
                2
              </div>
              <div
                className={`h-1 flex-1 ${
                  step === "confirm" ? "bg-green-400" : "bg-green-900/50"
                }`}
              ></div>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                  step === "confirm"
                    ? "bg-gradient-to-r from-green-400 to-green-300 text-green-950"
                    : "bg-green-900/50 text-green-300/70"
                } backdrop-blur-sm shadow-lg`}
              >
                3
              </div>
              <div className="flex-1 h-1 bg-green-900/50"></div>
            </div>
          )}

          {/* Status for processing step */}
          {step === "processing" && (
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 bg-green-900/60 text-green-50 rounded-full border border-green-500/30 backdrop-blur-md shadow-md">
                <svg
                  className="animate-spin -ml-1 mr-2 h-5 w-5 text-green-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Memproses transaksi di blockchain...</span>
              </div>
            </div>
          )}
        </div>

        {/* Card with Wallet Balance and Top Up Form - Using glassmorphism style */}
        <div
          className={`p-8 bg-green-950/60 backdrop-blur-md text-white shadow-xl rounded-xl border ${
            step === "processing" || step === "success"
              ? "border-green-400/30"
              : "border-green-700/50"
          }`}
        >
          {step !== "success" && step !== "processing" && (
            <div className="mb-6 bg-gradient-to-r from-green-900/60 to-green-800/60 p-1 rounded-xl shadow-lg backdrop-blur-sm border border-green-600/20">
              <div className="bg-gradient-to-br from-green-950/80 to-green-900/80 rounded-lg p-4 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-200/90 text-sm font-medium">
                      Saldo Anda Saat Ini
                    </p>
                    <p className="text-3xl font-bold text-white">
                      {formatCurrency(currentBalance)}
                    </p>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-r from-green-400 to-green-300 rounded-full flex items-center justify-center shadow-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-8 h-8 text-green-950"
                    >
                      <path d="M21 6.375c0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875 4.03-4.875 9-4.875 9 2.183 9 4.875Z" />
                      <path d="M12 12.75c-4.97 0-9-2.183-9-4.875v6.75c0 2.692 4.03 4.875 9 4.875s9-2.183 9-4.875v-6.75c0 2.692-4.03 4.875-9 4.875Z" />
                    </svg>
                  </div>
                </div>
                <div className="mt-3 flex items-center">
                  <span className="text-xs text-green-200 flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full inline-block mr-1 animate-pulse"></span>
                    Wallet Aktif
                  </span>
                  <div className="text-xs bg-green-800/50 text-green-200 ml-4 px-2 py-0.5 rounded-full font-mono truncate max-w-[200px] md:max-w-md border border-green-500/30">
                    {walletAddress}
                  </div>
                </div>
              </div>
            </div>
          )}

          {renderStepContent()}
        </div>

        {/* Info Section */}
        {step !== "success" && step !== "processing" && (
          <div className="mt-8">
            <h3 className="font-medium text-white mb-4 text-center">
              Keunggulan Top Up Blockchain Vridix
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-900/40 backdrop-blur-md p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-green-700/50 hover:border-green-600/70">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-300 flex items-center justify-center text-green-900 mb-4 shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3A5.25 5.25 0 0 0 12 1.5Zm-1.5 7.5v-3a1.5 1.5 0 0 1 3 0v3h-3Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h4 className="font-medium text-lg mb-2 text-white">
                  100% Aman & Transparan
                </h4>
                <p className="text-green-100 text-sm">
                  Data transaksi tersimpan permanen di blockchain dan dapat
                  diverifikasi kapan saja
                </p>
              </div>
              <div className="bg-green-900/40 backdrop-blur-md p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-green-700/50 hover:border-green-600/70">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-300 flex items-center justify-center text-green-900 mb-4 shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h4 className="font-medium text-lg mb-2 text-white">
                  Proses Super Cepat
                </h4>
                <p className="text-green-100 text-sm">
                  Dana langsung masuk ke saldo dengan proses validasi blockchain
                  yang cepat
                </p>
              </div>
              <div className="bg-green-900/40 backdrop-blur-md p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-green-700/50 hover:border-green-600/70">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-300 flex items-center justify-center text-green-900 mb-4 shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
                    <path
                      fillRule="evenodd"
                      d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h4 className="font-medium text-lg mb-2 text-white">
                  Biaya Transparan
                </h4>
                <p className="text-green-100 text-sm">
                  Fee transaksi yang kompetitif dengan rincian gas fee yang
                  transparan
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopUp;
