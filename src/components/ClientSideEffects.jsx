"use client";

import {
  GUEST_CHECKOUT_COOKIE_EXPIRY,
  KWIKPASS_SCRIPT,
  STORE_PREFIX,
} from "@/config";
import { getUserAPI } from "@/lib/appSyncAPIs";
import { useCartDispatch } from "@/store/sagas/dispatch/cart.dispatch";
import { useEventsDispatch } from "@/store/sagas/dispatch/events.dispatch";
import { useSystemDispatch } from "@/store/sagas/dispatch/system.dispatch";
import { useUserDispatch } from "@/store/sagas/dispatch/user.dispatch";
import {
  BALLOON_ALLOWED_PATHS,
  WEB_ANIMATED_BALLOON,
} from "@/utils/data/constants";
import { useConfiguration } from "@wow-star/utils-cms";
import { getCurrentUser } from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";
import Cookies from "js-cookie";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import BirthdayCelebration from "./partials/BirthdayCelebration";
import SpinTheWheel from "./partials/SpinTheWheel";
import { useSelector } from "react-redux";
import { WEB_SPIN_THE_WHEEL_ENABLED } from "@/utils/data/constants";

const ClientSideEffects = () => {
  const searchParams = useSearchParams();
  const isSpinTheWheelEnabled = useConfiguration(
    WEB_SPIN_THE_WHEEL_ENABLED,
    false,
  );
  const pathname = usePathname();
  const sessionId = sessionStorage?.getItem(
    `${STORE_PREFIX}_coupon_session_id`,
  );

  const isCartOpen = useSelector(
    (state) => state.modal?.modal?.cart?.isCartOpen,
  );

  // useConfiguration(WEB_SPIN_THE_WHEEL, false);
  // BALLOON_ALLOWED_PATHS used bcz same condition for spin the wheel to float
  const isSpinTheWheelAllowed =
    isSpinTheWheelEnabled &&
    BALLOON_ALLOWED_PATHS.some(
      (allowedPath) =>
        pathname === allowedPath ||
        (allowedPath !== "/" && pathname.startsWith(`${allowedPath}/`)),
    );

  const isBalloonAnimationAllowed = useConfiguration(
    WEB_ANIMATED_BALLOON,
    false,
  );

  const { updateMeta, setStore, destroySession } = useSystemDispatch();
  const { setUser } = useUserDispatch();
  const {
    authEvent: authEventHandler,
    sessionStartedEvent,
    sessionDestroyEvent,
    homeViewedEvent,
  } = useEventsDispatch();
  const { storeCoupon } = useCartDispatch();

  useEffect(() => {
    const couponCode =
      searchParams.get("couponCode")?.split("&")[0] ||
      searchParams.get("couponcode")?.split("&")[0];

    if (couponCode) {
      const expiryTime = new Date().getTime() + 24 * 60 * 60 * 1000;
      storeCoupon({ couponCode, couponExpiry: expiryTime });
    }
    //   eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const getLandingTypeWithSession = () => {
    const { utm_source: source } = Object.fromEntries(searchParams);
    const referrer = document?.referrer;
    const searchEngines = [
      "google",
      "bing",
      "yahoo",
      "duckduckgo",
      "baidu",
      "yandex",
    ];

    let landingType = null;

    if (!source?.trim()) {
      if (!referrer) {
        landingType = "DIRECT";
      } else {
        try {
          const referrerUrl = new URL(referrer);
          const isFromSearchEngine = searchEngines.some((engine) =>
            referrerUrl?.hostname?.includes(engine),
          );

          if (isFromSearchEngine) {
            landingType = "ORGANIC";
          }
        } catch (error) {
          console.error("Error parsing referrer URL:", error);
        }
      }
    }

    return landingType;
  };

  const setMetaData = useCallback(() => {
    const cookieMeta = Cookies.get(`${STORE_PREFIX}_metadata`);
    const meta = cookieMeta ? JSON.parse(cookieMeta) : {};

    const {
      utm_campaign: campaign,
      utm_content: content,
      utm_medium: medium,
      utm_source: source,
      utm_term: term,
      clickid,
    } = Object.fromEntries(searchParams);
    const landingPage = window?.location?.href;
    const referrer = document?.referrer;

    const metadata = {
      landingPage: meta?.landingPage || landingPage || null,
      referrer: referrer || meta?.referrer || null,
      utmCampaign: campaign || meta?.utmCampaign || null,
      utmContent: content || meta?.utmContent || null,
      utmMedium: medium || meta?.utmMedium || null,
      utmSource: source || meta?.utmSource || null,
      utmTerm: term || meta?.utmTerm || null,
      clickId: clickid || meta?.clickId || "",
    };

    if (JSON.stringify(metadata) !== cookieMeta) {
      Cookies.set(`${STORE_PREFIX}_metadata`, JSON.stringify(metadata));
    }

    if (!Cookies.get(`${STORE_PREFIX}_session_id`)) {
      const sessionId = uuidv4();
      const type = getLandingTypeWithSession();

      Cookies.set(`${STORE_PREFIX}_session_id`, sessionId, {
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
      });
      sessionStartedEvent({
        sessionId,
        traffic_source: type,
      });
    }

    updateMeta(metadata);
  }, [searchParams, updateMeta]);

  const setGuestCheckout = useCallback(() => {
    const guestParam = searchParams.get("guest");

    if (guestParam === "1") {
      const expiryDate = new Date();
      expiryDate.setTime(
        expiryDate.getTime() + GUEST_CHECKOUT_COOKIE_EXPIRY * 60 * 60 * 1000,
      );
      const cookieOptions = { expires: expiryDate };
      Cookies.set(`${STORE_PREFIX}_guest`, "1", cookieOptions);
    }
  }, [searchParams]);

  const fetchAndSetUser = useCallback(async () => {
    try {
      const storedUserJson = localStorage.getItem(`${STORE_PREFIX}-user`);
      const storedUser = storedUserJson
        ? JSON.parse(storedUserJson).user
        : null;

      if (!JSON.parse(storedUser)?.id) {
        const currentUser = await getCurrentUser().catch(() => null);
        if (currentUser) {
          const fetchedUserData = await getUserAPI();
          setUser(fetchedUserData);
        }
      } else {
        const currentUser = await getCurrentUser().catch(() => null);
        if (!currentUser) {
          destroySession();
          sessionDestroyEvent({
            sessionId: Cookies.get(`${STORE_PREFIX}_session_id`),
          });
        }
      }
    } catch (error) {
      destroySession();
      sessionDestroyEvent();
      console.error("Error fetching user data:", error);
    }
  }, [setUser, destroySession]);

  const setStoreData = useCallback(() => {
    const storeData = {
      id: "6eb42c89-4955-4fc8-8a87-b4ff92e0908c",
      imageUrl: "imageUrl/1709542716771-logoo.webp",
      name: "Buy Wow",
      title: "Wow Skin Science India",
      webUrl: "https://wow-frontend-git-develop-wowhealth123.vercel.app",
    };
    setStore(storeData);
  }, [setStore]);

  useEffect(() => {
    const hubListenerCancelToken = Hub.listen("auth", async (authEvent) => {
      const { event } = authEvent.payload;
      if (event === "signedOut") {
        destroySession();
        authEventHandler({ action: "logout" });
      } else {
        fetchAndSetUser();
      }
    });

    fetchAndSetUser();

    return () => {
      hubListenerCancelToken();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (pathname === "/") {
      homeViewedEvent();
    }
  }, [pathname]);

  useEffect(() => {
    if (!sessionId) {
      const id = uuidv4();
      sessionStorage?.setItem(`${STORE_PREFIX}_session_id`, id);
    }
    const script = document.createElement("script");
    script.src = KWIKPASS_SCRIPT;
    script.async = true;

    script.onload = () => {
      document.addEventListener("DOMContentLoaded", () => {
        // window.kpUpdateDOM();
      });
    };

    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    setMetaData();
    setGuestCheckout();
    setStoreData();
  }, [setMetaData, setGuestCheckout, setStoreData]);

  if (isBalloonAnimationAllowed) {
    return (
      <>
        <BirthdayCelebration />
        {!isCartOpen && isSpinTheWheelAllowed && <SpinTheWheel />}
      </>
    );
  }
  return <>{!isCartOpen && isSpinTheWheelAllowed && <SpinTheWheel />}</>;
};

export default ClientSideEffects;
