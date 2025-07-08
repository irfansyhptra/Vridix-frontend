import { ethers } from "ethers";

// Import ABI dari file JSON Anda.
// Pastikan path dan nama file ini sudah benar.
import CrowdfundingABI from "../contracts/Crowdfunding.json";
import MarketplaceABI from "../contracts/Marketplace.json";

// Ambil alamat kontrak dari environment variables (.env file)
const CROWDFUNDING_CONTRACT_ADDRESS = import.meta.env
  .VITE_CROWDFUNDING_CONTRACT_ADDRESS;
const MARKETPLACE_CONTRACT_ADDRESS = import.meta.env
  .VITE_MARKETPLACE_CONTRACT_ADDRESS;

/**
 * Mendapatkan instance dari sebuah smart contract.
 * @param {string} address - Alamat kontrak.
 * @param {object} abi - ABI dari kontrak.
 * @param {ethers.Provider | ethers.Signer} providerOrSigner - Ethers provider atau signer.
 * @returns {ethers.Contract}
 */
const getContract = (address, abi, providerOrSigner) => {
  return new ethers.Contract(address, abi, providerOrSigner);
};

// --- Crowdfunding Functions ---

export const getProjects = async (provider) => {
  const contract = getContract(
    CROWDFUNDING_CONTRACT_ADDRESS,
    CrowdfundingABI,
    provider
  );
  // Asumsi smart contract Anda memiliki fungsi bernama 'getAllProposals'
  const projects = await contract.getAllProposals();
  return projects;
};

export const fundProject = async (signer, projectId, amount) => {
  const contract = getContract(
    CROWDFUNDING_CONTRACT_ADDRESS,
    CrowdfundingABI,
    signer
  );
  const amountInWei = ethers.parseEther(amount.toString());
  const tx = await contract.fundProposal(projectId, { value: amountInWei });
  await tx.wait();
  return tx;
};

// --- Marketplace Functions ---

export const getMarketplaceItems = async (provider) => {
  const contract = getContract(
    MARKETPLACE_CONTRACT_ADDRESS,
    MarketplaceABI,
    provider
  );

  // PERBAIKAN: Variabel 'contract' sekarang benar-benar digunakan di dalam blok try-catch.
  // Ganti 'getAllProducts' dengan nama fungsi yang sesuai di smart contract marketplace Anda.
  try {
    console.log("Mencoba memuat item dari smart contract marketplace...");
    const items = await contract.getAllProducts();
    return items;
  } catch (error) {
    console.error(
      "Gagal memanggil fungsi di Marketplace contract. " +
        "Pastikan fungsi (contoh: 'getAllProducts') ada di contract dan ABI sudah benar.",
      error
    );
    // Kembalikan array kosong jika terjadi error agar aplikasi tidak crash.
    return [];
  }
};
