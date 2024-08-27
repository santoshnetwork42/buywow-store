"use client";

import { GUEST_CHECKOUT, STORE_ID, STORE_PREFIX } from "@/config";
import { NavbarProvider as Navbar, useConfiguration } from "@wow-star/utils";
import { generateClient } from "aws-amplify/api";
import Cookie from "js-cookie";
import { usePathname, useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const client = generateClient();

export const NavbarContext = createContext();

function NavbarProvider({ children, initialData }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const _source = searchParams.get("_source");

  const cartList = useSelector((state) => state.cart?.data || []);
  const appliedCoupon = useSelector((state) => state.cart?.coupon);
  const user = useSelector((state) => state.user?.user);

  const [isInteractive, setIsInteractive] = useState(false);
  const [source, setSource] = useState(_source);

  useEffect(() => {
    if (_source) setSource(_source);
  }, [_source]);

  const apiResolve = async (query, variables, authMode) => {
    try {
      const response = await client.graphql({
        query,
        variables,
        authMode: authMode === "AUTH" ? "userPool" : "apiKey",
      });
      return response;
    } catch (error) {
      console.error("Error in apiResolve function:", error);
    }
  };

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

  const contextValue = {
    isInteractive,
    source,
  };

  return (
    <Navbar
      storeId={STORE_ID}
      resolve={apiResolve}
      isInteractive={
        isInteractive || pathname === "/checkout" || pathname === "/cart"
      }
      cartItems={cartList}
      appliedCoupon={appliedCoupon}
      user={user}
      deviceType="WEB"
      listVariantGroups={initialData?.listVariantGroups}
      byStoreIdRuleEngine={initialData?.byStoreIdRuleEngine?.items}
      getStoreSetting={initialData?.getStoreSetting?.configurations}
      searchShippingTiers={initialData?.searchShippingTiers?.items}
      getTopCoupons={
        initialData?.getTopCoupons?.items?.filter((coupon) => {
          const { expirationDate } = coupon;
          return (
            !expirationDate ||
            new Date(expirationDate).getTime() >= new Date().getTime()
          );
        }) || []
      }
    >
      <NavbarContext.Provider value={contextValue}>
        {children}
      </NavbarContext.Provider>
    </Navbar>
  );
}

export const useSource = () => {
  const { source } = useContext(NavbarContext);
  return source;
};

export const useIsInteractive = () => {
  const { isInteractive } = useContext(NavbarContext);
  return isInteractive;
};

export const useGuestCheckout = () => {
  const guestCheck = useConfiguration(GUEST_CHECKOUT, false);
  const guestCookie = Cookie.get(`${STORE_PREFIX}_guest`);
  return !!guestCheck || !!guestCookie;
};

export default NavbarProvider;
