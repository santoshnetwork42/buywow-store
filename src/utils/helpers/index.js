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

export const getFirstVariant = (product, variantId) => {
  try {
    if (!product) return null;

    const { variants: { items = [] } = {} } = product;

    const tempItems = [...items];

    if (variantId) {
      const variantById = items.find((v) => v.id === variantId);
      if (variantById) return variantById;
    }

    const sortedVariants = tempItems.sort((a, b) => a.position - b.position);
    return (
      sortedVariants.find((v) => v.inventory > 0) || sortedVariants[0] || null
    );
  } catch (err) {
    throw err;
  }
};

export const getOfferValueWithPercentage = (price, listingPrice) => {
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

export const getProductSubTotal = (data) => {
  return data.reduce((acc, item) => {
    const { price, quantity = 1 } = item;
    return acc + price * quantity;
  }, 0); // 0 is the initial value
};
