// src/pages/QRISPaymentPage.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Alert,
  Divider,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Tab,
  Tabs,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import HistoryIcon from "@mui/icons-material/History";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import RefreshIcon from "@mui/icons-material/Refresh";
import QRISScanner from "../components/payment/QRISScanner";
import QRISPayment from "../components/payment/QRISPayment";
import qrisService from "../services/qrisService";
import { useAuth } from "../hooks/useAuth";

const StyledCard = styled(Card)(({ theme }) => ({
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: "white",
  borderRadius: theme.spacing(2),
  padding: theme.spacing(3),
}));

const TransactionCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  "&:hover": {
    boxShadow: theme.shadows[4],
  },
}));

const QRISPaymentPage = () => {
  const { user } = useAuth();
  const [scannerOpen, setScannerOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [qrisData, setQrisData] = useState(null);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [tabValue, setTabValue] = useState(0);

  const fetchBalance = async () => {
    try {
      const result = await qrisService.getUserBalance(user.id);
      setBalance(result.balance || 0);
    } catch (err) {
      console.error("Error fetching balance:", err);
    }
  };

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const result = await qrisService.getTransactionHistory(user.id);
      setTransactions(result.transactions || []);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchBalance();
      fetchTransactions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleScanSuccess = (data) => {
    setQrisData(data);
    setPaymentOpen(true);
  };

  const handlePaymentSuccess = () => {
    setSuccess("Pembayaran berhasil!");
    fetchBalance();
    fetchTransactions();

    setTimeout(() => {
      setSuccess("");
    }, 3000);
  };

  const handleRefresh = () => {
    fetchBalance();
    fetchTransactions();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTransactionIcon = (type) => {
    return type === "debit" ? (
      <ArrowUpwardIcon color="error" />
    ) : (
      <ArrowDownwardIcon color="success" />
    );
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5", py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            QRIS Payment
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Bayar dengan mudah menggunakan saldo investasi Anda
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert
            severity="success"
            sx={{ mb: 2 }}
            onClose={() => setSuccess("")}
          >
            {success}
          </Alert>
        )}

        <Grid container spacing={3}>
          {/* Balance Card */}
          <Grid item xs={12} md={6}>
            <StyledCard elevation={8}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="start"
              >
                <Box>
                  <Typography variant="subtitle2" sx={{ opacity: 0.8, mb: 1 }}>
                    Saldo Tersedia
                  </Typography>
                  <Typography variant="h3" fontWeight={700}>
                    Rp {balance.toLocaleString("id-ID")}
                  </Typography>
                </Box>
                <Avatar
                  sx={{
                    bgcolor: "rgba(255,255,255,0.2)",
                    width: 56,
                    height: 56,
                  }}
                >
                  <AccountBalanceWalletIcon fontSize="large" />
                </Avatar>
              </Box>

              <Divider sx={{ my: 3, bgcolor: "rgba(255,255,255,0.2)" }} />

              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={<QrCodeScannerIcon />}
                onClick={() => setScannerOpen(true)}
                sx={{
                  bgcolor: "white",
                  color: "#667eea",
                  fontWeight: 600,
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.9)",
                  },
                }}
              >
                Scan QRIS untuk Bayar
              </Button>
            </StyledCard>
          </Grid>

          {/* Quick Actions */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Aksi Cepat
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  Kelola saldo dan transaksi Anda
                </Typography>

                <Box display="flex" flexDirection="column" gap={2}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<AccountBalanceWalletIcon />}
                    onClick={() => (window.location.href = "/dashboard")}
                  >
                    Lihat Investasi
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<RefreshIcon />}
                    onClick={handleRefresh}
                  >
                    Refresh Saldo
                  </Button>
                </Box>

                <Box
                  sx={{ mt: 3, p: 2, bgcolor: "primary.50", borderRadius: 2 }}
                >
                  <Typography
                    variant="subtitle2"
                    color="primary"
                    fontWeight={600}
                  >
                    💡 Tips
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    Hasil investasi Anda dapat langsung digunakan untuk
                    pembayaran QRIS di merchant yang bekerja sama dengan Vridix.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Transaction History */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                >
                  <Box>
                    <Typography variant="h6" fontWeight={600}>
                      Riwayat Transaksi
                    </Typography>
                  </Box>
                  <IconButton onClick={handleRefresh} size="small">
                    <RefreshIcon />
                  </IconButton>
                </Box>

                <Tabs
                  value={tabValue}
                  onChange={(e, v) => setTabValue(v)}
                  sx={{ mb: 2 }}
                >
                  <Tab label="Semua" />
                  <Tab label="Pembayaran" />
                  <Tab label="Top Up" />
                </Tabs>

                {loading ? (
                  <Box display="flex" justifyContent="center" py={4}>
                    <Typography color="text.secondary">
                      Memuat transaksi...
                    </Typography>
                  </Box>
                ) : transactions.length === 0 ? (
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    py={4}
                  >
                    <HistoryIcon
                      sx={{ fontSize: 64, color: "text.disabled", mb: 2 }}
                    />
                    <Typography color="text.secondary">
                      Belum ada transaksi
                    </Typography>
                  </Box>
                ) : (
                  <List>
                    {transactions.map((transaction, index) => (
                      <TransactionCard key={index}>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar
                              sx={{
                                bgcolor:
                                  transaction.type === "debit"
                                    ? "error.light"
                                    : "success.light",
                              }}
                            >
                              {getTransactionIcon(transaction.type)}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                              >
                                <Typography
                                  variant="subtitle1"
                                  fontWeight={600}
                                >
                                  {transaction.description ||
                                    transaction.merchantName}
                                </Typography>
                                <Typography
                                  variant="h6"
                                  color={
                                    transaction.type === "debit"
                                      ? "error.main"
                                      : "success.main"
                                  }
                                  fontWeight={600}
                                >
                                  {transaction.type === "debit" ? "-" : "+"}Rp{" "}
                                  {transaction.amount.toLocaleString("id-ID")}
                                </Typography>
                              </Box>
                            }
                            secondary={
                              <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                mt={1}
                              >
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {formatDate(transaction.timestamp)}
                                </Typography>
                                <Chip
                                  label={transaction.status}
                                  size="small"
                                  color={
                                    transaction.status === "success"
                                      ? "success"
                                      : "default"
                                  }
                                  variant="outlined"
                                />
                              </Box>
                            }
                          />
                        </ListItem>
                      </TransactionCard>
                    ))}
                  </List>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* QRIS Scanner Dialog */}
      <QRISScanner
        open={scannerOpen}
        onClose={() => setScannerOpen(false)}
        onSuccess={handleScanSuccess}
      />

      {/* QRIS Payment Dialog */}
      <QRISPayment
        open={paymentOpen}
        onClose={() => setPaymentOpen(false)}
        qrisData={qrisData}
        onSuccess={handlePaymentSuccess}
      />
    </Box>
  );
};

export default QRISPaymentPage;
