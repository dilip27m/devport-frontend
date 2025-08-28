"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const API_BASE_URL = "http://localhost:5000/api";

// This interface defines what our hook will return
interface UseCloudinaryUpload {
  isUploading: boolean;
  upload: (file: File) => Promise<string>;
}

export const useCloudinaryUpload = (): UseCloudinaryUpload => {
  const [isUploading, setIsUploading] = useState(false);
  const { token } = useAuth(); // We need the user's token to get the signature

  const upload = async (file: File): Promise<string> => {
    if (!token) {
      throw new Error("You must be logged in to upload files.");
    }

    setIsUploading(true);

    try {
      // Step 1: Get the secure signature from our backend
      const signatureResponse = await fetch(`${API_BASE_URL}/upload/signature`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const signatureData = await signatureResponse.json();
      if (!signatureResponse.ok) {
        throw new Error("Failed to get upload signature from server.");
      }

      const { signature, timestamp, api_key } = signatureData;

      // Step 2: Prepare the data for the direct upload to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", api_key);
      formData.append("signature", signature);
      formData.append("timestamp", timestamp);

      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

      // Step 3: Make the actual upload call directly to Cloudinary
      const uploadResponse = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadResponse.json();
      if (!uploadResponse.ok) {
        throw new Error(uploadData.error.message || "Cloudinary upload failed.");
      }

      // The `secure_url` is the permanent, HTTPS link to the uploaded image
      return uploadData.secure_url;

    } catch (error) {
      console.error("Upload error:", error);
      throw error; // Re-throw so the component can display the error
    } finally {
      setIsUploading(false);
    }
  };

  return { isUploading, upload };
};

