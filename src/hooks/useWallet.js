import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";

export const useWallet = () => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [error, setError] = useState(null);

  const connectWallet = useCallback(async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();

        setProvider(provider);
        setAccount(address);
        setError(null);
      } catch (err) {
        console.error(err);
        setError(
          "Gagal terhubung ke wallet. Pastikan Anda telah mengizinkan koneksi."
        );
      }
    } else {
      setError("Wallet Ethereum tidak terdeteksi. Silakan install MetaMask.");
    }
  }, []);

  const disconnectWallet = () => {
    setAccount(null);
    setProvider(null);
  };

  useEffect(() => {
    const handleAccountsChanged = (accounts) => {
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      } else {
        disconnectWallet();
      }
    };

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  }, []);

  return { account, provider, error, connectWallet, disconnectWallet };
};
