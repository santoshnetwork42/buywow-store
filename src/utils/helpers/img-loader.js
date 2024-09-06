import { MEDIA_BASE_URL } from "@/config";

export const getPublicImageURL = ({
  key,
  resize = 500,
  quality = 75,
  addPrefix = false,
} = {}) => {
  let finalPath = null;
  try {
    const { pathname } = new URL(key);
    finalPath = pathname;
  } catch {
    finalPath = key;
  }

  if (!finalPath) return "";

  const baseUrl = addPrefix
    ? `https://${MEDIA_BASE_URL}/public/`
    : `https://${MEDIA_BASE_URL}`;
  const resizeParam = resize ? `w=${resize}&` : "";
  const qualityParam = `q=${Math.max(75, quality)}&`;

  return `${baseUrl}${finalPath}?${resizeParam}${qualityParam}`;
};
