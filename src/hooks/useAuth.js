// src/hooks/useAuth.js
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => {
  const context = useContext(AuthContext);

  // Jika context undefined, throw error
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  // Jika context null, return default values (shouldn't happen with new default)
  if (context === null) {
    return {
      user: null,
      loading: true,
      login: () => {},
      logout: () => {},
      updateUser: () => {},
      showToast: () => {},
      walletAddress: null,
      connectWallet: () => {},
    };
  }

  return context;
};
