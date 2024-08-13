import { showToast } from "@/components/common/ToastComponent";
import { STORE_PREFIX } from "@/config";
import Cookies from "js-cookie";
import platform from "platform";
import toast from "react-hot-toast";

export function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  const array = new Uint8Array(length);

  crypto.getRandomValues(array);

  return Array.from(array, (x) => characters[x % charactersLength]).join("");
}

export function validatePhoneNumber(phoneNumber) {
  if (isPhoneNumberValid(phoneNumber)) {
    return { error: false };
  }
  return { error: true, message: "Invalid Phone Number" };
}

export function isPhoneNumberValid(phoneNumber) {
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

export const getDiscountPercentage = (price, listingPrice) => {
  if (
    typeof price !== "number" ||
    typeof listingPrice !== "number" ||
    listingPrice <= price ||
    price < 0
  ) {
    return null;
  }
  return Math.round(((listingPrice - price) / listingPrice) * 100);
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
  return parseFloat(num.toFixed(fixedCount));
};

export const formatTotalRatings = (totalRatings) => {
  if (!totalRatings) return "0";
  return totalRatings > 9999
    ? `${Math.floor(totalRatings / 1000)}k+`
    : totalRatings.toString();
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

export const copyText = (copyText, toastMessage) => {
  if (copyText && navigator?.clipboard) {
    navigator.clipboard.writeText(copyText);
    showToast.success(toastMessage);
  } else {
    console.error("Invalid copy text or clipboard not supported.");
  }
};

export const isEmailValid = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const nameSplitter = (name) => {
  const [firstName, ...lastName] = name.split(" ");
  return { firstName, lastName: lastName.join(" ") };
};

export const validatePinCode = (pinCode) => {
  if (pinCode?.length !== 6) {
    return { error: true, message: "Pin code must be 6 digits" };
  }
  return { error: false };
};

export const validateString = (inputString) => {
  if (!!inputString?.length) {
    return { error: false };
  }
  return { error: true, message: "Invalid Input" };
};

export const validateEmail = (email) => {
  if (isEmailValid(email)) {
    return { error: false };
  }
  return { error: true, message: "Invalid Email" };
};

export const calculateTotals = (productItems) => {
  return productItems.reduce(
    (acc, { quantity, price, cancelledQuantity = 0 }) => {
      const activeTotal = quantity * price;
      const totalWithCancelled = (quantity + cancelledQuantity) * price;
      return {
        activeItemsTotalPrice: acc.activeItemsTotalPrice + activeTotal,
        itemsTotalPrice: acc.itemsTotalPrice + totalWithCancelled,
      };
    },
    { activeItemsTotalPrice: 0, itemsTotalPrice: 0 },
  );
};

export const orderStatusBadge = {
  CONFIRMED: {
    color: "#008000",
  },
  CANCELLED: {
    color: "#ff0000",
  },
  DISPATCHED: {
    color: "#0EA5E9",
  },
  DELIVERED: {
    color: "#0000ff",
  },
};

export const analyticsMetaDataMapper = () => {
  // Collect device details
  const deviceDetails = {
    os: platform.os.family || "Unknown",
    browser: platform.name || "Unknown",
    browserVersion: platform.version || "Unknown",
    deviceType: platform.product || "Desktop",
    userAgent: navigator.userAgent || "Unknown",
    screenWidth: window.screen.width || 0,
    screenHeight: window.screen.height || 0,
  };

  // referrer information
  const referrer = document.referrer || "";

  // page information
  const pageInfo = {
    url: window.location.href || "",
    path: window.location.pathname || "",
    queryParams: window.location.search || "",
  };

  // UTM parameters
  const urlParams = new URLSearchParams(window.location.search || "");
  const utmParameters = {
    utmSource: urlParams.get("utm_source"),
    utmMedium: urlParams.get("utm_medium"),
    utmCampaign: urlParams.get("utm_campaign"),
    utmTerm: urlParams.get("utm_term"),
    utmContent: urlParams.get("utm_content"),
  };
  const sessionId = Cookies.get(`${STORE_PREFIX}_session_id`);

  const analyticsData = {
    deviceDetails,
    referrer,
    pageInfo,
    utmParameters,
    sessionId,
    timestamp: new Date().toISOString(),
  };
  return analyticsData;
};

export const getSource = () => {
  return typeof window !== "undefined" && window?.innerWidth > 575
    ? "Web"
    : "Mobile";
};
