import { STORE_PREFIX } from "@/config";
import { addPhonePrefix } from "@/utils/helpers";

export const userMapper = (userData, address) => {
  const {
    city,
    state,
    country,
    pinCode = address?.pincode,
    phone: aP,
    firstName: aF = address?.first_name,
    lastName: aL = address?.last_name,
    email: aE,
    userId = address?.userId,
  } = address || {};

  if (userData) {
    const { phone, id, firstName, lastName, email, gender, dob, totalOrders } =
      userData;
    return {
      phone: addPhonePrefix(aP || phone),
      firstName: aF || firstName,
      lastName: aL || lastName,
      email: aE || email,
      gender,
      dob,
      totalOrders,
      city,
      state,
      country,
      pinCode,
      id,
    };
  }

  return {
    phone: addPhonePrefix(aP),
    firstName: aF,
    lastName: aL,
    email: aE,
    city,
    state,
    country,
    pinCode,
    id: userId,
  };
};

const getUTMParameters = () => {
  const urlParams = new URLSearchParams(window?.location?.search);
  return ["source", "medium", "campaign", "term", "content"].reduce(
    (acc, param) => {
      const value = urlParams?.get(`utm_${param}`);
      if (value)
        acc[`utm${param.charAt(0).toUpperCase() + param.slice(1)}`] = value;
      return acc;
    },
    {},
  );
};

export const analyticsMetaDataMapper = () => {
  const { screen, location, navigator, document } = window || {};

  return {
    deviceDetails: {
      os: platform.os.family,
      browser: platform.name,
      browserVersion: platform.version,
      deviceType: platform.product || "Desktop",
      userAgent: navigator.userAgent,
      screenWidth: screen.width,
      screenHeight: screen.height,
    },
    referrer: document.referrer,
    pageInfo: {
      url: location.href,
      path: location.pathname,
      queryParams: location.search,
    },
    utmParameters: getUTMParameters(),
    sessionId: Cookie.get(`${STORE_PREFIX}_session_id`),
    timestamp: new Date().toISOString(),
  };
};

export const trackClickStream = async (payload) => {
  try {
    const NEXT_PUBLIC_CLICK_STREAM_WEBHOOK_URL =
      process.env.NEXT_PUBLIC_CLICK_STREAM_WEBHOOK_URL;

    const response = await fetch(NEXT_PUBLIC_CLICK_STREAM_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ payload }),
    });

    if (!response?.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log("Clickstream event tracked successfully");
  } catch (error) {
    console.error("Failed to track clickstream event:", error);
  }
};

export const initializeMoengageAndAddInfo = ({
  firstName,
  lastName,
  email,
  phone,
}) => {
  const Moengage = window?.Moengage;
  if (Moengage) {
    const mobile = phone?.split("+91")[1];
    if (firstName) Moengage.add_first_name(firstName);
    if (lastName) Moengage.add_last_name(lastName);
    if (email) Moengage.add_email(email);
    if (mobile) Moengage.add_mobile(mobile);
    if (mobile) Moengage.add_unique_user_id(mobile);
  }
};

export const getClientSource = () => {
  return typeof window !== "undefined" && window?.innerWidth > 575
    ? "Web"
    : "Mobile";
};

export const moeEvent = (title, payload) => {
  const moe = window?.Moengage;
  if (moe) {
    moe.track_event(title, payload);
  }
};

export const trackEvent = (title, payload) => {
  if (window?.Moengage) {
    moeEvent(title, payload);
  } else {
    window?.addEventListener("MOE_LIFECYCLE", function (e) {
      if (e.detail.name === "SDK_INITIALIZED") {
        moeEvent(title, payload);
      }
    });
  }
};
