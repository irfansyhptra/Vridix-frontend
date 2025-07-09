// src/hooks/useWallet.js

import { useState, useEffect } from "react";
import { ethers } from "ethers";

export const useWallet = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [error, setError] = useState(null);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        setError("MetaMask tidak terdeteksi. Silakan install MetaMask.");
        throw new Error("MetaMask not detected.");
      }

      // PERBAIKAN: Gunakan ethers.BrowserProvider untuk ethers v6
      const provider = new ethers.BrowserProvider(window.ethereum);

      // Minta koneksi ke MetaMask
      const accounts = await provider.send("eth_requestAccounts", []);

      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        return accounts[0];
      } else {
        setError("Tidak ada akun yang diizinkan.");
        throw new Error("No accounts allowed.");
      }
    } catch (err) {
      console.error("Error connecting wallet:", err);
      setError(err.message || "Gagal menghubungkan wallet.");
      throw err; // Lempar lagi error agar bisa ditangkap oleh pemanggil
    }
  };

  const signMessage = async (message) => {
    if (!window.ethereum) {
      throw new Error("MetaMask not detected.");
    }
    try {
      // PERBAIKAN: Gunakan ethers.BrowserProvider lagi
      const provider = new ethers.BrowserProvider(window.ethereum);

      // PERBAIKAN: getSigner() sekarang bersifat asynchronous, jadi perlu 'await'
      const signer = await provider.getSigner();

      const signature = await signer.signMessage(message);
      return signature;
    } catch (err) {
      console.error("Error signing message:", err);
      setError(err.message || "Gagal menandatangani pesan.");
      throw err;
    }
  };

  useEffect(() => {
    // Fungsi untuk memeriksa apakah wallet sudah terhubung sebelumnya
    const checkIfWalletIsConnected = async () => {
      if (window.ethereum) {
        // PERBAIKAN: Gunakan ethers.BrowserProvider
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.listAccounts();
        if (accounts.length > 0 && accounts[0]) {
          // Di ethers v6, signer object memiliki address, bukan account object
          setWalletAddress(accounts[0].address || accounts[0]);
        }
      }
    };
    checkIfWalletIsConnected();

    // Listener untuk perubahan akun
    if (window.ethereum?.on) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        } else {
          setWalletAddress(null);
        }
      });
    }
  }, []);

  return { walletAddress, error, connectWallet, signMessage };
};
