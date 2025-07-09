// src/components/common/Button.jsx
import React from "react";

const Button = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
  type = "button",
  size = "md",
}) => {
  const baseStyles =
    "font-bold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none";

  const variants = {
    primary: "bg-green-600 hover:bg-green-700 text-white",
    secondary:
      "bg-gray-700 hover:bg-gray-600 text-white dark:bg-gray-600 dark:hover:bg-gray-500",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    ghost:
      "bg-transparent hover:bg-gray-100 text-green-600 border border-green-600 dark:hover:bg-gray-800 dark:text-green-400",
    outline:
      "bg-transparent border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white dark:text-green-400 dark:border-green-400 dark:hover:bg-green-400 dark:hover:text-gray-900",
  };

  const sizes = {
    sm: "py-1 px-3 text-sm",
    md: "py-2 px-6 text-base",
    lg: "py-3 px-8 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
