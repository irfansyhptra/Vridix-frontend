// src/context/AuthContext.jsx
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { useWallet } from "../hooks/useWallet";
import { localStorageService } from "../services/localStorageService";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

// Dummy token generator
const generateDummyToken = (payload) => {
  const header = { alg: "HS256", typ: "JWT" };
  const encodedHeader = btoa(JSON.stringify(header));
  const encodedPayload = btoa(JSON.stringify(payload));
  // In a real scenario, this would be a signature
  const signature = "dummy_signature";
  return `${encodedHeader}.${encodedPayload}.${signature}`;
};

export const AuthProvider = ({ children }) => {
  const {
    account,
    connectWallet,
    disconnectWallet,
    provider,
    error: walletError,
  } = useWallet();
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("vridix_token")
  );
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    if (authToken) {
      try {
        const decoded = jwtDecode(authToken);
        const userData = localStorageService.getUserByWallet(
          decoded.walletAddress
        );
        if (userData) {
          setUser(userData);
        } else {
          // Token exists but user not in our dummy DB
          logout();
        }
      } catch (e) {
        console.error("Invalid token:", e);
        logout();
      }
    }
  }, [authToken]);

  const login = useCallback(async () => {
    if (!account) {
      await connectWallet();
      return;
    }

    setLoading(true);
    setAuthError(null);

    try {
      // Simulate signing a nonce
      const nonce = `Selamat datang di Vridix! Nonce: ${Date.now()}`;
      const signer = provider.getSigner();
      // In a real app, this signature would be sent to the backend
      const signature = await signer.signMessage(nonce);
      console.log("Simulated Signature:", signature);

      // --- Backend logic simulation ---
      let userData = localStorageService.getUserByWallet(account);

      // If user doesn't exist, create a new one (for demo purposes)
      if (!userData) {
        // In a real app, you might redirect to a registration page
        // or have a more complex logic.
        // For now, we'll assign "Investor" role by default.
        userData = {
          walletAddress: account,
          name: "Pengguna Baru",
          role: "Investor", // Default role
          totalInvestasi: 0,
          proyekDidanai: 0,
          totalBelanja: 0,
          fundedProjects: [],
        };
        localStorageService.addUser(userData);
      }

      const tokenPayload = {
        walletAddress: userData.walletAddress,
        role: userData.role,
        // exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1 hour expiry
      };

      const token = generateDummyToken(tokenPayload);

      localStorage.setItem("vridix_token", token);
      setAuthToken(token);
      setUser(userData);
    } catch (err) {
      console.error("Authentication failed:", err);
      setAuthError(
        "Gagal masuk. Pastikan Anda menandatangani pesan di wallet Anda."
      );
    } finally {
      setLoading(false);
    }
  }, [account, provider, connectWallet]);

  const logout = () => {
    localStorage.removeItem("vridix_token");
    setAuthToken(null);
    setUser(null);
    disconnectWallet();
  };

  const value = {
    user,
    authToken,
    loading,
    authError,
    walletError,
    account,
    login,
    logout,
    connectWallet,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
