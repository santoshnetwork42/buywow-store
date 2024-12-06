export const AUDITZ = process.env.NEXT_PUBLIC_AUDITZ === "true";
export const STRAPI_API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
export const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
export const AWS_CLIENT_ID = process.env.NEXT_PUBLIC_AWS_CLIENT_ID;
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH;
export const MEDIA_BASE_URL = process.env.NEXT_PUBLIC_MEDIA_BASE_URL;
export const STORE_ID = process.env.NEXT_PUBLIC_STORE_ID;
export const STORE_PREFIX = process.env.NEXT_PUBLIC_STORE_PREFIX;
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
export const GUEST_CHECKOUT = process.env.NEXT_PUBLIC_GUEST_CHECKOUT;
export const RAZORPAY_SCRIPT = "https://checkout.razorpay.com/v1/checkout.js";
export const RAZORPAY_KEY = process.env.NEXT_PUBLIC_RAZORPAY_KEY;
export const GUEST_CHECKOUT_COOKIE_EXPIRY = 48;
export const GEOCODING_API_URL =
  "https://maps.googleapis.com/maps/api/geocode/json";
export const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
export const GOKWIK_MID = process.env.NEXT_PUBLIC_GOKWIK_MID;
export const GOKWIK_SCRIPT = process.env.NEXT_PUBLIC_GOKWIK_SCRIPT;
export const LIMECHAT_BASE_URL = process.env.NEXT_PUBLIC_LIMECHAT_BASE_URL;
export const LIMECHAT_ENABLED =
  process.env.NEXT_PUBLIC_LIMECHAT_ENABLED === "true";
export const LIMECHAT_WEBSITE_TOKEN =
  process.env.NEXT_PUBLIC_LIMECHAT_WEBSITE_TOKEN;
export const WISEPOPS_KEY = process.env.NEXT_PUBLIC_WISEPOPS_KEY;
export const WORDPRESS_URL = process.env.NEXT_PUBLIC_WP_URL;
export const WORDPRESS_MEDIA_URL = process.env.NEXT_PUBLIC_WP_MEDIA_URL;
export const WORDPRESS_IP = process.env.NEXT_PUBLIC_WP_IP;
export const WORDPRESS_AUTH = process.env.NEXT_PUBLIC_WP_AUTH;
export const WORDPRESS_USERNAME = process.env.NEXT_PUBLIC_WP_USERNAME;
export const WORDPRESS_PASSWORD = process.env.NEXT_PUBLIC_WP_PASSWORD;
export const WORDPRESS_AVATAR_URL = process.env.NEXT_PUBLIC_WP_AVATAR_URL;
export const TTM_CLIENT_URL = process.env.NEXT_PUBLIC_TTM_CLIENT_URL;
export const TTM_CLIENT_API_KEY = process.env.NEXT_PUBLIC_TTM_CLIENT_API_KEY;
export const TTM_CLIENT_THRESHOLD =
  process.env.NEXT_PUBLIC_TTM_CLIENT_THRESHOLD;
export const PREBUILD_ALL_PAGES =
  process.env.NEXT_PREBUILD_ALL_PAGES === "true";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
export const SWOP_STORE_BANNER_URL =
  process.env.NEXT_PUBLIC_SWOP_STORE_BANNER_URL;
export const VERCEL_CHECKOUT_AB_FLAG = `${STORE_PREFIX}_${process.env.NEXT_PUBLIC_VERCEL_CHECKOUT_AB_FLAG}`;
export const VERCEL_ANALYTICS_ENABLED =
  process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_ENABLED === "true";
export const GOOGLE_VERIFICATION_TAG =
  process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION_TAG;
export const STORE_ENV = process.env.STORE_ENV;
export const KWIKPASS_SCRIPT = process.env.NEXT_PUBLIC_KWIKPASS_SCRIPT;
