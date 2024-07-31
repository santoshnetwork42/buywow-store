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
    (acc, { price = 0, qty = 1 }) => acc + price * qty,
    0,
  );
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
  Object.keys(localStorage).forEach(function (key) {
    if (/^bw_/.test(key)) {
      localStorage.removeItem(key);
    }
  });
};

export const checkAffiseValidity = () => {
  const ckSurvivalMinutes = 30 * 24 * 60;
  // Retrieve local storage data with a specific prefix
  const ckLocalData = getCKLocalData("bw_");
  // console.log("ckLocalData :", ckLocalData);cons
  if (
    ckLocalData.bw_timestamp &&
    ckLocalData.bw_clickid &&
    (ckLocalData.bw_utm_medium === "affise_affiliate" ||
      ckLocalData.bw_utm_medium.toLowerCase().includes("affise_affiliate"))
  ) {
    const epochTimestamp = ckLocalData.bw_timestamp;
    const date = new Date(epochTimestamp * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const formattedDateTime =
      year +
      "-" +
      month +
      "-" +
      day +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds;
    const providedDate = new Date(formattedDateTime);
    const currentDate = new Date();
    const timeDifference = currentDate - providedDate;
    const minutesDifference = timeDifference / (1000 * 60);

    // Check if the difference is within the survival days
    if (minutesDifference <= ckSurvivalMinutes) {
      // Check if tracking parameters are present
      if (
        !("bw_gclid" in ckLocalData) &&
        !("bw_fbclid" in ckLocalData) &&
        !("bw_igshid" in ckLocalData) &&
        !("bw_gad_source" in ckLocalData) &&
        !("bw_msclkid" in ckLocalData)
      ) {
        // Send postback data
        return true;
      }
    } else {
      // Delete local storage data if it's older than the survival days
      deleteCKLocalData();
      return false;
    }
  } else {
    // console.log("Clickid or utm_source or timestamp not found");
    return false;
  }
};