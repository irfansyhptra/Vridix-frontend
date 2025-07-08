import { useState, useCallback } from "react";
import { useWallet } from "./useWallet";
import api from "../api/axiosConfig";

export const useAuth = () => {
  const { account, provider, connectWallet, disconnectWallet } = useWallet();
  const [authToken, setAuthToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  const login = useCallback(async () => {
    if (!provider || !account) {
      setAuthError("Please connect your wallet first.");
      return;
    }

    setLoading(true);
    setAuthError(null);

    try {
      // 1. Get a unique message (nonce) from the backend
      const nonceRes = await api.post("/api/auth/nonce", {
        walletAddress: account,
      });
      const { nonce } = nonceRes.data;

      // 2. Sign the message with the wallet
      const signer = provider.getSigner();
      const signature = await signer.signMessage(nonce);

      // 3. Verify the signature with the backend to get a JWT
      const verifyRes = await api.post("/api/auth/verify", {
        walletAddress: account,
        signature,
      });
      const { token } = verifyRes.data;

      // 4. Store the token and update state
      localStorage.setItem("token", token);
      setAuthToken(token);
    } catch (err) {
      console.error("Authentication failed:", err);
      setAuthError("Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [account, provider]);

  const logout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    disconnectWallet();
  };

  return {
    account,
    authToken,
    loading,
    authError,
    login,
    logout,
    connectWallet,
  };
};
