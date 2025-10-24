// src/components/payment/QRISPayment.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  IconButton,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import QrCodeIcon from "@mui/icons-material/QrCode";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import qrisService from "../../services/qrisService";
import { useAuth } from "../../hooks/useAuth";

const QRISPayment = ({ open, onClose, qrisData, onSuccess }) => {
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState("balance");
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const fetchBalance = async () => {
    setLoading(true);
    try {
      const result = await qrisService.getUserBalance(user.id);
      setBalance(result.balance || 0);
    } catch (err) {
      setError("Gagal mengambil saldo");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open && user) {
      fetchBalance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, user]);

  const handlePayment = async () => {
    if (balance < qrisData.amount) {
      setError("Saldo tidak mencukupi");
      return;
    }

    setProcessing(true);
    setError("");

    try {
      const result = await qrisService.payWithBalance(qrisData, user.id);
      setSuccess(true);

      // Wait 2 seconds then call success callback
      setTimeout(() => {
        onSuccess(result);
        handleClose();
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  };

  const handleClose = () => {
    setPaymentMethod("balance");
    setError("");
    setSuccess(false);
    onClose();
  };

  const isBalanceSufficient = balance >= qrisData?.amount;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={1}>
            <QrCodeIcon color="primary" />
            <Typography variant="h6">Konfirmasi Pembayaran</Typography>
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

        {success && (
          <Alert severity="success" icon={<CheckCircleIcon />} sx={{ mb: 2 }}>
            Pembayaran berhasil!
          </Alert>
        )}

        {/* Payment Details */}
        <Box sx={{ bgcolor: "background.paper", p: 3, borderRadius: 2, mb: 3 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Merchant
          </Typography>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {qrisData?.merchantName}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Box display="flex" justifyContent="space-between" sx={{ mb: 1 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Jumlah Pembayaran
            </Typography>
            <Typography variant="h6" color="primary">
              Rp {qrisData?.amount?.toLocaleString("id-ID")}
            </Typography>
          </Box>

          {qrisData?.description && (
            <Box sx={{ mt: 2 }}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                Deskripsi
              </Typography>
              <Typography variant="body2">{qrisData.description}</Typography>
            </Box>
          )}
        </Box>

        {/* Payment Method Selection */}
        <FormControl component="fieldset" fullWidth sx={{ mb: 3 }}>
          <FormLabel component="legend" sx={{ mb: 2 }}>
            Metode Pembayaran
          </FormLabel>
          <RadioGroup
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <Box
              sx={{
                border: "1px solid",
                borderColor:
                  paymentMethod === "balance" ? "primary.main" : "divider",
                borderRadius: 2,
                p: 2,
                mb: 2,
                cursor: "pointer",
                bgcolor:
                  paymentMethod === "balance" ? "primary.50" : "transparent",
              }}
              onClick={() => setPaymentMethod("balance")}
            >
              <FormControlLabel
                value="balance"
                control={<Radio />}
                label={
                  <Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <AccountBalanceWalletIcon color="primary" />
                      <Typography variant="subtitle1" fontWeight={600}>
                        Saldo Investasi Vridix
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1} mt={1}>
                      <Typography variant="body2" color="text.secondary">
                        Saldo Tersedia:
                      </Typography>
                      <Typography
                        variant="body1"
                        fontWeight={600}
                        color={
                          isBalanceSufficient ? "success.main" : "error.main"
                        }
                      >
                        Rp {balance.toLocaleString("id-ID")}
                      </Typography>
                      {!isBalanceSufficient && (
                        <Chip
                          label="Saldo tidak cukup"
                          size="small"
                          color="error"
                          variant="outlined"
                        />
                      )}
                    </Box>
                  </Box>
                }
              />
            </Box>
          </RadioGroup>
        </FormControl>

        {/* Balance Info */}
        {!isBalanceSufficient && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            Saldo Anda tidak mencukupi. Silakan tarik hasil investasi terlebih
            dahulu atau top up saldo Anda.
          </Alert>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={handleClose} disabled={processing}>
          Batal
        </Button>
        <Button
          variant="contained"
          onClick={handlePayment}
          disabled={processing || !isBalanceSufficient || loading || success}
          startIcon={processing ? <CircularProgress size={20} /> : null}
        >
          {processing ? "Memproses..." : "Bayar Sekarang"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QRISPayment;
