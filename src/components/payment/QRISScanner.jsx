// src/components/payment/QRISScanner.jsx
import React, { useState } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
  Alert,
  CircularProgress,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import { QRScanner } from "../common/QRScanner";
import qrisService from "../../services/qrisService";

const QRISScanner = ({ open, onClose, onSuccess }) => {
  const [scanning, setScanning] = useState(false);
  const [qrisData, setQrisData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [manualCode, setManualCode] = useState("");

  const handleScan = async (data) => {
    if (data) {
      setScanning(false);
      setLoading(true);
      setError("");

      try {
        const result = await qrisService.scanQRIS(data);
        setQrisData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleManualSubmit = async () => {
    if (!manualCode.trim()) {
      setError("Masukkan kode QRIS");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await qrisService.scanQRIS(manualCode);
      setQrisData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setScanning(false);
    setQrisData(null);
    setError("");
    setManualCode("");
    onClose();
  };

  const handleConfirmPayment = () => {
    if (qrisData) {
      onSuccess(qrisData);
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={1}>
            <QrCodeScannerIcon color="primary" />
            <Typography variant="h6">Scan QRIS</Typography>
          </Box>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>
            {error}
          </Alert>
        )}

        {!qrisData ? (
          <Box>
            {scanning ? (
              <Box>
                <QRScanner
                  onScan={handleScan}
                  onError={(err) => setError(err.message)}
                />
                <Button
                  fullWidth
                  onClick={() => setScanning(false)}
                  sx={{ mt: 2 }}
                >
                  Batal Scan
                </Button>
              </Box>
            ) : (
              <Box>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<QrCodeScannerIcon />}
                  onClick={() => setScanning(true)}
                  sx={{ mb: 3 }}
                >
                  Buka Scanner
                </Button>

                <Typography variant="body2" align="center" sx={{ mb: 2 }}>
                  atau masukkan kode manual
                </Typography>

                <TextField
                  fullWidth
                  label="Kode QRIS"
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                  placeholder="Masukkan kode QRIS"
                  sx={{ mb: 2 }}
                />

                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handleManualSubmit}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : "Submit"}
                </Button>
              </Box>
            )}
          </Box>
        ) : (
          <Box>
            <Alert severity="success" sx={{ mb: 2 }}>
              QRIS berhasil di-scan!
            </Alert>

            <Box sx={{ bgcolor: "background.paper", p: 2, borderRadius: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Merchant
              </Typography>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {qrisData.merchantName}
              </Typography>

              <Typography variant="subtitle2" color="text.secondary">
                Jumlah Pembayaran
              </Typography>
              <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
                Rp {qrisData.amount?.toLocaleString("id-ID")}
              </Typography>

              {qrisData.description && (
                <>
                  <Typography variant="subtitle2" color="text.secondary">
                    Deskripsi
                  </Typography>
                  <Typography variant="body1">
                    {qrisData.description}
                  </Typography>
                </>
              )}
            </Box>
          </Box>
        )}
      </DialogContent>

      {qrisData && (
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleClose}>Batal</Button>
          <Button
            variant="contained"
            onClick={handleConfirmPayment}
            disabled={loading}
          >
            Lanjutkan Pembayaran
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default QRISScanner;
