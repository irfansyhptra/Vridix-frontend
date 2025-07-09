// src/components/common/UserRoleSwitcher.jsx

import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../hooks/useAuth";
import Button from "./Button";

const UserRoleSwitcher = () => {
  const { user, updateUser, showToast } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 16, y: 16 }); // bottom-right default

  // Check if dev mode or show switcher
  useEffect(() => {
    const isDev =
      import.meta.env.DEV || window.location.hostname === "localhost";
    const showSwitcher =
      localStorage.getItem("vridix_show_role_switcher") === "true";
    setIsVisible(isDev || showSwitcher);
  }, []);

  const switchToRole = (roleData) => {
    updateUser(roleData);
    showToast(`Successfully switched to ${roleData.role}!`, "success");
    setIsExpanded(false); // Auto-collapse after switch
  };

  const toggleSwitcher = useCallback(() => {
    const newVisibility = !isVisible;
    setIsVisible(newVisibility);
    localStorage.setItem("vridix_show_role_switcher", newVisibility.toString());
    if (newVisibility) {
      showToast("Role Switcher enabled", "info");
    } else {
      showToast("Role Switcher hidden", "info");
      setIsExpanded(false);
    }
  }, [isVisible, showToast]);

  const roles = [
    {
      role: "Investor",
      name: "Investor Visioner",
      walletAddress: "0xInvestorWalletAddress...1234",
      saldoFiat: 15000000,
      email: "investor@vridix.com",
      description: "Demo investor account",
      icon: "💰",
    },
    {
      role: "Petani",
      name: "Petani Inovatif",
      walletAddress: "0xPetaniWalletAddress...5678",
      saldoFiat: 2500000,
      statusVerifikasi: "approved",
      email: "petani@vridix.com",
      description: "Verified farmer account",
      icon: "🌾",
    },
    {
      role: "Admin",
      name: "Admin Utama",
      walletAddress: "0xAdminWalletAddress...9012",
      saldoFiat: 0,
      email: "admin@vridix.com",
      description: "Administrator account",
      icon: "👑",
    },
    {
      role: "User",
      name: "Regular User",
      walletAddress: "0xUserWalletAddress...3456",
      saldoFiat: 1000000,
      email: "user@vridix.com",
      description: "Regular user account",
      icon: "👤",
    },
  ];

  // Keyboard shortcut to toggle (Ctrl+Shift+R)
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === "R") {
        e.preventDefault();
        toggleSwitcher();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [toggleSwitcher]);

  // Handle drag functionality
  const handleMouseDown = (e) => {
    if (e.target.closest(".role-switcher-content")) return; // Don't drag when clicking content
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const handleMouseMove = (e) => {
      const newX = Math.max(
        0,
        Math.min(window.innerWidth - 300, e.clientX - offsetX)
      );
      const newY = Math.max(
        0,
        Math.min(window.innerHeight - 200, e.clientY - offsetY)
      );
      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  if (!user) return null;

  // Hidden toggle button (always visible for access)
  const ToggleButton = () => (
    <button
      onClick={toggleSwitcher}
      className="fixed top-4 right-4 w-8 h-8 bg-gray-800 hover:bg-gray-700 text-white rounded-full text-xs font-bold z-[60] opacity-20 hover:opacity-100 transition-opacity duration-300"
      title="Toggle Role Switcher (Ctrl+Shift+R)"
    >
      🔄
    </button>
  );

  if (!isVisible) {
    return <ToggleButton />;
  }

  return (
    <>
      <ToggleButton />
      <div
        className={`fixed bg-gray-900 border-2 border-gray-600 rounded-lg shadow-2xl z-50 transition-all duration-300 ${
          isDragging ? "cursor-grabbing scale-105" : "cursor-grab"
        } ${isExpanded ? "w-80" : "w-64"}`}
        style={{
          right: `${position.x}px`,
          bottom: `${position.y}px`,
          maxWidth: "calc(100vw - 32px)",
          maxHeight: "calc(100vh - 32px)",
        }}
        onMouseDown={handleMouseDown}
      >
        {/* Header */}
        <div className="role-switcher-content p-4 border-b border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-white font-bold flex items-center gap-2">
              <span className="animate-spin text-lg">🔄</span>
              Role Switcher
              <span className="bg-yellow-600 text-yellow-100 px-2 py-0.5 rounded-full text-xs font-bold">
                DEV
              </span>
            </h4>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-gray-400 hover:text-white text-sm p-1 rounded"
                title="Expand/Collapse"
              >
                {isExpanded ? "📐" : "📏"}
              </button>
              <button
                onClick={toggleSwitcher}
                className="text-gray-400 hover:text-white text-sm p-1 rounded"
                title="Hide Switcher"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="text-gray-400 text-xs">
            <p className="mb-1">
              <span className="text-green-400">Current:</span> {user.role} -{" "}
              {user.name}
            </p>
            {isExpanded && (
              <p className="text-gray-500">
                💡 Drag to move • Ctrl+Shift+R to toggle
              </p>
            )}
          </div>
        </div>

        {/* Role Buttons */}
        <div className="role-switcher-content p-4">
          <div className="space-y-2">
            {roles.map((roleData) => {
              const isCurrentRole = user.role === roleData.role;
              return (
                <button
                  key={roleData.role}
                  onClick={() => switchToRole(roleData)}
                  disabled={isCurrentRole}
                  className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                    isCurrentRole
                      ? "bg-green-600 border-green-500 text-white cursor-default"
                      : "bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500 hover:text-white"
                  } ${isCurrentRole ? "" : "hover:scale-105"}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{roleData.icon}</span>
                    <div className="flex-1">
                      <div className="font-medium flex items-center gap-2">
                        {roleData.role}
                        {isCurrentRole && (
                          <span className="text-green-200 text-xs">
                            ✓ Active
                          </span>
                        )}
                      </div>
                      {isExpanded && (
                        <div className="text-xs text-gray-400 mt-1">
                          {roleData.description}
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Actions */}
          {isExpanded && (
            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="text-xs text-gray-400 mb-2">Quick Actions:</div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white text-xs py-1 px-2 rounded transition-colors"
                >
                  🗑️ Reset
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      JSON.stringify(user, null, 2)
                    );
                    showToast("User data copied to clipboard", "info");
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs py-1 px-2 rounded transition-colors"
                >
                  📋 Copy
                </button>
              </div>
            </div>
          )}

          {/* Info */}
          <div className="mt-4 pt-4 border-t border-gray-700 text-xs text-gray-500">
            <div className="flex justify-between items-center">
              <span>Development Tool</span>
              <span className="text-gray-600">v1.0</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserRoleSwitcher;
