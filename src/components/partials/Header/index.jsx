"use client";

import { MenuSVG } from "@/assets/images";
import { DownArrowIconSVG } from "@/assets/images/downArrow";
import PasswordLess from "@/components/common/Passwordless";
import { Button, Img, Text } from "@/components/elements";
import MobileMenu from "@/components/partials/Header/MobileMenu";
import NavMenu from "@/components/partials/Header/NavMenu";
import SearchBar from "@/components/partials/Header/SearchBar";
import { modalSagaActions } from "@/store/sagas/sagaActions/modal.actions";
import { extractAttributes } from "@/utils/helpers";
import { getCurrentUser } from "aws-amplify/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const MenuItem = React.memo(({ item, index, linkPrefix }) => {
  if (!item) return null;

  const key = item.id || index;
  const title = (
    <Text size="base" as="p" className="capitalize" responsive>
      {item.title}
    </Text>
  );

  if (item.subMenu && item.subMenu.length > 0) {
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
          item.slug
            ? `/${linkPrefix ? linkPrefix + "/" : ""}${item.slug}`
            : item.link || "#"
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
  const router = useRouter();

  const { data: cartData = [] } = useSelector((state) => state.cart);
  const totalCartItems = cartData.length;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const {
    logo,
    VIPMembershipLogo,
    mWebMenuLogo,
    menus: collectionMenus,
    otherLinks,
  } = extractAttributes(data) || {};

  const { url: logoUrl, alternativeText: logoAlternativeText = "logo" } =
    extractAttributes(logo) || {};
  const { url: vipUrl, alternativeText: vipAlternativeText = "logo" } =
    extractAttributes(VIPMembershipLogo) || {};

  const openMobileMenu = useCallback(() => setIsMobileMenuOpen(true), []);
  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  const handlePasswordLessOpen = useCallback(() => {
    dispatch({
      type: modalSagaActions.SET_PASSWORDLESS_MODAL,
      payload: {
        isPasswordLessOpen: true,
        customLogin: false,
        redirectTo: null,
      },
    });
  }, [dispatch]);

  const handleUserClisk = useCallback(async () => {
    try {
      //check if user is logged in
      const currentUser = await getCurrentUser();
      if (!!currentUser) {
        router.push("/account");
      } else {
        //open passwordless if user is not logged in
        handlePasswordLessOpen();
      }
    } catch (error) {
      handlePasswordLessOpen();
      console.log("Something went wrong", error);
    }
  }, [handlePasswordLessOpen, router]);

  const renderMenuItems = () => (
    <>
      {collectionMenus?.map((item, index) => (
        <MenuItem
          key={`menu-${index}`}
          item={item}
          index={index}
          linkPrefix="collections"
        />
      ))}
      {otherLinks?.map((item, index) => (
        <MenuItem
          key={`other-menu-${index}`}
          item={item}
          index={index}
          linkPrefix=""
        />
      ))}
    </>
  );

  if (!data) return null;

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
              {renderMenuItems()}
            </ul>
          )}

          <div className="flex max-w-[370px] flex-grow items-center justify-end gap-4 lg:justify-center lg:gap-3 xl:gap-5">
            <SearchBar className="hidden min-w-[140px] max-w-[284px] shrink md:flex" />
            <Link href="#" className="flex-shrink-0" onClick={handleUserClisk}>
              <Img
                src="img_user.svg"
                width={24}
                height={24}
                alt="user icon"
                className="aspect-square w-[24px] object-contain"
              />
            </Link>
            <Link href="/my-cart" className="flex-shrink-0">
              <div className="relative">
                <Img
                  src="img_bag.svg"
                  width={22}
                  height={22}
                  alt="bag icon"
                  className="aspect-square w-[22px] object-contain"
                />
                {!!totalCartItems && (
                  <div className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center overflow-hidden rounded-full bg-red-400">
                    <Text size="xxs" className="mx-1 text-white-a700_01">
                      {totalCartItems}
                    </Text>
                  </div>
                )}
              </div>
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
