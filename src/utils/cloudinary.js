import { CONST } from "./constant";

// Uploads an image to Cloudinary using an *unsigned* upload preset.
// Unsigned uploads work with the free tier and require no server-side
// signing, because the preset itself captures the allowed configuration.
//
// Setup (Cloudinary Dashboard -> Settings -> Upload):
//   1. Add an upload preset, set Signing Mode = "Unsigned"
//   2. Copy the preset name into REACT_APP_CLOUDINARY_UPLOAD_PRESET
//   3. Copy your cloud name into REACT_APP_CLOUDINARY_CLOUD_NAME
export const uploadImageToCloudinary = async (file) => {
  if (!file) {
    throw new Error("No file provided for upload");
  }

  const cloudName = CONST.CLOUDINARY_CLOUD_NAME;
  const uploadPreset = CONST.CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error("Cloudinary is not configured. Check REACT_APP_CLOUDINARY_CLOUD_NAME and REACT_APP_CLOUDINARY_UPLOAD_PRESET in .env");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody?.error?.message || "Failed to upload image to Cloudinary");
  }

  const data = await response.json();
  return data.secure_url;
};

// Firebase Storage is no longer available on the free (Spark) plan, so any
// legacy URL pointing at appspot.com is dead. Detect it so the UI can fall
// back to a placeholder instead of rendering a broken image.
export const isBrokenFirebaseStorageUrl = (url) => {
  if (typeof url !== "string" || !url) return false;
  return url.includes("appspot.com") || url.includes("firebasestorage.googleapis.com");
};

export const PLACEHOLDER_IMAGE = "https://placehold.co/600x400?text=No+Image";
