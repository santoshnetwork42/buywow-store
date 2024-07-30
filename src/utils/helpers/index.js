export function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  const array = new Uint8Array(length);

  crypto.getRandomValues(array);

  return Array.from(array, (x) => characters[x % charactersLength]).join("");
}

export function validatePhoneNumber(phoneNumber) {
  const pattern = /^\d{10}$/;
  return pattern.test(phoneNumber);
}

export const addPhonePrefix = (number) => {
  if (number && !number.includes("+91")) return "+91" + number;
  return number;
};

export function extractAttributes(data, defaultValues = {}) {
  if (!data?.data?.attributes) {
    return defaultValues;
  }
  return { ...defaultValues, ...data.data.attributes };
}

const COLOR_MAP = {
  DEFAULT: "bg-white-a700_01",
  BLUE: "bg-blue-50",
  LIME: "bg-lime-50",
};

export const getBgColor = (value) => COLOR_MAP[value] || COLOR_MAP.DEFAULT;

export const getOfferValue = (price, listingPrice) => {
  if (
    typeof price !== "number" ||
    typeof listingPrice !== "number" ||
    listingPrice === 0 ||
    price < 0
  ) {
    return 0;
  }
  const discountAmount = listingPrice - price;
  const offerPercentage = (discountAmount / listingPrice) * 100;
  return Math.round(offerPercentage);
};

export const getRecordKey = (product, variantId) => {
  if (!product || !product.id) return "";
  if (variantId) return `${product.id}-${variantId}`;

  const firstVariant = getFirstVariant(product);
  return firstVariant ? `${product.id}-${firstVariant.id}` : product.id;
};

export const getUpdatedCart = (cartList = [], recordKey, payload) => {
  return cartList.map((item) =>
    item.recordKey === recordKey ? { ...item, ...payload } : item,
  );
};

export const getFirstVariant = (product, variantId) => {
  if (!product || !product.variants || !Array.isArray(product.variants.items))
    return null;

  const { items = [] } = product.variants;

  if (variantId) {
    return items.find((v) => v.id === variantId) || null;
  }

  return (
    items
      .slice() // Create a shallow copy to avoid mutating the original array
      .sort((a, b) => (a.position || 0) - (b.position || 0))
      .find((v) => v.inventory > 0) ||
    items[0] ||
    null
  );
};

export const getOfferValueWithPercentage = (price, listingPrice) => {
  if (
    typeof price !== "number" ||
    typeof listingPrice !== "number" ||
    listingPrice <= 0 ||
    price < 0
  ) {
    return 0;
  }
  return Math.round(((listingPrice - price) / listingPrice) * 100);
};

export const getProductSubTotal = (data) => {
  return data.reduce(
    (acc, { price = 0, cartQuantity = 1 }) => acc + price * cartQuantity,
    0,
  );
};
