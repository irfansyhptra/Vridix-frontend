/* eslint-disable */
import { useState } from "react";

export const useWallet = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [error, setError] = useState(null);

  // Empty implementation that returns null
  const connectWallet = async () => {
    console.warn("Wallet functionality has been removed from this application");
    setError("Wallet functionality has been removed from this application");
    return null;
  };

  // Empty implementation that returns null
  const signMessage = async (message) => {
    console.warn("Wallet functionality has been removed from this application");
    setError("Wallet functionality has been removed from this application");
    return null;
  };

  return { walletAddress, error, connectWallet, signMessage };
};
