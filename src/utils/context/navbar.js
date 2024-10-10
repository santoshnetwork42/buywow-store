"use client";

import { GUEST_CHECKOUT, STORE_ID, STORE_PREFIX } from "@/config";
import {
  getProductInventory,
  NavbarProvider as Navbar,
  useConfiguration,
} from "@wow-star/utils";
import { generateClient } from "aws-amplify/api";
import Cookie from "js-cookie";
import { usePathname, useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const client = generateClient();

export const NavbarContext = createContext();

async function fetchInitialData() {
  const response = await fetch(`/api/preload`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

function NavbarProvider({ children, headerData }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const _source = searchParams.get("_source");
  const forceOpenCart = searchParams.get("cart") === 1;

  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    fetchInitialData()
      .then((data) => {
        setInitialData(data);
      })
      .catch((err) => {
        console.error("Error fetching initial data:", err);
      });
  }, []);

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
    headerData,
  };

  console.log(pathname, "pathname");
  return (
    <Navbar
      storeId={STORE_ID}
      resolve={apiResolve}
      isInteractive={
        isInteractive || pathname === "/checkout" || pathname === "/cart"
      }
      cartItems={cartList}
      appliedCoupon={appliedCoupon}
      user={user?.id ? user : null}
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
      getLtoProducts={
        initialData?.searchUpsellProducts?.items?.filter((lto) => {
          let status = lto.product.status === "ENABLED";
          if (lto.variantId) {
            const variant = lto.product.variants.items.find(
              (v) => v.id === lto.variantId,
            );
            status = variant.status === "ENABLED";
          }

          const { hasInventory } = getProductInventory(
            lto.product,
            lto.variantId,
            initialData?.getStoreSetting?.configurations?.BLOCK_INVENTORY,
          );

          return hasInventory && status;
        }) || []
      }
    >
      <NavbarContext.Provider value={contextValue}>
        {children}
      </NavbarContext.Provider>
    </Navbar>
  );
}

export const useNavbar = () => {
  return useContext(NavbarContext);
};

export const useSource = () => {
  const { source } = useContext(NavbarContext);
  return source;
};

export const useIsInteractive = () => {
  const { isInteractive } = useContext(NavbarContext) || {};
  return isInteractive;
};

export const useGuestCheckout = () => {
  const guestCheck = useConfiguration(GUEST_CHECKOUT, false);
  const guestCookie = Cookie.get(`${STORE_PREFIX}_guest`);
  return !!guestCheck || !!guestCookie;
};

export default NavbarProvider;
