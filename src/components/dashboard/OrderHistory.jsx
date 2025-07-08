// src/components/dashboard/OrderHistory.jsx
import React from "react";
import Card from "../common/Card";

const OrderHistory = ({ order }) => {
  return (
    <Card className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-400">{order.date}</p>
        <h4 className="font-bold text-lg text-blue-400">{order.productName}</h4>
        <p className="text-sm text-gray-300">ID Pesanan: {order.id}</p>
      </div>
      <div className="text-right">
        <p className="text-lg font-bold text-white">
          Rp {order.total.toLocaleString()}
        </p>
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            order.status === "Selesai"
              ? "bg-green-500/20 text-green-400"
              : "bg-yellow-500/20 text-yellow-400"
          }`}
        >
          {order.status}
        </span>
      </div>
    </Card>
  );
};

export default OrderHistory;
