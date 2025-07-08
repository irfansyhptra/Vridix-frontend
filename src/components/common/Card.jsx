// src/components/common/Card.jsx
import React from "react";

const Card = ({ children, className = "" }) => {
  return (
    <div className={`bg-gray-800 rounded-xl shadow-lg p-6 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
