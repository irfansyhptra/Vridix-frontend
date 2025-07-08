// src/components/common/Button.jsx
import React from "react";

const Button = ({ children, onClick, variant = "primary", className = "" }) => {
  const baseStyles =
    "font-bold py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105";

  const variants = {
    primary: "bg-green-600 hover:bg-green-700 text-white",
    secondary: "bg-gray-700 hover:bg-gray-600 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    ghost: "bg-transparent hover:bg-gray-800 text-green-400",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
