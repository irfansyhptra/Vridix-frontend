// src/components/common/QRScanner.jsx
import React, { useState, useRef, useEffect } from "react";
import QRCode from "qrcode";

const QRCodeGenerator = ({ value, size = 128 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (value && canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, value, {
        width: size,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      });
    }
  }, [value, size]);

  return <canvas ref={canvasRef} className="border rounded-lg" />;
};

const QRScanner = ({ onScan, onClose }) => {
  const [scanResult, setScanResult] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [manualInput, setManualInput] = useState("");
  const [error, setError] = useState("");

  const handleScan = (result) => {
    if (result) {
      setScanResult(result);
      setError("");
      if (onScan) {
        onScan(result);
      }
    }
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (manualInput.trim()) {
      handleScan(manualInput.trim());
    } else {
      setError("Silakan masukkan kode produk");
    }
  };

  const startCamera = async () => {
    try {
      setIsScanning(true);
      setError("");
      // Note: Actual camera implementation would go here
      // For now, we'll simulate a scan result
      setTimeout(() => {
        const mockResult = "VRDX-BERAS-001";
        handleScan(mockResult);
        setIsScanning(false);
      }, 2000);
    } catch (error) {
      console.error("Camera access error:", error);
      setError("Tidak dapat mengakses kamera. Silakan gunakan input manual.");
      setIsScanning(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Scanner QR Code
        </h3>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Scanner Area */}
      <div className="mb-6">
        {isScanning ? (
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-8 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">
              Memindai QR Code...
            </p>
          </div>
        ) : (
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-8 text-center">
            <div className="text-6xl mb-4">📱</div>
            <button
              onClick={startCamera}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Mulai Scan QR Code
            </button>
          </div>
        )}
      </div>

      {/* Manual Input */}
      <div className="border-t dark:border-gray-700 pt-6">
        <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Atau Masukkan Kode Manual
        </h4>
        <form onSubmit={handleManualSubmit} className="flex gap-3">
          <input
            type="text"
            value={manualInput}
            onChange={(e) => setManualInput(e.target.value)}
            placeholder="Masukkan kode produk (contoh: VRDX-BERAS-001)"
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Lacak
          </button>
        </form>
      </div>

      {/* Scan Result */}
      {scanResult && (
        <div className="mt-6 p-4 bg-green-100 dark:bg-green-800 rounded-lg">
          <p className="text-green-800 dark:text-green-200">
            <strong>Kode Terdeteksi:</strong> {scanResult}
          </p>
        </div>
      )}
    </div>
  );
};

export { QRCodeGenerator, QRScanner };
export default QRScanner;
