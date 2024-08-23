import { MEDIA_BASE_URL } from "@/config";

export const getPublicImageURL = ({
  key,
  resize = 500,
  quality = 75,
  addPrefix = false,
} = {}) => {
  if (!key) return "";

  const baseUrl = addPrefix ? `https://${MEDIA_BASE_URL}/public/` : "";
  const resizeParam = resize ? `w=${resize}&` : "";
  const qualityParam = `q=${Math.max(75, quality)}&`;

  return `${baseUrl}${key}?${resizeParam}${qualityParam}f=webp`;
};
