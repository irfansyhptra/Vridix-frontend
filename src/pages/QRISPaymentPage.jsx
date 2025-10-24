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
  Paper,
  Stack,
  Fade,
  Slide,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import HistoryIcon from "@mui/icons-material/History";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import RefreshIcon from "@mui/icons-material/Refresh";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import QRISScanner from "../components/payment/QRISScanner";
import QRISPayment from "../components/payment/QRISPayment";
import qrisService from "../services/qrisService";
import { useAuth } from "../hooks/useAuth";

// Glass Morphism Balance Card
const GlassBalanceCard = styled(Card)(({ theme }) => ({
  background:
    "linear-gradient(135deg, rgba(102, 126, 234, 0.95) 0%, rgba(118, 75, 162, 0.95) 100%)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  borderRadius: theme.spacing(3),
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  padding: theme.spacing(4),
  color: "white",
  position: "relative",
  overflow: "hidden",
  transition: "all 0.3s ease-in-out",
  "&::before": {
    content: '""',
    position: "absolute",
    top: -50,
    right: -50,
    width: 200,
    height: 200,
    background:
      "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)",
    borderRadius: "50%",
  },
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 12px 48px 0 rgba(31, 38, 135, 0.5)",
  },
}));

// Premium Action Card
const PremiumActionCard = styled(Card)(({ theme }) => ({
  background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
  borderRadius: theme.spacing(3),
  boxShadow: "0 4px 20px 0 rgba(0, 0, 0, 0.08)",
  border: "1px solid rgba(0, 0, 0, 0.05)",
  height: "100%",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.12)",
    transform: "translateY(-3px)",
  },
}));

// Modern Transaction Card
const ModernTransactionCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  borderRadius: theme.spacing(2),
  border: "1px solid rgba(0, 0, 0, 0.06)",
  transition: "all 0.3s ease-in-out",
  background: "#ffffff",
  "&:hover": {
    boxShadow: "0 4px 20px 0 rgba(102, 126, 234, 0.15)",
    transform: "translateX(5px)",
    borderColor: "rgba(102, 126, 234, 0.3)",
  },
}));

// Premium Button
const PremiumButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  padding: "14px 28px",
  fontSize: "1rem",
  fontWeight: 600,
  textTransform: "none",
  boxShadow: "0 4px 14px 0 rgba(102, 126, 234, 0.4)",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    boxShadow: "0 6px 20px 0 rgba(102, 126, 234, 0.6)",
    transform: "translateY(-2px)",
  },
}));

// Info Box with Glass Effect
const InfoBox = styled(Box)(({ theme }) => ({
  background:
    "linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(102, 126, 234, 0.1)",
  borderRadius: theme.spacing(2),
  padding: theme.spacing(2.5),
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
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%)",
        position: "relative",
        py: 6,
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "400px",
          background:
            "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)",
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Elegant Header */}
        <Fade in timeout={800}>
          <Box sx={{ mb: 5 }}>
            <Stack spacing={1}>
              <Typography
                variant="h3"
                fontWeight={800}
                sx={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: "-0.5px",
                }}
              >
                QRIS Payment
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                fontWeight={400}
                sx={{ opacity: 0.8 }}
              >
                Kelola pembayaran digital Anda dengan mudah dan aman
              </Typography>
            </Stack>
          </Box>
        </Fade>

        {error && (
          <Slide direction="down" in mountOnEnter unmountOnExit>
            <Alert
              severity="error"
              sx={{
                mb: 3,
                borderRadius: 2,
                boxShadow: "0 4px 20px rgba(211, 47, 47, 0.15)",
              }}
              onClose={() => setError("")}
            >
              {error}
            </Alert>
          </Slide>
        )}

        {success && (
          <Slide direction="down" in mountOnEnter unmountOnExit>
            <Alert
              severity="success"
              sx={{
                mb: 3,
                borderRadius: 2,
                boxShadow: "0 4px 20px rgba(46, 125, 50, 0.15)",
              }}
              onClose={() => setSuccess("")}
            >
              {success}
            </Alert>
          </Slide>
        )}

        <Grid container spacing={4}>
          {/* Premium Balance Card */}
          <Grid item xs={12} md={6}>
            <Fade in timeout={1000}>
              <GlassBalanceCard elevation={0}>
                <Stack spacing={3}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="start"
                  >
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{
                          opacity: 0.9,
                          fontSize: "0.875rem",
                          letterSpacing: "1px",
                        }}
                      >
                        SALDO TERSEDIA
                      </Typography>
                      <Typography
                        variant="h2"
                        fontWeight={800}
                        sx={{
                          mt: 1,
                          fontSize: { xs: "2.5rem", md: "3rem" },
                          letterSpacing: "-1px",
                        }}
                      >
                        Rp {balance.toLocaleString("id-ID")}
                      </Typography>
                    </Box>
                    <Avatar
                      sx={{
                        bgcolor: "rgba(255,255,255,0.25)",
                        width: 64,
                        height: 64,
                        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      }}
                    >
                      <AccountBalanceWalletIcon
                        fontSize="large"
                        sx={{ fontSize: 32 }}
                      />
                    </Avatar>
                  </Box>

                  <Divider sx={{ bgcolor: "rgba(255,255,255,0.25)", my: 2 }} />

                  <PremiumButton
                    fullWidth
                    variant="contained"
                    size="large"
                    startIcon={<QrCodeScannerIcon />}
                    onClick={() => setScannerOpen(true)}
                    sx={{
                      bgcolor: "white",
                      color: "#667eea",
                      fontWeight: 700,
                      "&:hover": {
                        bgcolor: "rgba(255,255,255,0.95)",
                      },
                    }}
                  >
                    Scan QRIS untuk Bayar
                  </PremiumButton>
                </Stack>
              </GlassBalanceCard>
            </Fade>
          </Grid>

          {/* Premium Quick Actions */}
          <Grid item xs={12} md={6}>
            <Fade in timeout={1200}>
              <PremiumActionCard elevation={0}>
                <CardContent sx={{ p: 4 }}>
                  <Stack spacing={3}>
                    <Box>
                      <Typography variant="h5" fontWeight={700} gutterBottom>
                        Aksi Cepat
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ opacity: 0.8 }}
                      >
                        Kelola saldo dan transaksi Anda dengan mudah
                      </Typography>
                    </Box>

                    <Stack spacing={2}>
                      <Button
                        variant="outlined"
                        fullWidth
                        size="large"
                        startIcon={<TrendingUpIcon />}
                        onClick={() => (window.location.href = "/dashboard")}
                        sx={{
                          borderRadius: 2,
                          py: 1.5,
                          borderColor: "rgba(102, 126, 234, 0.3)",
                          color: "#667eea",
                          fontWeight: 600,
                          textTransform: "none",
                          "&:hover": {
                            borderColor: "#667eea",
                            bgcolor: "rgba(102, 126, 234, 0.05)",
                          },
                        }}
                      >
                        Lihat Investasi
                      </Button>
                      <Button
                        variant="outlined"
                        fullWidth
                        size="large"
                        startIcon={<RefreshIcon />}
                        onClick={handleRefresh}
                        sx={{
                          borderRadius: 2,
                          py: 1.5,
                          borderColor: "rgba(102, 126, 234, 0.3)",
                          color: "#667eea",
                          fontWeight: 600,
                          textTransform: "none",
                          "&:hover": {
                            borderColor: "#667eea",
                            bgcolor: "rgba(102, 126, 234, 0.05)",
                          },
                        }}
                      >
                        Refresh Saldo
                      </Button>
                    </Stack>

                    <InfoBox>
                      <Stack spacing={1}>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography
                            variant="subtitle1"
                            fontWeight={700}
                            color="primary"
                          >
                            💡 Tips Penggunaan
                          </Typography>
                        </Box>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ lineHeight: 1.7 }}
                        >
                          Hasil investasi Anda dapat langsung digunakan untuk
                          pembayaran QRIS di merchant yang bekerja sama dengan
                          Vridix. Aman, cepat, dan praktis!
                        </Typography>
                      </Stack>
                    </InfoBox>
                  </Stack>
                </CardContent>
              </PremiumActionCard>
            </Fade>
          </Grid>

          {/* Premium Transaction History */}
          <Grid item xs={12}>
            <Fade in timeout={1400}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: "0 4px 20px 0 rgba(0, 0, 0, 0.08)",
                  border: "1px solid rgba(0, 0, 0, 0.05)",
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={3}
                  >
                    <Box>
                      <Typography variant="h5" fontWeight={700} gutterBottom>
                        Riwayat Transaksi
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {transactions.length} transaksi ditemukan
                      </Typography>
                    </Box>
                    <IconButton
                      onClick={handleRefresh}
                      sx={{
                        bgcolor: "rgba(102, 126, 234, 0.1)",
                        "&:hover": { bgcolor: "rgba(102, 126, 234, 0.2)" },
                      }}
                    >
                      <RefreshIcon sx={{ color: "#667eea" }} />
                    </IconButton>
                  </Box>

                  <Tabs
                    value={tabValue}
                    onChange={(e, v) => setTabValue(v)}
                    sx={{
                      mb: 3,
                      "& .MuiTab-root": {
                        textTransform: "none",
                        fontWeight: 600,
                        fontSize: "1rem",
                        minWidth: 120,
                      },
                      "& .Mui-selected": {
                        color: "#667eea",
                      },
                      "& .MuiTabs-indicator": {
                        bgcolor: "#667eea",
                        height: 3,
                        borderRadius: "3px 3px 0 0",
                      },
                    }}
                  >
                    <Tab label="Semua" />
                    <Tab label="Pembayaran" />
                    <Tab label="Top Up" />
                  </Tabs>

                  {loading ? (
                    <Box display="flex" justifyContent="center" py={8}>
                      <Stack spacing={2} alignItems="center">
                        <RefreshIcon
                          sx={{
                            fontSize: 48,
                            color: "primary.main",
                            animation: "spin 1s linear infinite",
                            "@keyframes spin": {
                              "0%": { transform: "rotate(0deg)" },
                              "100%": { transform: "rotate(360deg)" },
                            },
                          }}
                        />
                        <Typography color="text.secondary" fontWeight={500}>
                          Memuat transaksi...
                        </Typography>
                      </Stack>
                    </Box>
                  ) : transactions.length === 0 ? (
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      py={8}
                    >
                      <HistoryIcon
                        sx={{
                          fontSize: 80,
                          color: "text.disabled",
                          mb: 2,
                          opacity: 0.3,
                        }}
                      />
                      <Typography
                        variant="h6"
                        color="text.secondary"
                        fontWeight={600}
                      >
                        Belum ada transaksi
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 1 }}
                      >
                        Mulai bertransaksi dengan scan QRIS
                      </Typography>
                    </Box>
                  ) : (
                    <List sx={{ p: 0 }}>
                      {transactions.map((transaction, index) => (
                        <Fade in timeout={200 * (index + 1)} key={index}>
                          <ModernTransactionCard elevation={0}>
                            <ListItem sx={{ px: 0 }}>
                              <ListItemAvatar>
                                <Avatar
                                  sx={{
                                    bgcolor:
                                      transaction.type === "debit"
                                        ? "rgba(211, 47, 47, 0.1)"
                                        : "rgba(46, 125, 50, 0.1)",
                                    color:
                                      transaction.type === "debit"
                                        ? "error.main"
                                        : "success.main",
                                    width: 56,
                                    height: 56,
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
                                    <Typography variant="h6" fontWeight={700}>
                                      {transaction.description ||
                                        transaction.merchantName}
                                    </Typography>
                                    <Typography
                                      variant="h5"
                                      color={
                                        transaction.type === "debit"
                                          ? "error.main"
                                          : "success.main"
                                      }
                                      fontWeight={800}
                                    >
                                      {transaction.type === "debit"
                                        ? "- "
                                        : "+ "}
                                      Rp{" "}
                                      {transaction.amount.toLocaleString(
                                        "id-ID"
                                      )}
                                    </Typography>
                                  </Box>
                                }
                                secondary={
                                  <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    mt={1.5}
                                  >
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                      fontWeight={500}
                                    >
                                      {formatDate(transaction.timestamp)}
                                    </Typography>
                                    <Chip
                                      label={
                                        transaction.status === "success"
                                          ? "Berhasil"
                                          : "Pending"
                                      }
                                      size="small"
                                      sx={{
                                        bgcolor:
                                          transaction.status === "success"
                                            ? "rgba(46, 125, 50, 0.1)"
                                            : "rgba(158, 158, 158, 0.1)",
                                        color:
                                          transaction.status === "success"
                                            ? "success.main"
                                            : "text.secondary",
                                        fontWeight: 600,
                                        borderRadius: 1.5,
                                      }}
                                    />
                                  </Box>
                                }
                              />
                            </ListItem>
                          </ModernTransactionCard>
                        </Fade>
                      ))}
                    </List>
                  )}
                </CardContent>
              </Card>
            </Fade>
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
