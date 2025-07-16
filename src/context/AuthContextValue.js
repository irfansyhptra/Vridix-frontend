// src/context/AuthContextValue.js
import { createContext } from "react";

// Export AuthContext dengan default value
export const AuthContext = createContext({
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
  updateUser: () => {},
  showToast: () => {},
  register: () => {},
});
