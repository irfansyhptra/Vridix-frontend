// src/components/dashboard/TrackingResult.jsx
import React from "react";
import Card from "../common/Card";

const TrackingResult = ({ result }) => {
  return (
    <Card>
      <h3 className="text-2xl font-bold mb-4 text-white">Hasil Pelacakan</h3>
      <div className="border-l-2 border-green-500 pl-4 space-y-6">
        {result.timeline.map((item, index) => (
          <div key={index} className="relative">
            <div className="absolute -left-5 w-3 h-3 bg-green-500 rounded-full top-1.5"></div>
            <p className="font-bold text-green-400">{item.status}</p>
            <p className="text-sm text-gray-400">{item.date}</p>
            <p className="text-gray-300">{item.description}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TrackingResult;
