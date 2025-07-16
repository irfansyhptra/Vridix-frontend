// src/pages/Home.jsx

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Chip,
  Avatar,
  Paper,
  Card,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import GrassIcon from "@mui/icons-material/Grass";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import PeopleIcon from "@mui/icons-material/People";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import InventoryIcon from "@mui/icons-material/Inventory";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { useAuth } from "../hooks/useAuth";
import { Globe } from "../components/magicui/globe";
import Lottie from "lottie-react";

// Custom styled components
const GradientTypography = styled(Typography)(() => ({
  background: "linear-gradient(90deg, #ffffff 0%, #4ade80 50%, #ffffff 100%)",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  color: "transparent",
  display: "inline-block",
  fontWeight: 800,
  textShadow: "0 0 30px rgba(255,255,255,0.1)",
}));

const SpaceCard = styled(Paper)(({ theme }) => ({
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  backdropFilter: "blur(10px)",
  borderRadius: theme.spacing(2),
  border: "1px solid rgba(255,255,255,0.1)",
  overflow: "hidden",
  position: "relative",
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 0 30px rgba(255,255,255,0.15)",
    "& .card-glow": {
      opacity: 0.8,
    },
  },
}));

const StyledFeatureCard = styled(Card)(({ theme }) => ({
  backgroundColor: "rgba(31, 41, 55, 0.8)",
  backdropFilter: "blur(8px)",
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow:
    "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.1)",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
  },
}));

const IconContainer = styled(Avatar)(({ theme }) => ({
  width: 70,
  height: 70,
  backgroundColor: "rgba(52, 211, 153, 0.2)",
  marginBottom: theme.spacing(2),
  color: "#4ade80",
  "& .MuiSvgIcon-root": {
    fontSize: "2.5rem",
  },
}));

const FeatureCard = ({ title, description, linkTo, linkText, icon, delay }) => {
  return (
    <Grid item xs={12} md={6} lg={3} data-aos="fade-up" data-aos-delay={delay}>
      <StyledFeatureCard elevation={5}>
        <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <IconContainer>{icon}</IconContainer>
          <Typography
            variant="h5"
            component="h3"
            sx={{ mb: 2, fontWeight: 700, color: "#4ade80" }}
          >
            {title}
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: "#9ca3af", flex: 1 }}>
            {description}
          </Typography>
          <Box>
            <Button
              component={Link}
              to={linkTo}
              variant="contained"
              fullWidth
              sx={{
                background: "linear-gradient(to right, #10b981, #059669)",
                color: "white",
                fontWeight: 600,
                py: 1.5,
                borderRadius: 2,
                textTransform: "none",
                "&:hover": {
                  background: "linear-gradient(to right, #059669, #047857)",
                },
              }}
            >
              {linkText}
            </Button>
          </Box>
        </CardContent>
      </StyledFeatureCard>
    </Grid>
  );
};

const Home = () => {
  const { user } = useAuth();
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const statsRef = useRef(null);
  const ctaRef = useRef(null);
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    // Initialize AOS animation library
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false,
      easing: "ease-out-cubic",
    });

    // Fetch Lottie animation data
    fetch("/lottie.json")
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Error loading animation:", error));
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#000000", color: "white" }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          py: 12,
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          background: "#000000",
          backgroundImage:
            "radial-gradient(circle at 25% 30%, rgba(5,150,105,0.1) 0%, rgba(0,0,0,0) 50%)",
        }}
        ref={heroRef}
      >
        {/* Globe as background */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            zIndex: 1,
            opacity: 0.6,
            animation: "fadeInGlobe 2s ease-in-out",
            "@keyframes fadeInGlobe": {
              "0%": { opacity: 0 },
              "100%": { opacity: 0.6 },
            },
          }}
        >
          <Globe
            className="absolute inset-0"
            config={{
              scale: 1.5,
              enableGlow: true,
              glowColor: [0.3, 0.8, 0.3], // Green glow color (RGB values between 0-1)
              baseColor: [0.1, 0.1, 0.1], // Dark base color for the globe
              mapBrightness: 4,
              rotation: true,
              rotationSpeed: 0.2,
              autoRotate: true,
              autoRotateSpeed: 0.5,
              enableZoom: false,
              markers: [],
            }}
          />
        </Box>

        <Box sx={{ position: "absolute", inset: 0, opacity: 0.2, zIndex: 0 }}>
          {/* Background Patterns */}
          <Box
            sx={{
              position: "absolute",
              top: "5%",
              left: "5%",
              width: 300,
              height: 300,
              bgcolor: "#ffffff",
              borderRadius: "50%",
              filter: "blur(100px)",
              animation: "pulse 20s infinite ease-in-out",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: "10%",
              right: "5%",
              width: 300,
              height: 300,
              bgcolor: "#ffffff",
              borderRadius: "50%",
              filter: "blur(120px)",
              animation: "pulse 25s infinite ease-in-out 5s",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: "30%",
              left: "35%",
              width: 200,
              height: 200,
              bgcolor: "#4ade80",
              borderRadius: "50%",
              filter: "blur(80px)",
              opacity: 0.4,
              animation: "pulse 15s infinite ease-in-out 2s",
              "@keyframes pulse": {
                "0%": { opacity: 0.2, transform: "scale(0.8)" },
                "50%": { opacity: 0.4, transform: "scale(1.1)" },
                "100%": { opacity: 0.2, transform: "scale(0.8)" },
              },
            }}
          />
        </Box>
        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 2 }}>
          <Grid container spacing={6} alignItems="center">
            {/* Left Content */}
            <Grid item xs={12} lg={6} data-aos="fade-right">
              <Box sx={{ textAlign: { xs: "center", lg: "left" } }}>
                <Box
                  sx={{
                    animation: "fadeIn 0.8s ease-out forwards",
                    opacity: 0,
                    transform: "translateY(20px)",
                    "@keyframes fadeIn": {
                      "0%": { opacity: 0, transform: "translateY(20px)" },
                      "100%": { opacity: 1, transform: "translateY(0)" },
                    },
                  }}
                >
                  <Typography
                    variant="h1"
                    component="h1"
                    sx={{
                      fontSize: { xs: "3rem", sm: "3.75rem", md: "4.5rem" },
                      fontWeight: 900,
                      mb: 2,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    <GradientTypography variant="inherit">
                      VRIDIX
                    </GradientTypography>
                  </Typography>
                </Box>

                <Box
                  sx={{
                    animation: "fadeIn 0.8s ease-out 0.2s forwards",
                    opacity: 0,
                    transform: "translateY(20px)",
                    "@keyframes fadeIn": {
                      "0%": { opacity: 0, transform: "translateY(20px)" },
                      "100%": { opacity: 1, transform: "translateY(0)" },
                    },
                  }}
                >
                  <Typography
                    variant="h2"
                    sx={{
                      fontSize: { xs: "1.5rem", sm: "2rem" },
                      fontWeight: 600,
                      mb: 3,
                      color: "#d1d5db",
                    }}
                  >
                    Platform Digital untuk Pertanian Berkelanjutan
                  </Typography>
                </Box>

                <Box
                  sx={{
                    animation: "fadeIn 0.8s ease-out 0.4s forwards",
                    opacity: 0,
                    transform: "translateY(20px)",
                    "@keyframes fadeIn": {
                      "0%": { opacity: 0, transform: "translateY(20px)" },
                      "100%": { opacity: 1, transform: "translateY(0)" },
                    },
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: { xs: "1rem", md: "1.125rem" },
                      mb: 5,
                      color: "#9ca3af",
                      maxWidth: "600px",
                      mx: { xs: "auto", lg: 0 },
                    }}
                  >
                    Bergabunglah dengan revolusi pertanian digital. Dukung
                    petani lokal, investasi pada proyek berkelanjutan, dan
                    nikmati produk segar dengan jaminan ketertelusuran yang
                    transparan.
                  </Typography>
                </Box>

                {/* CTA Buttons */}
                <Box
                  sx={{
                    animation: "fadeIn 0.8s ease-out 0.6s forwards",
                    opacity: 0,
                    transform: "translateY(20px)",
                    "@keyframes fadeIn": {
                      "0%": { opacity: 0, transform: "translateY(20px)" },
                      "100%": { opacity: 1, transform: "translateY(0)" },
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      gap: 2,
                      justifyContent: { xs: "center", lg: "flex-start" },
                    }}
                  >
                    {!user ? (
                      <>
                        <Link to="/login" style={{ textDecoration: "none" }}>
                          <Button
                            variant="contained"
                            size="large"
                            sx={{
                              background:
                                "linear-gradient(to right, #4ade80, #22c55e)",
                              px: 4,
                              py: 1.5,
                              borderRadius: 2,
                              fontSize: "1rem",
                              fontWeight: 600,
                              boxShadow:
                                "0 10px 15px -3px rgba(74, 222, 128, 0.2)",
                              whiteSpace: "nowrap",
                              textTransform: "none",
                              "&:hover": {
                                background:
                                  "linear-gradient(to right, #22c55e, #16a34a)",
                              },
                            }}
                          >
                            Mulai Sekarang
                          </Button>
                        </Link>
                        <Link
                          to="/marketplace"
                          style={{ textDecoration: "none" }}
                        >
                          <Button
                            variant="outlined"
                            size="large"
                            sx={{
                              px: 4,
                              py: 1.5,
                              borderRadius: 2,
                              fontSize: "1rem",
                              fontWeight: 600,
                              borderColor: "#4ade80",
                              color: "#4ade80",
                              borderWidth: 2,
                              whiteSpace: "nowrap",
                              textTransform: "none",
                              "&:hover": {
                                borderColor: "#22c55e",
                                backgroundColor: "rgba(74, 222, 128, 0.1)",
                                borderWidth: 2,
                              },
                            }}
                          >
                            Jelajahi Marketplace
                          </Button>
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/dashboard"
                          style={{ textDecoration: "none" }}
                        >
                          <Button
                            variant="contained"
                            size="large"
                            sx={{
                              background:
                                "linear-gradient(to right, #4ade80, #22c55e)",
                              px: 4,
                              py: 1.5,
                              borderRadius: 2,
                              fontSize: "1rem",
                              fontWeight: 600,
                              whiteSpace: "nowrap",
                              textTransform: "none",
                              "&:hover": {
                                background:
                                  "linear-gradient(to right, #22c55e, #16a34a)",
                              },
                            }}
                          >
                            Ke Dashboard
                          </Button>
                        </Link>
                        {user.role !== "Petani" && (
                          <Link
                            to="/register-farmer"
                            style={{ textDecoration: "none" }}
                          >
                            <Button
                              variant="contained"
                              size="large"
                              sx={{
                                background:
                                  "linear-gradient(to right, #f97316, #ea580c)",
                                px: 4,
                                py: 1.5,
                                borderRadius: 2,
                                fontSize: "1rem",
                                fontWeight: 600,
                                whiteSpace: "nowrap",
                                textTransform: "none",
                                "&:hover": {
                                  background:
                                    "linear-gradient(to right, #ea580c, #c2410c)",
                                },
                              }}
                              startIcon={<AgricultureIcon />}
                            >
                              Daftar Sebagai Petani
                            </Button>
                          </Link>
                        )}
                      </>
                    )}
                  </Box>
                </Box>
              </Box>
            </Grid>

            {/* Right Animation */}
            <Grid item xs={12} lg={6} data-aos="fade-left">
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  justifyContent: { xs: "center", lg: "flex-end" },
                  height: { xs: "350px", md: "450px" },
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    maxWidth: "600px",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* Lottie Animation */}
                  <Box
                    sx={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 2,
                      animation:
                        "fadeInAnimation 1.5s ease-in-out 0.5s forwards",
                      opacity: 0,
                      "@keyframes fadeInAnimation": {
                        "0%": { opacity: 0, transform: "translateY(20px)" },
                        "100%": { opacity: 1, transform: "translateY(0)" },
                      },
                    }}
                  >
                    {animationData && (
                      <Lottie
                        animationData={animationData}
                        loop={true}
                        style={{
                          width: "90%",
                          maxWidth: "500px",
                          filter:
                            "drop-shadow(0 0 20px rgba(74, 222, 128, 0.3))",
                        }}
                      />
                    )}
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box
        sx={{
          py: 10,
          bgcolor: "black",
          position: "relative",
          zIndex: 1,
          overflow: "hidden",
          backgroundImage:
            "radial-gradient(circle at 75% 60%, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0) 60%)",
        }}
        ref={featuresRef}
      >
        <Container maxWidth="xl">
          <Box sx={{ textAlign: "center", mb: 8 }} data-aos="fade-up">
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontSize: { xs: "2.5rem", md: "3rem" },
                fontWeight: 700,
                mb: 2,
                color: "white",
              }}
            >
              Fitur Platform Kami
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "#9ca3af",
                maxWidth: "800px",
                mx: "auto",
                fontSize: { xs: "1rem", md: "1.25rem" },
              }}
            >
              Teknologi digital yang mengubah cara kita berinteraksi dengan
              pertanian
            </Typography>
          </Box>

          {/* Bento Grid Implementation */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              gap: 3,
            }}
          >
            {/* Card 1: Crowdfunding - Large Card */}
            <SpaceCard
              elevation={0}
              sx={{
                gridColumn: { xs: "span 1", md: "span 2" },
                height: { xs: 320, md: 360 },
                p: 4,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              data-aos="fade-up"
              data-aos-delay="100"
            >
              {/* Background Animation Element */}
              <Box
                className="card-glow"
                sx={{
                  position: "absolute",
                  top: -40,
                  right: -40,
                  width: 200,
                  height: 200,
                  background:
                    "radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, rgba(0, 0, 0, 0) 70%)",
                  borderRadius: "50%",
                  opacity: 0.4,
                  animation: "pulse 8s infinite",
                  "@keyframes pulse": {
                    "0%": { transform: "scale(0.8)", opacity: 0.3 },
                    "50%": { transform: "scale(1.2)", opacity: 0.5 },
                    "100%": { transform: "scale(0.8)", opacity: 0.3 },
                  },
                }}
              />

              <Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: "rgba(74, 222, 128, 0.2)",
                      color: "#4ade80",
                      width: 56,
                      height: 56,
                    }}
                  >
                    <GrassIcon sx={{ fontSize: 30 }} />
                  </Avatar>
                </Box>
                <Typography
                  variant="h4"
                  sx={{ color: "white", fontWeight: 700, mb: 2 }}
                >
                  Crowdfunding Pertanian
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#9ca3af", mb: 3, maxWidth: "90%" }}
                >
                  Dukung petani lokal dengan berinvestasi pada proyek pertanian
                  berkelanjutan dan dapatkan hasil panen langsung.
                </Typography>
              </Box>

              <Button
                component={Link}
                to="/crowdfunding"
                variant="contained"
                sx={{
                  bgcolor: "rgba(74, 222, 128, 0.2)",
                  color: "#4ade80",
                  fontWeight: 600,
                  py: 1,
                  px: 3,
                  borderRadius: 2,
                  width: "fit-content",
                  textTransform: "none",
                  "&:hover": {
                    bgcolor: "rgba(74, 222, 128, 0.3)",
                  },
                }}
              >
                Lihat Proyek
              </Button>
            </SpaceCard>

            {/* Card 2: Marketplace - Small Card */}
            <SpaceCard
              elevation={0}
              sx={{
                gridColumn: "span 1",
                height: { xs: 320, md: 360 },
                borderRadius: 4,
                p: 4,
                position: "relative",
                overflow: "hidden",
                bgcolor: "rgba(20, 30, 45, 0.7)",
                backdropFilter: "blur(10px)",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 20px 30px rgba(0,0,0,0.2)",
                },
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <Box
                sx={{
                  position: "absolute",
                  bottom: -30,
                  right: -30,
                  width: 150,
                  height: 150,
                  background:
                    "radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, rgba(20, 30, 45, 0) 70%)",
                  borderRadius: "50%",
                  opacity: 0.7,
                }}
              />

              <Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: "rgba(59, 130, 246, 0.2)",
                      color: "#60a5fa",
                      width: 56,
                      height: 56,
                    }}
                  >
                    <ShoppingCartIcon sx={{ fontSize: 30 }} />
                  </Avatar>
                </Box>
                <Typography
                  variant="h4"
                  sx={{ color: "white", fontWeight: 700, mb: 2 }}
                >
                  Marketplace
                </Typography>
                <Typography variant="body1" sx={{ color: "#9ca3af", mb: 3 }}>
                  Beli produk segar langsung dari petani dengan jaminan
                  kualitas.
                </Typography>
              </Box>

              <Button
                component={Link}
                to="/marketplace"
                variant="contained"
                sx={{
                  bgcolor: "rgba(59, 130, 246, 0.2)",
                  color: "#60a5fa",
                  fontWeight: 600,
                  py: 1,
                  px: 3,
                  borderRadius: 2,
                  width: "fit-content",
                  textTransform: "none",
                  "&:hover": {
                    bgcolor: "rgba(59, 130, 246, 0.3)",
                  },
                }}
              >
                Belanja Sekarang
              </Button>
            </SpaceCard>

            {/* Card 3: Traceability - Small Card */}
            <SpaceCard
              elevation={0}
              sx={{
                gridColumn: "span 1",
                height: { xs: 320, md: 360 },
                borderRadius: 4,
                p: 4,
                position: "relative",
                overflow: "hidden",
                bgcolor: "rgba(20, 30, 45, 0.7)",
                backdropFilter: "blur(10px)",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 20px 30px rgba(0,0,0,0.2)",
                },
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <Box
                sx={{
                  position: "absolute",
                  top: -20,
                  left: -20,
                  width: 120,
                  height: 120,
                  background:
                    "radial-gradient(circle, rgba(167, 139, 250, 0.2) 0%, rgba(20, 30, 45, 0) 70%)",
                  borderRadius: "50%",
                  opacity: 0.7,
                }}
              />

              <Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: "rgba(167, 139, 250, 0.2)",
                      color: "#a78bfa",
                      width: 56,
                      height: 56,
                    }}
                  >
                    <SearchIcon sx={{ fontSize: 30 }} />
                  </Avatar>
                </Box>
                <Typography
                  variant="h4"
                  sx={{ color: "white", fontWeight: 700, mb: 2 }}
                >
                  Traceability
                </Typography>
                <Typography variant="body1" sx={{ color: "#9ca3af", mb: 3 }}>
                  Lacak perjalanan produk dari lahan hingga meja Anda.
                </Typography>
              </Box>

              <Button
                component={Link}
                to="/traceability"
                variant="contained"
                sx={{
                  bgcolor: "rgba(167, 139, 250, 0.2)",
                  color: "#a78bfa",
                  fontWeight: 600,
                  py: 1,
                  px: 3,
                  borderRadius: 2,
                  width: "fit-content",
                  textTransform: "none",
                  "&:hover": {
                    bgcolor: "rgba(167, 139, 250, 0.3)",
                  },
                }}
              >
                Lacak Produk
              </Button>
            </SpaceCard>

            {/* Card 4: Bergabung Sebagai Petani - Large Card */}
            <SpaceCard
              elevation={0}
              sx={{
                gridColumn: { xs: "span 1", md: "span 3" },
                height: { xs: 320, md: 260 },
                borderRadius: 4,
                p: 4,
                position: "relative",
                overflow: "hidden",
                bgcolor: "rgba(20, 30, 45, 0.7)",
                backdropFilter: "blur(10px)",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 20px 30px rgba(0,0,0,0.2)",
                },
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: { xs: "start", md: "center" },
                justifyContent: "space-between",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <Box
                sx={{
                  position: "absolute",
                  bottom: -50,
                  right: 100,
                  width: 200,
                  height: 200,
                  background:
                    "radial-gradient(circle, rgba(251, 146, 60, 0.15) 0%, rgba(20, 30, 45, 0) 70%)",
                  borderRadius: "50%",
                  opacity: 0.7,
                }}
              />

              <Box
                sx={{
                  position: "absolute",
                  top: -30,
                  left: "40%",
                  width: 150,
                  height: 150,
                  background:
                    "radial-gradient(circle, rgba(251, 146, 60, 0.1) 0%, rgba(20, 30, 45, 0) 70%)",
                  borderRadius: "50%",
                  opacity: 0.7,
                }}
              />

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  mb: { xs: 3, md: 0 },
                  flexGrow: 1,
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: "rgba(251, 146, 60, 0.2)",
                    color: "#fb923c",
                    width: 70,
                    height: 70,
                  }}
                >
                  <AgricultureIcon sx={{ fontSize: 40 }} />
                </Avatar>
                <Box>
                  <Typography
                    variant="h4"
                    sx={{ color: "white", fontWeight: 700, mb: 1 }}
                  >
                    Bergabung Sebagai Petani
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#9ca3af",
                      maxWidth: { xs: "100%", md: "600px" },
                    }}
                  >
                    Daftarkan diri Anda sebagai petani dan mulai menjual hasil
                    panen serta mengajukan proposal crowdfunding.
                  </Typography>
                </Box>
              </Box>

              <Button
                component={Link}
                to="/register-farmer"
                variant="contained"
                startIcon={<AgricultureIcon />}
                sx={{
                  bgcolor: "rgba(251, 146, 60, 0.2)",
                  color: "#fb923c",
                  fontWeight: 600,
                  py: 1.5,
                  px: 3,
                  borderRadius: 2,
                  width: { xs: "100%", md: "auto" },
                  mt: { xs: 2, md: 0 },
                  textTransform: "none",
                  "&:hover": {
                    bgcolor: "rgba(251, 146, 60, 0.3)",
                  },
                }}
              >
                Daftar Sebagai Petani
              </Button>
            </SpaceCard>
          </Box>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box
        sx={{
          py: 10,
          bgcolor: "#111827",
          position: "relative",
        }}
        ref={statsRef}
      >
        <Container maxWidth="xl">
          <SpaceCard
            elevation={24}
            sx={{
              bgcolor: "rgba(31, 41, 55, 0.8)",
              backdropFilter: "blur(10px)",
              borderRadius: 4,
              p: { xs: 4, md: 6 },
              border: "1px solid rgba(75, 85, 99, 0.2)",
            }}
            data-aos="zoom-in"
          >
            <Typography
              variant="h3"
              component="h2"
              align="center"
              sx={{
                mb: 6,
                fontWeight: 700,
                color: "white",
                fontSize: { xs: "2rem", md: "2.5rem" },
              }}
            >
              Dampak Platform Kami
            </Typography>

            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={6} md={3} data-aos="fade-up" data-aos-delay="100">
                <Box
                  sx={{
                    textAlign: "center",
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 800,
                      color: "#4ade80",
                      mb: 1,
                      fontSize: { xs: "2.5rem", md: "3rem" },
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        background:
                          "linear-gradient(to right, #4ade80, #22c55e)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                      }}
                    >
                      25+
                    </Box>
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Chip
                      icon={<PeopleIcon sx={{ color: "#4ade80" }} />}
                      label="Petani Terdaftar"
                      sx={{
                        bgcolor: "rgba(74, 222, 128, 0.1)",
                        color: "#9ca3af",
                        borderRadius: 2,
                        "& .MuiChip-icon": { color: "#4ade80" },
                      }}
                    />
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={6} md={3} data-aos="fade-up" data-aos-delay="200">
                <Box
                  sx={{
                    textAlign: "center",
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 800,
                      color: "#60a5fa",
                      mb: 1,
                      fontSize: { xs: "2.5rem", md: "3rem" },
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        background:
                          "linear-gradient(to right, #60a5fa, #3b82f6)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                      }}
                    >
                      ₹15M+
                    </Box>
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Chip
                      icon={<MonetizationOnIcon sx={{ color: "#60a5fa" }} />}
                      label="Dana Terkumpul"
                      sx={{
                        bgcolor: "rgba(96, 165, 250, 0.1)",
                        color: "#9ca3af",
                        borderRadius: 2,
                        "& .MuiChip-icon": { color: "#60a5fa" },
                      }}
                    />
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={6} md={3} data-aos="fade-up" data-aos-delay="300">
                <Box
                  sx={{
                    textAlign: "center",
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 800,
                      color: "#a78bfa",
                      mb: 1,
                      fontSize: { xs: "2.5rem", md: "3rem" },
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        background:
                          "linear-gradient(to right, #a78bfa, #8b5cf6)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                      }}
                    >
                      100+
                    </Box>
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Chip
                      icon={<InventoryIcon sx={{ color: "#a78bfa" }} />}
                      label="Produk Tersedia"
                      sx={{
                        bgcolor: "rgba(167, 139, 250, 0.1)",
                        color: "#9ca3af",
                        borderRadius: 2,
                        "& .MuiChip-icon": { color: "#a78bfa" },
                      }}
                    />
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={6} md={3} data-aos="fade-up" data-aos-delay="400">
                <Box
                  sx={{
                    textAlign: "center",
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 800,
                      color: "#fb923c",
                      mb: 1,
                      fontSize: { xs: "2.5rem", md: "3rem" },
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        background:
                          "linear-gradient(to right, #fb923c, #f97316)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                      }}
                    >
                      500+
                    </Box>
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Chip
                      icon={<VerifiedUserIcon sx={{ color: "#fb923c" }} />}
                      label="Transaksi Sukses"
                      sx={{
                        bgcolor: "rgba(251, 146, 60, 0.1)",
                        color: "#9ca3af",
                        borderRadius: 2,
                        "& .MuiChip-icon": { color: "#fb923c" },
                      }}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </SpaceCard>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Box
        sx={{
          py: 10,
          backgroundImage: "linear-gradient(to right, #10b981, #3b82f6)",
          position: "relative",
          overflow: "hidden",
        }}
        ref={ctaRef}
      >
        {/* Background pattern */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            opacity: 0.1,
            zIndex: 0,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='20' cy='20' r='3'/%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />

        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
          <Box
            sx={{
              textAlign: "center",
              maxWidth: "800px",
              mx: "auto",
            }}
            data-aos="fade-up"
          >
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 700,
                color: "white",
                mb: 3,
                fontSize: { xs: "2rem", md: "2.5rem" },
              }}
            >
              Siap Bergabung dengan Revolusi Pertanian?
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: "rgba(255, 255, 255, 0.9)",
                mb: 5,
                fontSize: { xs: "1rem", md: "1.25rem" },
              }}
            >
              Mulai perjalanan Anda sebagai bagian dari ekosistem pertanian
              berkelanjutan
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {!user ? (
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      bgcolor: "white",
                      color: "#10b981",
                      fontWeight: 600,
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      fontSize: "1rem",
                      boxShadow: "0 10px 15px -3px rgba(255, 255, 255, 0.2)",
                      "&:hover": {
                        bgcolor: "rgba(255, 255, 255, 0.9)",
                      },
                      textTransform: "none",
                    }}
                  >
                    Mulai Sekarang
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/dashboard" style={{ textDecoration: "none" }}>
                    <Button
                      variant="contained"
                      size="large"
                      sx={{
                        bgcolor: "white",
                        color: "#10b981",
                        fontWeight: 600,
                        px: 4,
                        py: 1.5,
                        borderRadius: 2,
                        fontSize: "1rem",
                        boxShadow: "0 10px 15px -3px rgba(255, 255, 255, 0.2)",
                        "&:hover": {
                          bgcolor: "rgba(255, 255, 255, 0.9)",
                        },
                        textTransform: "none",
                      }}
                    >
                      Ke Dashboard
                    </Button>
                  </Link>

                  {user.role !== "Petani" && (
                    <Link
                      to="/register-farmer"
                      style={{ textDecoration: "none" }}
                    >
                      <Button
                        variant="outlined"
                        size="large"
                        startIcon={<AgricultureIcon />}
                        sx={{
                          borderColor: "white",
                          color: "white",
                          fontWeight: 600,
                          px: 4,
                          py: 1.5,
                          borderRadius: 2,
                          fontSize: "1rem",
                          borderWidth: 2,
                          "&:hover": {
                            borderColor: "white",
                            bgcolor: "rgba(255, 255, 255, 0.1)",
                            borderWidth: 2,
                          },
                          textTransform: "none",
                        }}
                      >
                        Daftar Sebagai Petani
                      </Button>
                    </Link>
                  )}
                </>
              )}
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
