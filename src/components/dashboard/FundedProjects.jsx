// src/components/dashboard/FundedProject.jsx
import React, { useState } from "react";
import Card from "../common/Card";
import Button from "../common/Button";
import WithdrawToBalance from "../payment/WithdrawToBalance";

const FundedProject = ({ project, userId, onWithdrawSuccess }) => {
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const progress = 85; // Example progress

  // Calculate available returns (example: 10% of investment)
  const availableReturns = project.amount * 0.1;

  return (
    <>
      <Card className="flex items-center justify-between">
        <div className="flex-1">
          <h4 className="font-bold text-lg text-green-400">{project.name}</h4>
          <p className="text-sm text-gray-400">
            Investasi Anda: Rp {project.amount.toLocaleString()}
          </p>
          {availableReturns > 0 && (
            <p className="text-sm text-green-300 mt-1">
              Hasil Tersedia: Rp {availableReturns.toLocaleString()}
            </p>
          )}
        </div>
        <div className="w-1/3 text-right">
          <p className="text-sm text-gray-300 mb-1">
            Progres Proyek: {progress}%
          </p>
          <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          {availableReturns > 0 && (
            <Button
              variant="secondary"
              className="text-xs py-1 px-3"
              onClick={() => setWithdrawOpen(true)}
            >
              Tarik ke Saldo
            </Button>
          )}
        </div>
      </Card>

      <WithdrawToBalance
        open={withdrawOpen}
        onClose={() => setWithdrawOpen(false)}
        project={{ ...project, availableReturns }}
        userId={userId}
        onSuccess={() => {
          setWithdrawOpen(false);
          if (onWithdrawSuccess) onWithdrawSuccess();
        }}
      />
    </>
  );
};

export default FundedProject;
