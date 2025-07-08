import api from "../api/axiosConfig";

/**
 * Uploads a file to the backend, which then pins it to IPFS.
 * @param {File} file The file to upload.
 * @param {function} onProgress A callback function to track upload progress.
 * @returns {Promise<string>} The IPFS hash of the uploaded file.
 */
export const uploadToIpfs = async (file, onProgress) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await api.post("/api/upload/ipfs", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        if (onProgress) {
          onProgress(percentCompleted);
        }
      },
    });
    // Assuming the backend returns { ipfsHash: '...' }
    return response.data.ipfsHash;
  } catch (error) {
    console.error("Error uploading file to IPFS via backend:", error);
    throw error;
  }
};
