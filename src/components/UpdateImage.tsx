"use client";

import { useState } from "react";
import Image from "next/image";

export default function UpdateImage() {
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    setPreviewUrl(URL.createObjectURL(file)); // Show preview
    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);
      const res = await fetch("https://lost-and-found-backend-v9hr.onrender.com/api/v1user/update-profile", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log("Image updated:", data);
    } catch (err) {
      console.error("Image update error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Update Profile Picture</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mb-2"
      />
      {previewUrl && (
        <Image
          src={previewUrl}
          alt="Preview"
          className="w-32 h-32 object-cover rounded-full border mt-2"
        />
      )}
      {loading && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
    </div>
  );
}
