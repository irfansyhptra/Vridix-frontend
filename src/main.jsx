
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./App.css";

import { AuthProvider } from "./context/AuthContext.jsx";
import { localStorageService } from "./services/localStorageService.js";
import { mockData } from "./data/mockData.js";

// Seed the local storage with mock data on initial load
localStorageService.seedInitialData(mockData);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
