"use client";

import { MenuSVG } from "@/assets/images";
import { Button, Img, Input, Text } from "@/components/common";
import Link from "next/link";
import React, { useState } from "react";
import NavMenu from "@/components/common/partials/NavMenu";
import SearchBar from "@/components/common/partials/SearchBar";
import MobileMenu from "@/components/common/partials/MobileMenu";
import { DownArrowIconSVG } from "@/assets/images/downArrow";
import Passwordless from "../Passwordless";
import { useDispatch } from "react-redux";
import { modalSagaActions } from "@/store/sagas/sagaActions/modal.actions";

export default function Header({ data, ...props }) {
  const dispatch = useDispatch();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { logo, VIPMembershipLogo, mWebMenuLogo, menu } =
    data?.data?.attributes || {};

  const { url: logoUrl, alternativeText: logoAlternativeText = "logo" } =
    logo?.data?.attributes || {};

  const { url: vipUrl, alternativeText: vipAlternativeText = "logo" } =
    VIPMembershipLogo?.data?.attributes || {};

  const openMobileMenu = () => setIsMobileMenuOpen(true);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const renderMenuItem = (item, index) => {
    if (item.subMenu.length > 0) {
      return (
        <li key={item.id || index} className="group relative">
          <div className="flex cursor-pointer items-center gap-1">
            <Text size="base" as="p" className="capitalize" responsive>
              {item.title}
            </Text>
            <DownArrowIconSVG />
          </div>
          <NavMenu menuItems={item.subMenu} />
        </li>
      );
    } else {
      return (
        <li key={item.id || index}>
          <Link href={item.slug}>
            <Text size="base" as="p" className="capitalize" responsive>
              {item.title}
            </Text>
          </Link>
        </li>
      );
    }
  };

  return (
    <header className={`${props.className} relative`}>
      <div className="container-main flex border-b-[0.5px] border-solid border-gray-300_01 bg-white-a700_01 py-2.5 md:py-3 lg:py-4">
        <div className="flex flex-1 flex-wrap items-center justify-between gap-x-5 gap-y-2.5 md:flex-nowrap">
          {/* Logo and mobile menu button */}
          <div className="flex flex-shrink-0 items-center gap-5">
            <div className="mt-2 lg:hidden">
              <MenuSVG
                onClick={openMobileMenu}
                height={24}
                width={24}
                fillColor="#000000ff"
              />
            </div>
            <Link href="/">
              <div className="flex items-center gap-1">
                <Img
                  src={logoUrl}
                  width={86}
                  height={48}
                  alt={logoAlternativeText}
                  isStatic
                  className="aspect-[86/48] w-[86px] object-contain"
                />
                <div className="h-[35px] w-[0.5px] bg-gray-300_01" />
                <Img
                  src={vipUrl}
                  width={70}
                  height={28}
                  alt={vipAlternativeText}
                  isStatic
                  className="aspect-[70/28] w-[70px] object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Desktop menu items */}
          {!!menu?.length && (
            <ul className="hidden flex-wrap gap-y-2 lg:flex lg:gap-x-3 xl:gap-x-5">
              {menu.map(renderMenuItem)}
            </ul>
          )}

          {/* Search, user, and cart icons */}
          <div className="flex max-w-[370px] shrink-[10] flex-grow items-center justify-end gap-4 lg:justify-center lg:gap-3 xl:gap-5">
            <SearchBar className="hidden min-w-[140px] max-w-[284px] shrink md:flex" />
            <Link
              href="#"
              className="flex-shrink-0"
              onClick={() => {
                dispatch({
                  type: modalSagaActions.SET_PASSWORDLESS_MODAL,
                  payload: {
                    isPasswordlessOpen: true,
                  },
                });
              }}
            >
              <Img
                src="img_user.svg"
                width={24}
                height={24}
                alt="user icon"
                className="aspect-square w-[24px] object-contain"
              />
            </Link>
            <Link href="/my-cart" className="flex-shrink-0">
              <Img
                src="img_bag.svg"
                width={22}
                height={22}
                alt="bag icon"
                className="aspect-square w-[22px] object-contain"
              />
            </Link>
          </div>

          {/* Mobile search bar */}
          <SearchBar className="flex w-full md:hidden" />
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
        menu={menu}
        logo={mWebMenuLogo}
      />

      {/* Auth modal */}
      <Passwordless />
    </header>
  );
}
