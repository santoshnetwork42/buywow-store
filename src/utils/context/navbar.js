'use client';

import { NavbarProvider as Navbar, useConfiguration } from "@wow-star/utils";
import { generateClient } from "aws-amplify/api";
import Cookie from "js-cookie";
import { usePathname, useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { cartActions } from "~/store/cart";
import { GUEST_CHECKOUT, STORE_ID, STORE_PREFIX } from "../../../config";

const client = generateClient();

export const NavbarContext = createContext();

function NavbarProvider({
  children,
  ignoreLazyloadNavbar,
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const _source = searchParams.get('_source');

  const dispatch = useDispatch();
  const cartList = useSelector(state => state.cart.data || []);
  const appliedCoupon = useSelector(state => state.cart.coupon);
  const user = useSelector(state => state.user.data);

  const [isInteractive, setIsInteractive] = useState(false);
  const [isRewardApplied, setIsRewardApplied] = useState(true);
  const [source, setSource] = useState(_source);

  useEffect(() => {
    if (_source) setSource(_source);
  }, [_source]);

  const handleRewardApply = (state) => {
    // dispatch(cartActions.applyRewardPoint(state));
    setIsRewardApplied(state);
  };

  const apiResolve = (query, variables, authMode) =>
    client.graphql({
      query,
      variables,
      authMode: authMode === "AUTH" ? "userPool" : "apiKey",
    });

  useEffect(() => {
    // const handleMouseMovement = () => {
    //   setIsInteractive(true);
    //   window.removeEventListener("mousemove", handleMouseMovement);
    //   window.removeEventListener("scroll", handleMouseMovement);
    // };

    // window.addEventListener("mousemove", handleMouseMovement);
    // window.addEventListener("scroll", handleMouseMovement);

    // return () => {
    //   window.removeEventListener("mousemove", handleMouseMovement);
    //   window.removeEventListener("scroll", handleMouseMovement);
    // };
  }, []);

  return (
    <Navbar
      storeId={STORE_ID}
      resolve={apiResolve}
      isInteractive={isInteractive || ignoreLazyloadNavbar}
      cartItems={cartList}
      appliedCoupon={appliedCoupon}
      user={user}
      deviceType="WEB"
    >
      <NavbarContext.Provider
        value={{ isInteractive, isRewardApplied, handleRewardApply, source }}
      >
        {children}
      </NavbarContext.Provider>
    </Navbar>
  );
}

export const useNavBarState = () => useContext(NavbarContext);

export const useSource = () => {
  const { source } = useContext(NavbarContext) || {};
  return source;
};

export const useIsInteractive = () => {
  const { isInteractive } = useContext(NavbarContext) || {};
  return !!isInteractive;
};

export const useGuestCheckout = () => {
  const guestCheck = useConfiguration(GUEST_CHECKOUT, false);
  const guestCookie = Cookie.get(`${STORE_PREFIX}_guest`);
  if (!!guestCheck || guestCookie) return true;
  return false;
};

export default NavbarProvider;