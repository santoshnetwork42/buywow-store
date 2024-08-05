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

export const removePhonePrefix = (number) => {
  if (number && number.includes("+91")) return number.split("+91")[1];
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
  return cartList.map((item) => {
    if (recordKey === item.recordKey) {
      return { ...item, ...payload };
    }
    if (
      item.cartItemSource === "LIMITED_TIME_DEAL" &&
      item.parentRecordKey === recordKey &&
      payload.recordKey
    ) {
      return {
        ...item,
        parentRecordKey: payload.recordKey,
      };
    }

    return item;
  });
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
      .slice()
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
    listingPrice <= price ||
    price < 0
  ) {
    return 0;
  }
  return Math.round(((listingPrice - price) / listingPrice) * 100);
};

export const getProductSubTotal = (data) => {
  return data.reduce((acc, { price = 0, qty = 1 }) => acc + price * qty, 0);
};

export const getCKLocalData = (prefix) => {
  const keysAndValues = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith(prefix)) {
      const value = localStorage.getItem(key);
      keysAndValues[key] = value;
    }
  }
  return keysAndValues;
};

export const deleteCKLocalData = () => {
  const keys = Object.keys(localStorage).filter((key) => key.startsWith("bw_"));
  keys.forEach((key) => localStorage.removeItem(key));
};

export const checkAffiseValidity = () => {
  const ckSurvivalMinutes = 30 * 24 * 60;
  const ckLocalData = getCKLocalData("bw_");

  if (
    !ckLocalData.bw_timestamp ||
    !ckLocalData.bw_clickid ||
    !ckLocalData.bw_utm_medium?.toLowerCase().includes("affise_affiliate")
  ) {
    return false;
  }

  const providedDate = new Date(parseInt(ckLocalData.bw_timestamp) * 1000);
  const currentDate = new Date();
  const minutesDifference = (currentDate - providedDate) / (1000 * 60);

  if (minutesDifference > ckSurvivalMinutes) {
    deleteCKLocalData();
    return false;
  }

  const trackingParams = [
    "bw_gclid",
    "bw_fbclid",
    "bw_igshid",
    "bw_gad_source",
    "bw_msclkid",
  ];
  return !trackingParams.some((param) => param in ckLocalData);
};

export const toDecimal = (price, fixedCount = 2) => {
  let num = parseFloat(price);
  if (isNaN(num)) {
    num = 0;
  }
  return num.toLocaleString(undefined, {
    minimumFractionDigits: Number.isInteger(num) ? 0 : fixedCount,
    maximumFractionDigits: Number.isInteger(num) ? 0 : fixedCount,
  });
};

export const formateDate = (date) => {
  const dt = date ? new Date(date) : new Date();
  const dd = String(dt.getDate()).padStart(2, "0");
  const hh = String(dt.getHours() % 12).padStart(2, "0");
  const mm = String(dt.getMinutes()).padStart(2, "0");
  const monthName = dt.toLocaleString("en-IN", {
    month: "long",
  });
  const yyyy = dt.getFullYear();
  const ap = dt.getHours() >= 12 ? "pm" : "am";
  return `${dd} ${monthName} ${yyyy}, ${hh}:${mm} ${ap}`;
};

export const isEmailValid = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const nameSplitter = (name) => {
  const [firstName, ...lastName] = name.split(" ");
  return { firstName, lastName: lastName.join(" ") };
};
