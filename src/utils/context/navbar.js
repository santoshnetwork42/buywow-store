"use client";

import { NavbarProvider as Navbar, useConfiguration } from "@wow-star/utils";
import { generateClient } from "aws-amplify/api";
import Cookie from "js-cookie";
import { usePathname, useSearchParams } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { GUEST_CHECKOUT, STORE_ID, STORE_PREFIX } from "@/config";

const client = generateClient();

export const NavbarContext = createContext();

function NavbarProvider({ children, ignoreLazyloadNavbar }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const _source = searchParams.get("_source");

  const dispatch = useDispatch();
  const cartList = useSelector((state) => state?.cart?.data || []);
  const appliedCoupon = useSelector((state) => state?.cart?.coupon);
  const user = useSelector((state) => state?.user?.user);

  const [isInteractive, setIsInteractive] = useState(false);
  const [isRewardApplied, setIsRewardApplied] = useState(true);
  const [source, setSource] = useState(_source);

  useEffect(() => {
    if (_source) setSource(_source);
  }, [_source]);

  const handleRewardApply = useCallback((state) => {
    setIsRewardApplied(state);
  }, []);

  const apiResolve = useCallback(
    (query, variables, authMode) =>
      client.graphql({
        query,
        variables,
        authMode: authMode === "AUTH" ? "userPool" : "apiKey",
      }),
    [],
  );

  useEffect(() => {
    const handleInteraction = () => {
      setIsInteractive(true);
      window.removeEventListener("mousemove", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
    };

    window.addEventListener("mousemove", handleInteraction);
    window.addEventListener("scroll", handleInteraction);

    return () => {
      window.removeEventListener("mousemove", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
    };
  }, []);

  const contextValue = useMemo(
    () => ({
      isInteractive,
      isRewardApplied,
      handleRewardApply,
      source,
    }),
    [isInteractive, isRewardApplied, handleRewardApply, source],
  );

  return (
    <Navbar
      storeId={STORE_ID}
      resolve={apiResolve}
      isInteractive={true}
      cartItems={cartList}
      appliedCoupon={appliedCoupon}
      user={user}
      deviceType="WEB"
    >
      <NavbarContext.Provider value={contextValue}>
        {children}
      </NavbarContext.Provider>
    </Navbar>
  );
}

export const useNavBarState = () => {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error("useNavBarState must be used within a NavbarProvider");
  }
  return context;
};

export const useSource = () => {
  const { source } = useNavBarState();
  return source;
};

export const useIsInteractive = () => {
  const { isInteractive } = useNavBarState();
  return !!isInteractive;
};

export const useGuestCheckout = () => {
  const guestCheck = useConfiguration(GUEST_CHECKOUT, false);
  const guestCookie = Cookie.get(`${STORE_PREFIX}_guest`);
  return !!guestCheck || !!guestCookie;
};

export default NavbarProvider;
