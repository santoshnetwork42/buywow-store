import { STORE_PREFIX } from "@/config";

export const RESTRICT_FOOTER_TO_SHOW = ["/checkout"];
export const RESTRICT_SEARCH_AND_CART_TO_SHOW = ["/checkout"];
export const PREPAID_ENABLED = "PREPAID_ENABLED";
export const GOKWIK_ENABLED = "GOKWIK_ENABLED";
export const SHOW_SHIPPING_BAR = "SHOW_SHIPPING_BAR";
export const WEB_ANIMATED_BALLOON = "WEB_ANIMATED_BALLOON";
export const WEB_SPIN_THE_WHEEL_ENABLED = "WEB_SPIN_THE_WHEEL_ENABLED";
export const IS_PREPAID_DISCOUNT_TO_SHOW = "IS_PREPAID_DISCOUNT_TO_SHOW";
export const MAX_RECENTLY_VIEWED_PRODUCTS = 13;
export const STICKY_VIEW_CART_TO_SHOW = ["/", "/search", "/collections"];
export const AUTO_APPLY_COUPON_PATHNAMES = [
  "/",
  "/products",
  "/collections",
  "/search",
];

export const BALLOON_ALLOWED_PATHS = [
  "/",
  "/products",
  "/collections",
  "/search",
];

export const SPIN_THE_WHEEL_EXCLUDE_PATHS = [
  "/collections/buy-3-599",
  "/collections/buy-4-699",
  "/collections/buy-6-899",
  "/collections/buy-8-1000",
  "/collections/affiliate-buy-8",
  "/collections/gpay",
  "/collections/gpay-699",
  "/collections/buy-8-1199",
  "/collections/bundle-skin-hair-care",
  "/collections/bundle-deal",
  "/collections/all-products",
  "/collections/bundle-face-care",
  "/collections/cred-reward",
  "/collections/bundle-body-wash",
  "/collections/bundle-face-wash-Gpay",
  "/collections/bundle-body",
  "/collections/bundle-face-wash",
  "/collections/tuff3",
  "/checkout",
  "/blog",
  "/pages",
  "/policies",
];

export const LIMITED_TIME_DEAL_DURATION_IN_MINUTES = 2;
export const PAGETYPE = {
  HOME: "",
  LANDING: "",
  PAGES: "pages",
  POLICIES: "policies",
  COLLECTION: "collections",
  PRODUCT: "products",
};

export const PDP_BLOCK_PROMOTION_TAG_TO_IGNORE = [
  "brightening-vitamin-c-foaming-face-wash-with-built-in-brush-lp",
  "onion-hair-shampoo-for-hair-growth-hair-fall-lp",
  "onion-hair-shampoo-for-hair-growth-hair-fall-lp-2",
  "rosemary-biotin-hair-growth-shampoo-lp",
  "apple-cider-vinegar-foaming-face-wash-with-built-in-brush-lp",
  "vitamin-c-brightening-trio-lp",
  "brightening-vitamin-c-foaming-face-wash-with-built-in-brush-lp-2",
  "shea-cocoa-butter-moisturizing-lotion-lp",
  "rosemary-biotin-hair-growth-shampoo-lp-2",
  "onion-hair-fall-control-and-repair-trio",
];

export const STORAGE_KEY = STORE_PREFIX + "_" + "wheel_claimed_percentage";
export const STORAGE_TIME_KEY = STORE_PREFIX + "_" + "wheel_first_visit";
export const ATTEMPTS_KEY = STORE_PREFIX + "_" + "wheel_spin_attempts";
export const MAX_ATTEMPTS = 1;
export const MIN_START_PERCENTAGE = 65;
export const MAX_START_PERCENTAGE = 75;
export const MAX_PERCENTAGE = 95;
