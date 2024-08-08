"use client";

import { GUEST_CHECKOUT, STORE_ID, STORE_PREFIX } from "@/config";
import { NavbarProvider as Navbar, useConfiguration } from "@wow-star/utils";
import { generateClient } from "aws-amplify/api";
import { getCurrentUser } from "aws-amplify/auth";
import Cookie from "js-cookie";
import { usePathname, useSearchParams } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";

const client = generateClient();

export const NavbarContext = createContext();

function NavbarProvider({ children, ignoreLazyLoadNavbar }) {
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

  const checkForUser = async () => {
    try {
      const { username, userId, signInDetails } = await getCurrentUser();
      console.log(`The username: ${username}`);
      console.log(`The userId: ${userId}`);
      console.log(`The signInDetails: ${signInDetails}`);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const apiResolve = useCallback(async (query, variables, authMode) => {
    try {
      const isAuthenticated = await checkForUser();
      const result = await client?.graphql({
        query,
        variables,
        authMode: isAuthenticated ? "userPool" : "apiKey",
      });
      if (result.errors) {
        console.error("GraphQL Errors:", result.errors);
        // Handle GraphQL errors
      }
      return result;
    } catch (error) {
      console.error("API resolve error:", error);
      // Handle the error appropriately
    }
  }, []);

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
