// src/components/payment/WithdrawToBalance.jsx
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
  InputAdornment,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import qrisService from "../../services/qrisService";

const WithdrawToBalance = ({ open, onClose, project, userId, onSuccess }) => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleWithdraw = async () => {
    const withdrawAmount = parseFloat(amount);

    if (!withdrawAmount || withdrawAmount <= 0) {
      setError("Masukkan jumlah yang valid");
      return;
    }

    if (withdrawAmount > project.availableReturns) {
      setError("Jumlah melebihi dana yang tersedia");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await qrisService.withdrawToBalance(userId, project.id, withdrawAmount);
      setSuccess(true);

      setTimeout(() => {
        onSuccess();
        handleClose();
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setAmount("");
    setError("");
    setSuccess(false);
    onClose();
  };

  const handleMaxAmount = () => {
    setAmount(project.availableReturns.toString());
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={1}>
            <AccountBalanceWalletIcon color="primary" />
            <Typography variant="h6">Tarik ke Saldo</Typography>
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
          <Alert severity="success" sx={{ mb: 2 }}>
            Dana berhasil ditarik ke saldo!
          </Alert>
        )}

        {/* Project Info */}
        <Box sx={{ bgcolor: "background.paper", p: 2, borderRadius: 2, mb: 3 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Proyek
          </Typography>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {project?.title}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Box display="flex" justifyContent="space-between" sx={{ mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Hasil Investasi Tersedia
            </Typography>
            <Typography variant="body1" fontWeight={600} color="success.main">
              Rp {project?.availableReturns?.toLocaleString("id-ID")}
            </Typography>
          </Box>
        </Box>

        {/* Amount Input */}
        <TextField
          fullWidth
          label="Jumlah Penarikan"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">Rp</InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Button size="small" onClick={handleMaxAmount}>
                  Maksimal
                </Button>
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        <Alert severity="info" sx={{ mb: 2 }}>
          Dana yang ditarik akan masuk ke saldo Vridix Anda dan dapat digunakan
          untuk pembayaran QRIS.
        </Alert>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={handleClose} disabled={loading}>
          Batal
        </Button>
        <Button
          variant="contained"
          onClick={handleWithdraw}
          disabled={loading || success || !amount}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          {loading ? "Memproses..." : "Tarik Dana"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WithdrawToBalance;
