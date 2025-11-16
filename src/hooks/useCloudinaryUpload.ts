"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface UseCloudinaryUpload {
  isUploading: boolean;
  upload: (file: File) => Promise<string>;
}

export const useCloudinaryUpload = (): UseCloudinaryUpload => {
  const [isUploading, setIsUploading] = useState(false);
  const { token } = useAuth();

  const upload = async (file: File): Promise<string> => {
    if (!token) {
      throw new Error("You must be logged in to upload files.");
    }

    setIsUploading(true);

    try {
      // Step 1: Get secure signature from backend
      const signatureResponse = await fetch(`${API_BASE_URL}/upload/signature`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const signatureData = await signatureResponse.json();
      if (!signatureResponse.ok) {
        throw new Error("Failed to get upload signature from server.");
      }

      const { signature, timestamp, apiKey, cloudName } = signatureData;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", apiKey); 
      formData.append("signature", signature);
      formData.append("timestamp", timestamp.toString());

      const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
      const uploadResponse = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadResponse.json();
      if (!uploadResponse.ok) {
        throw new Error(uploadData.error?.message || "Cloudinary upload failed.");
      }

      return uploadData.secure_url; 
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  return { isUploading, upload };
};
