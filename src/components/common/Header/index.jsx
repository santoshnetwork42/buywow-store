"use client";

import React, { useState, useMemo, useCallback } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { MenuSVG } from "@/assets/images";
import { Button, Img, Text } from "@/components/common";
import { DownArrowIconSVG } from "@/assets/images/downArrow";
import { modalSagaActions } from "@/store/sagas/sagaActions/modal.actions";
import { extractAttributes } from "@/utils/helpers";
import NavMenu from "@/components/common/partials/NavMenu";
import SearchBar from "@/components/common/partials/SearchBar";
import MobileMenu from "@/components/common/partials/MobileMenu";
import PasswordLess from "../PasswordLess";

const MenuItem = React.memo(({ item, index, linkPrefix }) => {
  const key = item?.id || index;
  const title = (
    <Text size="base" as="p" className="capitalize" responsive>
      {item?.title}
    </Text>
  );

  if (item?.subMenu?.length > 0) {
    return (
      <li key={key} className="group relative">
        <div className="flex cursor-pointer items-center gap-1">
          {title}
          <DownArrowIconSVG />
        </div>
        <NavMenu menuItems={item.subMenu} linkPrefix={linkPrefix} />
      </li>
    );
  }

  return (
    <li key={key}>
      <Link
        href={
          item?.slug
            ? `/${linkPrefix ? linkPrefix + "/" : ""}${item?.slug}`
            : item?.link || ""
        }
      >
        {title}
      </Link>
    </li>
  );
});

MenuItem.displayName = "MenuItem";

const Logo = React.memo(({ logoUrl, logoAlt, vipUrl, vipAlt }) => (
  <Link href="/">
    <div className="flex items-center gap-1">
      <Img
        src={logoUrl}
        width={86}
        height={48}
        alt={logoAlt}
        isStatic
        className="aspect-[86/48] w-[86px] object-contain"
      />
      <div className="h-[35px] w-[0.5px] bg-gray-300_01" />
      <Img
        src={vipUrl}
        width={70}
        height={28}
        alt={vipAlt}
        isStatic
        className="aspect-[70/28] w-[70px] object-contain"
      />
    </div>
  </Link>
));

Logo.displayName = "Logo";

const Header = React.memo(({ data, ...props }) => {
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const {
    logo,
    VIPMembershipLogo,
    mWebMenuLogo,
    menus: collectionMenus,
    otherLinks,
  } = useMemo(() => extractAttributes(data), [data]);

  const { url: logoUrl, alternativeText: logoAlternativeText = "logo" } =
    useMemo(() => extractAttributes(logo), [logo]);
  const { url: vipUrl, alternativeText: vipAlternativeText = "logo" } = useMemo(
    () => extractAttributes(VIPMembershipLogo),
    [VIPMembershipLogo],
  );

  const openMobileMenu = useCallback(() => setIsMobileMenuOpen(true), []);
  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  const handlePasswordLessOpen = useCallback(() => {
    dispatch({
      type: modalSagaActions.SET_PASSWORDLESS_MODAL,
      payload: {
        isPasswordLessOpen: true,
      },
    });
  }, [dispatch]);

  const menuItems = useMemo(
    () => (
      <>
        {collectionMenus.map((item, index) => (
          <MenuItem
            key={item.id || index}
            item={item}
            index={index}
            linkPrefix="collections"
          />
        ))}
        {otherLinks.map((item, index) => (
          <MenuItem
            key={item.id || index}
            item={item}
            index={index}
            linkPrefix=""
          />
        ))}
      </>
    ),
    [collectionMenus, otherLinks],
  );

  return (
    <header className={`${props.className} relative`}>
      <div className="container-main flex border-b-[0.5px] border-solid border-gray-300_01 bg-white-a700_01 py-2.5 md:py-3 lg:py-4">
        <div className="flex flex-1 flex-wrap items-center justify-between gap-x-5 gap-y-2.5 md:flex-nowrap">
          <div className="flex flex-shrink-0 items-stretch gap-5">
            <Button
              size="none"
              variant="none"
              className="mt-2 flex-1 lg:hidden"
              onClick={openMobileMenu}
            >
              <MenuSVG height={24} width={24} fillColor="#000000ff" />
            </Button>
            <Logo
              logoUrl={logoUrl}
              logoAlt={logoAlternativeText}
              vipUrl={vipUrl}
              vipAlt={vipAlternativeText}
            />
          </div>

          {(!!collectionMenus?.length || !!otherLinks?.length) && (
            <ul className="hidden flex-wrap gap-y-2 lg:flex lg:gap-x-3 xl:gap-x-4 xxl:gap-x-5">
              {menuItems}
            </ul>
          )}

          <div className="flex max-w-[370px] flex-grow items-center justify-end gap-4 lg:justify-center lg:gap-3 xl:gap-5">
            <SearchBar className="hidden min-w-[140px] max-w-[284px] shrink md:flex" />
            <Link
              href="#"
              className="flex-shrink-0"
              onClick={() => {
                dispatch({
                  type: modalSagaActions.SET_PASSWORDLESS_MODAL,
                  payload: {
                    isPasswordLessOpen: true,
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

          <SearchBar className="flex w-full md:hidden" />
        </div>
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
        collectionMenus={collectionMenus}
        otherLinks={otherLinks}
        logo={mWebMenuLogo}
      />

      <PasswordLess />
    </header>
  );
});

Header.displayName = "Header";

export default Header;
