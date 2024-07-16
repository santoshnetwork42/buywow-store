export const getPublicImageURL = (key, resize, quality = 75) => {
  if (resize) {
    return `${key}?w=${resize}&q=${Math.max(75, quality)}&f=webp`;
  }
  return `${key}?f=webp`;
};
