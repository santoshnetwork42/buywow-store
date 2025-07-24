import { STORE_PREFIX } from "@/config";

export const RESTRICT_FOOTER_TO_SHOW = ["/checkout", "/pages/app-exclusive"];
export const RESTRICT_SEARCH_AND_CART_TO_SHOW = ["/checkout"];
export const PREPAID_ENABLED = "PREPAID_ENABLED";
export const GOKWIK_ENABLED = "GOKWIK_ENABLED";
export const SHOW_SHIPPING_BAR = "SHOW_SHIPPING_BAR";
export const WEB_ANIMATED_BALLOON = "WEB_ANIMATED_BALLOON";
export const WEB_SPIN_THE_WHEEL_ENABLED = "WEB_SPIN_THE_WHEEL_ENABLED";
export const SPIN_THE_WHEEL_CONFIG = "SPIN_THE_WHEEL_CONFIG";
export const IS_PREPAID_DISCOUNT_TO_SHOW = "IS_PREPAID_DISCOUNT_TO_SHOW";
export const COD_BLOCKED_UTM_SOURCES = "COD_BLOCKED_UTM_SOURCES";
export const IS_SOCIAL_PROOF_ENABLED = "IS_SOCIAL_PROOF_ENABLED";
export const MAX_RECENTLY_VIEWED_PRODUCTS = 13;
export const STICKY_VIEW_CART_TO_SHOW = [
  "/",
  "/search",
  "/collections",
  "/nutrition-health",
  "/wowskinscience",
  "/wowlifescience",
  "/bodycupid",
  "/colorcupid",
  "/naturederma",
];
export const AUTO_APPLY_COUPON_PATHNAMES = [
  "/",
  "/products",
  "/collections",
  "/search",
  "/nutrition-health",
  "/wowskinscience",
  "/wowlifescience",
  "/bodycupid",
  "/colorcupid",
  "/naturederma",
];

export const BALLOON_ALLOWED_PATHS = [
  "/",
  "/products",
  "/collections",
  "/search",
  // "/bodycupid",
  // "/wowskinscience",
  // "/nutrition-health",
];

export const SOCIAL_PROOF_INCLUDE_PATHS = ["/"];

export const LIMITED_TIME_DEAL_DURATION_IN_MINUTES = 2;
export const PAGETYPE = {
  HOME: "",
  LANDING: "",
  PAGES: "pages",
  POLICIES: "policies",
  COLLECTION: "collections",
  PRODUCT: "products",
  OFFERS: "offers",
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
export const NOT_TO_REDIRECT_ON_PDP_FOR_THESE_COLLECTIONS = [
  "buy-3-599",
  "buy-4-699",
  "buy-6-899",
  "buy-8-1000",
  "affiliate-buy-8",
  "gpay",
  "gpay-699",
  "buy-8-1199",
  "bundle-skin-hair-care",
  "bundle-deal",
  "gpay",
  "cred-reward",
  "affiliate-buy-8",
  "face-wash-bundle",
  "999-triple-deal",
  "cred-exclusive",
  "cred-exclusive-1",
  "cred-exclusive-2",
  "buy-5-799",
  "buy-8-1199",
];
export const STORAGE_KEY = STORE_PREFIX + "_" + "wheel_claimed_percentage";
export const WHEEL_HAS_VISITED_BEFORE_KEY =
  STORE_PREFIX + "_" + "hasVisitedBefore";
export const STORAGE_TIME_KEY = STORE_PREFIX + "_" + "wheel_first_visit";
export const ATTEMPTS_KEY = STORE_PREFIX + "_" + "wheel_spin_attempts";
export const MIN_START_PERCENTAGE = 65;
export const MAX_START_PERCENTAGE = 75;
export const MAX_PERCENTAGE = 95;
