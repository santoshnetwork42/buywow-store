"use client";

import { MenuSVG } from "@/assets/images";
import { DownArrowIconSVG } from "@/assets/images/downArrow";
import { BagIcon } from "@/assets/svg/icons";
import PasswordLess from "@/components/common/Passwordless";
import { Button, Img, Text } from "@/components/elements";
import MobileMenu from "@/components/partials/Header/MobileMenu";
import NavMenu from "@/components/partials/Header/NavMenu";
import SearchBar from "@/components/partials/Header/SearchBar";
import { useModalDispatch } from "@/store/sagas/dispatch/modal.dispatch";
import { useNavBarState } from "@/utils/context/navbar";
import { extractAttributes } from "@/utils/helpers";
import { useCartTotal } from "@wow-star/utils";
import { getCurrentUser } from "aws-amplify/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";

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

const Header = ({ data, ...props }) => {
  const router = useRouter();
  const user = useSelector((state) => state.user.user);
  const { handlePasswordLessModal, handleCartVisibility } = useModalDispatch();
  const { isRewardApplied } = useNavBarState();
  const { totalItems: totalCartItems } = useCartTotal({
    paymentType: "PREPAID",
    isRewardApplied: isRewardApplied,
  });

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

  const openMobileMenu = () => setIsMobileMenuOpen(true);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleUserClisk = async () => {
    try {
      //check if user is logged in
      const currentUser = await getCurrentUser();
      if (!!currentUser) {
        router.push("/account");
      } else {
        //open passwordless if user is not logged in
        handlePasswordLessModal(true, false, null);
      }
    } catch (error) {
      handlePasswordLessModal(true, false, null);
      console.log("Something went wrong", error);
    }
  };

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
            <Link
              href="#"
              onClick={() => handleCartVisibility(true)}
              className="flex-shrink-0"
            >
              <div className="relative">
                <BagIcon size={20} />
                {!!totalCartItems && (
                  <div className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center overflow-hidden rounded-full bg-red-400">
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
        isLoggedin={!!user?.id}
      />

      <PasswordLess />
    </header>
  );
};

MenuItem.displayName = "MenuItem";
Logo.displayName = "Logo";
Header.displayName = "Header";

export default Header;
