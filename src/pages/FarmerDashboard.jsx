// src/pages/FarmerDashboard.jsx

import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { mockData } from "../data/mockData";
import Card from "../components/common/Card";
import Button from "../components/common/Button";

const FarmerDashboard = () => {
  const { user, showToast } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedProject, setSelectedProject] = useState(null);
  const [withdrawalRequests, setWithdrawalRequests] = useState([]);

  // State untuk form proposal baru
  const [newProposal, setNewProposal] = useState({
    title: "",
    targetAmount: "",
    description: "",
    jenisUsaha: "Pertanian Padi",
    estimatedDuration: "",
    expectedROI: "",
    milestones: [],
    documents: [],
    guaranteeAmount: "",
    useManualMilestones: false,
  });

  // State untuk milestone manual
  const [manualMilestones, setManualMilestones] = useState([
    {
      id: 1,
      name: "Persiapan Lahan",
      description: "Membersihkan dan menyiapkan lahan seluas 5 hektar.",
      targetTime: "14 hari setelah pendanaan",
      fundPercentage: 10,
      fundAmount: 0,
    },
  ]);

  // Get farmer data
  const farmerData = mockData.validatedFarmers.find(
    (farmer) => farmer.walletAddress === user?.walletAddress
  );

  useEffect(() => {
    if (user && user.role !== "Petani") {
      showToast(
        "Akses ditolak. Halaman ini khusus untuk petani terverifikasi.",
        "error"
      );
      navigate("/");
    }
  }, [user, navigate, showToast]);

  const handleWithdrawal = (projectId, milestoneId, amount) => {
    const newRequest = {
      id: Date.now(),
      projectId,
      milestoneId,
      amount,
      status: "pending",
      requestDate: new Date().toISOString(),
      expectedProcessing: "2-3 hari kerja",
    };

    setWithdrawalRequests((prev) => [newRequest, ...prev]);
    showToast(
      `Pengajuan pencairan dana sebesar ${formatCurrency(
        amount
      )} berhasil diajukan!`,
      "success"
    );
  };

  const generateMilestonesFromRAB = (jenisUsaha, targetAmount) => {
    const template =
      mockData.rabTemplates[jenisUsaha] ||
      mockData.rabTemplates["Pertanian Padi"];
    const totalEstimasi = template.reduce(
      (sum, tahap) =>
        sum +
        tahap.aktivitas.reduce(
          (tahapSum, aktivitas) => tahapSum + aktivitas.estimasiHarga * 10,
          0
        ),
      0
    );

    return template.map((tahap, index) => {
      const tahapTotal = tahap.aktivitas.reduce(
        (sum, aktivitas) => sum + aktivitas.estimasiHarga * 10,
        0
      );
      const percentage = (tahapTotal / totalEstimasi) * 100;
      const amount = Math.round((targetAmount * percentage) / 100);

      return {
        id: index + 1,
        title: tahap.tahap,
        description: tahap.aktivitas
          .map((a) => `${a.item} (${a.satuan})`)
          .join(", "),
        targetAmount: amount,
        status: "pending",
        buktiRequired: tahap.buktiRequired,
        aktivitas: tahap.aktivitas,
      };
    });
  };

  // Handle manual milestone management
  const addManualMilestone = () => {
    const newMilestone = {
      id: manualMilestones.length + 1,
      name: "",
      description: "",
      targetTime: "",
      fundPercentage: 0,
      fundAmount: 0,
    };
    setManualMilestones([...manualMilestones, newMilestone]);
  };

  const removeManualMilestone = (id) => {
    setManualMilestones(manualMilestones.filter((m) => m.id !== id));
  };

  const updateManualMilestone = (id, field, value) => {
    setManualMilestones(
      manualMilestones.map((m) =>
        m.id === id
          ? {
              ...m,
              [field]: value,
              ...(field === "fundPercentage" && newProposal.targetAmount
                ? {
                    fundAmount: Math.round(
                      (parseFloat(value) *
                        parseFloat(newProposal.targetAmount)) /
                        100
                    ),
                  }
                : {}),
            }
          : m
      )
    );
  };

  // Update fund amounts when target amount changes
  const updateMilestoneAmounts = (targetAmount) => {
    const updatedMilestones = manualMilestones.map((m) => ({
      ...m,
      fundAmount: Math.round(
        (m.fundPercentage * parseFloat(targetAmount || 0)) / 100
      ),
    }));
    setManualMilestones(updatedMilestones);
  };

  const handleSubmitProposal = async (e) => {
    e.preventDefault();

    if (
      !newProposal.title ||
      !newProposal.targetAmount ||
      !newProposal.description
    ) {
      showToast("Mohon lengkapi semua field yang wajib diisi", "error");
      return;
    }

    // Validasi jaminan minimal 20%
    const guaranteeAmount = parseFloat(newProposal.guaranteeAmount || 0);
    const requiredGuarantee = parseFloat(newProposal.targetAmount) * 0.2;
    if (guaranteeAmount < requiredGuarantee) {
      showToast(
        `Jaminan minimal ${formatCurrency(
          requiredGuarantee
        )} (20% dari target dana)`,
        "error"
      );
      return;
    }

    // Validasi milestone manual
    if (newProposal.useManualMilestones) {
      const totalPercentage = manualMilestones.reduce(
        (sum, m) => sum + parseFloat(m.fundPercentage || 0),
        0
      );
      if (totalPercentage !== 100) {
        showToast(
          `Total persentase milestone harus 100%, saat ini ${totalPercentage}%`,
          "error"
        );
        return;
      }

      const incompleteMilestones = manualMilestones.filter(
        (m) => !m.name || !m.description || !m.targetTime || !m.fundPercentage
      );
      if (incompleteMilestones.length > 0) {
        showToast("Mohon lengkapi semua data milestone", "error");
        return;
      }
    }

    // Generate milestones dari RAB template atau manual dan tambahkan ke proposal
    const milestones = newProposal.useManualMilestones
      ? manualMilestones.map((m) => ({
          id: m.id,
          title: m.name,
          description: m.description,
          targetAmount: m.fundAmount,
          targetTime: m.targetTime,
          fundPercentage: m.fundPercentage,
          status: "pending",
          buktiRequired: ["photo", "receipt", "geolocation"],
        }))
      : generateMilestonesFromRAB(
          newProposal.jenisUsaha,
          parseInt(newProposal.targetAmount)
        );

    // Tambahkan milestones ke data yang akan dikirim
    const proposalWithMilestones = {
      ...newProposal,
      milestones: milestones,
    };

    console.log("Submitting proposal with milestones:", proposalWithMilestones);

    // Simulasi upload ke IPFS dan smart contract
    const ipfsHash = `ipfs://QmProposal${Date.now()}...`;
    const contractHash = `0x${Date.now().toString(16)}`;

    // Simulasi submit proposal
    showToast(
      "Proposal berhasil disubmit dan disimpan ke blockchain!",
      "success"
    );
    showToast(`IPFS Hash: ${ipfsHash}`, "info");
    showToast(`Smart Contract Hash: ${contractHash}`, "info");
    showToast(
      `Jaminan ${formatCurrency(guaranteeAmount)} telah dikunci`,
      "info"
    );

    // Reset form
    setNewProposal({
      title: "",
      targetAmount: "",
      description: "",
      jenisUsaha: "Pertanian Padi",
      estimatedDuration: "",
      expectedROI: "",
      milestones: [],
      documents: [],
      guaranteeAmount: "",
      useManualMilestones: false,
    });

    // Reset manual milestones
    setManualMilestones([
      {
        id: 1,
        name: "Persiapan Lahan",
        description: "Membersihkan dan menyiapkan lahan seluas 5 hektar.",
        targetTime: "14 hari setelah pendanaan",
        fundPercentage: 10,
        fundAmount: 0,
      },
    ]);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      in_progress: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      active: "bg-blue-100 text-blue-800",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          statusConfig[status] || "bg-gray-100 text-gray-800"
        }`}
      >
        {status}
      </span>
    );
  };

  const renderMilestoneEvidence = (evidence) => {
    if (!evidence)
      return <span className="text-gray-400">Belum upload bukti</span>;

    const evidenceTypes = {
      photo: "📷 Foto",
      video: "🎥 Video",
      receipt: "🧾 Struk",
      geolocation: "📍 Lokasi",
      timelapses: "⏰ Timelapse",
      weight_certificate: "⚖️ Sertifikat Berat",
    };

    return (
      <div className="space-y-1">
        <span className="text-green-400">
          {evidenceTypes[evidence.type]} tersedia
        </span>
        <p className="text-xs text-gray-400">{evidence.description}</p>
        {evidence.geoLocation && (
          <p className="text-xs text-blue-400">📍 {evidence.geoLocation}</p>
        )}
      </div>
    );
  };

  if (!user || user.role !== "Petani") {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <Card className="max-w-md">
          <div className="text-center p-6">
            <div className="text-red-400 text-6xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold mb-2">Akses Ditolak</h2>
            <p className="text-gray-400 mb-4">
              Halaman ini khusus untuk petani yang sudah terverifikasi.
            </p>
            <Button onClick={() => navigate("/")} className="w-full">
              Kembali ke Beranda
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (!farmerData) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <Card className="max-w-md">
          <div className="text-center p-6">
            <div className="text-yellow-400 text-6xl mb-4">⏳</div>
            <h2 className="text-xl font-bold mb-2">Status Verifikasi</h2>
            <p className="text-gray-400 mb-4">
              Akun Anda sedang dalam proses verifikasi atau belum terdaftar
              sebagai petani.
            </p>
            <Button
              onClick={() => navigate("/register-farmer")}
              className="w-full"
            >
              Daftar Sebagai Petani
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Dashboard Petani</h1>
              <p className="text-gray-400">Selamat datang, {farmerData.name}</p>
              <div className="flex items-center mt-2">
                <span className="text-green-400">✅ Terverifikasi</span>
                <span className="mx-2">•</span>
                <span className="text-gray-400">
                  Bergabung: {farmerData.approvedDate}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Saldo Tersedia</p>
              <p className="text-xl font-bold text-green-400">
                {formatCurrency(farmerData.saldoTersedia)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <div className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {farmerData.projects.length}
              </div>
              <div className="text-gray-400">Total Proyek</div>
            </div>
          </Card>
          <Card>
            <div className="p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">
                {
                  farmerData.projects.filter((p) => p.status === "active")
                    .length
                }
              </div>
              <div className="text-gray-400">Proyek Aktif</div>
            </div>
          </Card>
          <Card>
            <div className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">
                {formatCurrency(
                  farmerData.projects.reduce(
                    (sum, p) => sum + p.danaTerkumpul,
                    0
                  )
                )}
              </div>
              <div className="text-gray-400">Dana Terkumpul</div>
            </div>
          </Card>
          <Card>
            <div className="p-6 text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">
                {
                  withdrawalRequests.filter((w) => w.status === "pending")
                    .length
                }
              </div>
              <div className="text-gray-400">Pencairan Pending</div>
            </div>
          </Card>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="border-b border-gray-700">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: "dashboard", label: "Dashboard", icon: "🏠" },
                { id: "projects", label: "Proyek Saya", icon: "🌾" },
                { id: "withdrawals", label: "Pencairan Dana", icon: "💰" },
                { id: "new-proposal", label: "Proposal Baru", icon: "➕" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-green-500 text-green-400"
                      : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300"
                  }`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Ringkasan Aktivitas</h2>

            {/* Recent Projects */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Proyek Terbaru</h3>
                <div className="space-y-4">
                  {farmerData.projects.slice(0, 2).map((project) => (
                    <div
                      key={project.id}
                      className="flex justify-between items-center p-4 bg-gray-800 rounded-lg"
                    >
                      <div>
                        <h4 className="font-medium">{project.name}</h4>
                        <p className="text-sm text-gray-400">
                          Progress: {project.progress}%
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {formatCurrency(project.danaTerkumpul)}
                        </p>
                        <p className="text-sm text-gray-400">
                          dari {formatCurrency(project.targetDana)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Aksi Cepat</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    onClick={() => setActiveTab("new-proposal")}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    ➕ Buat Proposal Baru
                  </Button>
                  <Button
                    onClick={() => setActiveTab("projects")}
                    variant="outline"
                  >
                    📊 Lihat Semua Proyek
                  </Button>
                  <Button
                    onClick={() => setActiveTab("withdrawals")}
                    variant="outline"
                  >
                    💰 Ajukan Pencairan
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Proyek Crowdfunding Saya</h2>
            </div>

            <div className="grid gap-6">
              {farmerData.projects.map((project) => (
                <Card key={project.id}>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {project.name}
                        </h3>
                        <p className="text-gray-400">{project.createdDate}</p>
                      </div>
                      {getStatusBadge(project.status)}
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress Pendanaan</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-sm mt-2 text-gray-400">
                        <span>{formatCurrency(project.danaTerkumpul)}</span>
                        <span>{formatCurrency(project.targetDana)}</span>
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                      <div>
                        <span className="text-gray-400">ROI Target:</span>
                        <p className="font-medium">{project.roi}%</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Investor:</span>
                        <p className="font-medium">{project.investors} orang</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Target Panen:</span>
                        <p className="font-medium">
                          {project.estimatedHarvest}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-400">Sisa Dana:</span>
                        <p className="font-medium">
                          {formatCurrency(project.sisaDana)}
                        </p>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <Button
                        onClick={() => setSelectedProject(project)}
                        variant="outline"
                      >
                        📋 Lihat Milestone
                      </Button>
                      {project.status === "active" && (
                        <Button
                          onClick={() => {
                            const activeMilestone = project.milestones.find(
                              (m) => m.status === "in_progress"
                            );
                            if (activeMilestone) {
                              handleWithdrawal(
                                project.id,
                                activeMilestone.id,
                                activeMilestone.targetAmount
                              );
                            } else {
                              showToast(
                                "Tidak ada milestone aktif untuk pencairan",
                                "info"
                              );
                            }
                          }}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          💰 Ajukan Pencairan
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "withdrawals" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Pengajuan Pencairan Dana</h2>

            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Riwayat Pencairan
                </h3>
                {withdrawalRequests.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <div className="text-4xl mb-4">💰</div>
                    <p>Belum ada pengajuan pencairan dana</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {withdrawalRequests.map((request) => (
                      <div
                        key={request.id}
                        className="flex justify-between items-center p-4 bg-gray-800 rounded-lg"
                      >
                        <div>
                          <h4 className="font-medium">Pencairan Milestone</h4>
                          <p className="text-sm text-gray-400">
                            Diajukan:{" "}
                            {new Date(request.requestDate).toLocaleDateString(
                              "id-ID"
                            )}
                          </p>
                          <p className="text-sm text-gray-400">
                            Estimasi proses: {request.expectedProcessing}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            {formatCurrency(request.amount)}
                          </p>
                          {getStatusBadge(request.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}

        {activeTab === "new-proposal" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">
              Buat Proposal Crowdfunding Baru
            </h2>

            <Card>
              <div className="p-6">
                <form onSubmit={handleSubmitProposal} className="space-y-6">
                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Judul Proyek *
                      </label>
                      <input
                        type="text"
                        value={newProposal.title}
                        onChange={(e) =>
                          setNewProposal((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-500"
                        placeholder="Contoh: Budidaya Cabai Organik Lahan 2 Hektar"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Jenis Usaha *
                      </label>
                      <select
                        value={newProposal.jenisUsaha}
                        onChange={(e) =>
                          setNewProposal((prev) => ({
                            ...prev,
                            jenisUsaha: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-500"
                      >
                        <option value="Pertanian Padi">Pertanian Padi</option>
                        <option value="Hortikultura">Hortikultura</option>
                        <option value="Perkebunan">Perkebunan</option>
                        <option value="Peternakan">Peternakan</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Target Dana (Rp) *
                      </label>
                      <input
                        type="number"
                        value={newProposal.targetAmount}
                        onChange={(e) => {
                          setNewProposal((prev) => ({
                            ...prev,
                            targetAmount: e.target.value,
                          }));
                          updateMilestoneAmounts(e.target.value);
                        }}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-500"
                        placeholder="25000000"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Jaminan (20% dari target dana) *
                      </label>
                      <input
                        type="number"
                        value={
                          newProposal.guaranteeAmount ||
                          (newProposal.targetAmount
                            ? Math.round(newProposal.targetAmount * 0.2)
                            : 0)
                        }
                        onChange={(e) =>
                          setNewProposal((prev) => ({
                            ...prev,
                            guaranteeAmount: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-500"
                        placeholder="5000000"
                        required
                      />
                      <p className="text-xs text-gray-400 mt-1">
                        Wajib disetor sebelum pendanaan dimulai
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Durasi (bulan)
                      </label>
                      <input
                        type="number"
                        value={newProposal.estimatedDuration}
                        onChange={(e) =>
                          setNewProposal((prev) => ({
                            ...prev,
                            estimatedDuration: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-500"
                        placeholder="6"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        ROI Target (%)
                      </label>
                      <input
                        type="number"
                        value={newProposal.expectedROI}
                        onChange={(e) =>
                          setNewProposal((prev) => ({
                            ...prev,
                            expectedROI: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-500"
                        placeholder="15"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Tipe Milestone
                      </label>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="milestoneType"
                            checked={!newProposal.useManualMilestones}
                            onChange={() =>
                              setNewProposal((prev) => ({
                                ...prev,
                                useManualMilestones: false,
                              }))
                            }
                            className="mr-2"
                          />
                          <span>Auto (RAB)</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="milestoneType"
                            checked={newProposal.useManualMilestones}
                            onChange={() =>
                              setNewProposal((prev) => ({
                                ...prev,
                                useManualMilestones: true,
                              }))
                            }
                            className="mr-2"
                          />
                          <span>Manual</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Deskripsi Proyek *
                    </label>
                    <textarea
                      value={newProposal.description}
                      onChange={(e) =>
                        setNewProposal((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      rows="4"
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-500"
                      placeholder="Jelaskan detail proyek, lokasi, metode budidaya, target hasil, dan manfaat untuk investor..."
                      required
                    />
                  </div>

                  {/* Manual Milestone Form */}
                  {newProposal.useManualMilestones && (
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-lg font-semibold">
                          Milestone Manual
                        </h4>
                        <Button
                          type="button"
                          onClick={addManualMilestone}
                          className="bg-blue-600 hover:bg-blue-700 text-sm"
                        >
                          + Tambah Milestone
                        </Button>
                      </div>

                      <div className="bg-gray-800 rounded-lg p-4 space-y-4">
                        <div className="grid grid-cols-12 gap-2 text-sm font-medium text-gray-400 mb-2">
                          <div className="col-span-1">No</div>
                          <div className="col-span-3">Nama Milestone</div>
                          <div className="col-span-3">Deskripsi</div>
                          <div className="col-span-2">Target Waktu</div>
                          <div className="col-span-1">% Dana</div>
                          <div className="col-span-1">Jumlah</div>
                          <div className="col-span-1">Aksi</div>
                        </div>

                        {manualMilestones.map((milestone, index) => (
                          <div
                            key={milestone.id}
                            className="grid grid-cols-12 gap-2 items-center bg-gray-700 p-3 rounded"
                          >
                            <div className="col-span-1 text-center font-medium">
                              {index + 1}
                            </div>
                            <div className="col-span-3">
                              <input
                                type="text"
                                value={milestone.name}
                                onChange={(e) =>
                                  updateManualMilestone(
                                    milestone.id,
                                    "name",
                                    e.target.value
                                  )
                                }
                                className="w-full px-2 py-1 bg-gray-600 border border-gray-500 rounded text-white text-sm"
                                placeholder="Nama milestone"
                              />
                            </div>
                            <div className="col-span-3">
                              <textarea
                                value={milestone.description}
                                onChange={(e) =>
                                  updateManualMilestone(
                                    milestone.id,
                                    "description",
                                    e.target.value
                                  )
                                }
                                className="w-full px-2 py-1 bg-gray-600 border border-gray-500 rounded text-white text-sm"
                                placeholder="Deskripsi singkat"
                                rows="2"
                              />
                            </div>
                            <div className="col-span-2">
                              <input
                                type="text"
                                value={milestone.targetTime}
                                onChange={(e) =>
                                  updateManualMilestone(
                                    milestone.id,
                                    "targetTime",
                                    e.target.value
                                  )
                                }
                                className="w-full px-2 py-1 bg-gray-600 border border-gray-500 rounded text-white text-sm"
                                placeholder="14 hari setelah..."
                              />
                            </div>
                            <div className="col-span-1">
                              <input
                                type="number"
                                value={milestone.fundPercentage}
                                onChange={(e) =>
                                  updateManualMilestone(
                                    milestone.id,
                                    "fundPercentage",
                                    e.target.value
                                  )
                                }
                                className="w-full px-2 py-1 bg-gray-600 border border-gray-500 rounded text-white text-sm"
                                placeholder="10"
                                min="0"
                                max="100"
                              />
                            </div>
                            <div className="col-span-1 text-xs text-gray-300">
                              {formatCurrency(milestone.fundAmount)}
                            </div>
                            <div className="col-span-1">
                              <Button
                                type="button"
                                onClick={() =>
                                  removeManualMilestone(milestone.id)
                                }
                                className="bg-red-600 hover:bg-red-700 text-xs p-1"
                              >
                                🗑️
                              </Button>
                            </div>
                          </div>
                        ))}

                        <div className="pt-4 border-t border-gray-700">
                          <div className="flex justify-between items-center text-sm">
                            <span>Total Persentase:</span>
                            <span
                              className={`font-medium ${
                                manualMilestones.reduce(
                                  (sum, m) =>
                                    sum + parseFloat(m.fundPercentage || 0),
                                  0
                                ) === 100
                                  ? "text-green-400"
                                  : "text-red-400"
                              }`}
                            >
                              {manualMilestones.reduce(
                                (sum, m) =>
                                  sum + parseFloat(m.fundPercentage || 0),
                                0
                              )}
                              %
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-sm mt-1">
                            <span>Total Dana:</span>
                            <span className="font-medium text-green-400">
                              {formatCurrency(
                                manualMilestones.reduce(
                                  (sum, m) => sum + (m.fundAmount || 0),
                                  0
                                )
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* RAB Preview */}
                  {!newProposal.useManualMilestones &&
                    newProposal.jenisUsaha &&
                    newProposal.targetAmount && (
                      <div>
                        <h4 className="text-lg font-semibold mb-4">
                          Preview Milestone (Auto-Generated dari RAB)
                        </h4>
                        <div className="bg-gray-800 rounded-lg p-4">
                          {generateMilestonesFromRAB(
                            newProposal.jenisUsaha,
                            parseInt(newProposal.targetAmount || 0)
                          ).map((milestone, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0"
                            >
                              <div>
                                <h5 className="font-medium">
                                  {milestone.title}
                                </h5>
                                <p className="text-sm text-gray-400">
                                  {milestone.description}
                                </p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {milestone.buktiRequired.map((bukti, idx) => (
                                    <span
                                      key={idx}
                                      className="text-xs bg-blue-600 px-2 py-1 rounded"
                                    >
                                      {bukti}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">
                                  {formatCurrency(milestone.targetAmount)}
                                </p>
                                <p className="text-xs text-gray-400">
                                  {(
                                    (milestone.targetAmount /
                                      parseInt(newProposal.targetAmount || 1)) *
                                    100
                                  ).toFixed(1)}
                                  %
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* Jaminan & Skema Penyelesaian */}
                  <div className="bg-amber-900 bg-opacity-20 border border-amber-700 rounded-lg p-4">
                    <h4 className="text-lg font-semibold mb-4 text-amber-300">
                      ⚖️ Jaminan & Skema Penyelesaian
                    </h4>

                    <div className="space-y-4 text-sm">
                      <div>
                        <h5 className="font-medium text-amber-300 mb-2">
                          Jaminan Dana:
                        </h5>
                        <ul className="space-y-1 text-gray-300">
                          <li>• Wajib menyetor jaminan 20% dari target dana</li>
                          <li>
                            • Jaminan dikembalikan setelah proyek selesai sukses
                          </li>
                          <li>
                            • Dana investor dicairkan per milestone setelah
                            validasi
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-medium text-amber-300 mb-2">
                          Skema Penyelesaian Gagal Panen:
                        </h5>
                        <ul className="space-y-1 text-gray-300">
                          <li>
                            • <strong>Force Majeure</strong> (cuaca, hama):
                            Petani tidak langsung kena penalti berat
                          </li>
                          <li>• Wajib klarifikasi + review komunitas</li>
                          <li>• Solusi bersama dicari untuk recovery</li>
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-medium text-red-300 mb-2">
                          Skema Penyelesaian Fraud:
                        </h5>
                        <ul className="space-y-1 text-gray-300">
                          <li>• Jaminan hangus (tidak dikembalikan)</li>
                          <li>• Rating petani turun drastis</li>
                          <li>• Blacklist dari platform</li>
                          <li>• Pelaporan ke otoritas terkait</li>
                        </ul>
                      </div>

                      <div className="bg-blue-900 bg-opacity-30 border border-blue-700 rounded p-3">
                        <p className="text-blue-300 font-medium">
                          💡 Catatan Penting:
                        </p>
                        <p className="text-gray-300 mt-1">
                          Dana investor tidak langsung cair → hanya diberikan
                          per milestone setelah validasi. Sistem ini melindungi
                          investor sekaligus memberikan insentif petani untuk
                          menyelesaikan proyek.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Upload Documents */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Dokumen Pendukung
                    </label>
                    <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                      <div className="text-4xl mb-2">📁</div>
                      <p className="text-gray-400 mb-2">
                        Upload dokumen ke IPFS
                      </p>
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        className="hidden"
                        id="documents"
                      />
                      <label htmlFor="documents">
                        <Button
                          type="button"
                          variant="outline"
                          className="cursor-pointer"
                        >
                          Pilih File
                        </Button>
                      </label>
                      <p className="text-xs text-gray-500 mt-2">
                        Format: PDF, JPG, PNG, DOC (Max 10MB per file)
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700"
                    >
                      🚀 Submit Proposal ke Blockchain
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setNewProposal({
                          title: "",
                          targetAmount: "",
                          description: "",
                          jenisUsaha: "Pertanian Padi",
                          estimatedDuration: "",
                          expectedROI: "",
                          milestones: [],
                          documents: [],
                        });
                      }}
                    >
                      Reset Form
                    </Button>
                  </div>
                </form>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">
                  Milestone Proyek: {selectedProject.name}
                </h3>
                <Button
                  onClick={() => setSelectedProject(null)}
                  variant="outline"
                  className="p-2"
                >
                  ✕
                </Button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-800 rounded-lg">
                  <div className="text-center">
                    <p className="text-gray-400 text-sm">Target Dana</p>
                    <p className="text-xl font-bold text-green-400">
                      {formatCurrency(selectedProject.targetDana)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400 text-sm">Jaminan Disetor</p>
                    <p className="text-xl font-bold text-blue-400">
                      {formatCurrency(selectedProject.jaminanDana)}
                    </p>
                    <p className="text-xs text-gray-500">
                      (
                      {(
                        (selectedProject.jaminanDana /
                          selectedProject.targetDana) *
                        100
                      ).toFixed(1)}
                      %)
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400 text-sm">Status Jaminan</p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        selectedProject.guaranteeStatus === "deposited"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {selectedProject.guaranteeStatus === "deposited"
                        ? "✓ Disetor"
                        : "✗ Belum Disetor"}
                    </span>
                  </div>
                </div>

                <div className="bg-blue-900 bg-opacity-30 border border-blue-700 rounded p-4 mb-4">
                  <h4 className="font-medium text-blue-300 mb-2">
                    📋 Aturan Pencairan Dana:
                  </h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>
                      • Dana dicairkan per milestone setelah validasi komunitas
                    </li>
                    <li>
                      • Bukti progress harus di-upload sebelum pengajuan
                      pencairan
                    </li>
                    <li>• Pencairan bisa ditolak jika bukti tidak memadai</li>
                    <li>
                      • Jaminan dikembalikan setelah proyek selesai sukses
                    </li>
                  </ul>
                </div>

                {selectedProject.milestones.map((milestone, index) => (
                  <div
                    key={milestone.id}
                    className="border border-gray-700 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold flex items-center gap-2">
                          <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                            {index + 1}
                          </span>
                          {milestone.title}
                        </h4>
                        <p className="text-gray-400 text-sm mt-1">
                          {milestone.description}
                        </p>
                        {milestone.targetTime && (
                          <p className="text-blue-400 text-xs mt-1">
                            ⏰ {milestone.targetTime}
                          </p>
                        )}
                      </div>
                      <div className="text-right ml-4">
                        <p className="font-medium">
                          {formatCurrency(milestone.targetAmount)}
                        </p>
                        {milestone.fundPercentage && (
                          <p className="text-xs text-gray-400">
                            {milestone.fundPercentage}% dari total
                          </p>
                        )}
                        {getStatusBadge(milestone.status)}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium mb-2">
                          Status & Tanggal:
                        </p>
                        {milestone.status === "completed" && (
                          <p className="text-green-400 text-sm">
                            ✅ Selesai: {milestone.completedDate}
                          </p>
                        )}
                        {milestone.status === "in_progress" && (
                          <p className="text-blue-400 text-sm">
                            🔄 Dimulai: {milestone.startDate}
                          </p>
                        )}
                        {milestone.status === "pending" && (
                          <p className="text-gray-400 text-sm">
                            ⏳ Menunggu milestone sebelumnya
                          </p>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">
                          Bukti Progress:
                        </p>
                        {renderMilestoneEvidence(milestone.evidence)}
                      </div>
                    </div>

                    {milestone.status === "in_progress" && (
                      <div className="mt-4 pt-4 border-t border-gray-700">
                        <Button
                          onClick={() =>
                            handleWithdrawal(
                              selectedProject.id,
                              milestone.id,
                              milestone.targetAmount
                            )
                          }
                          className="bg-green-600 hover:bg-green-700"
                        >
                          💰 Ajukan Pencairan (
                          {formatCurrency(milestone.targetAmount)})
                        </Button>
                        <p className="text-xs text-gray-400 mt-2">
                          * Upload bukti progress sebelum mengajukan pencairan
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default FarmerDashboard;
