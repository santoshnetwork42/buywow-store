"use client";

import { BagIcon, DownArrowIconSVG, MenuSVG } from "@/assets/svg/icons";
import PasswordLess from "@/components/common/Passwordless";
import { Button, Img, Text } from "@/components/elements";
import MobileMenu from "@/components/partials/Header/MobileMenu";
import NavMenu from "@/components/partials/Header/NavMenu";
import SearchBar from "@/components/partials/Header/SearchBar";
import StickyViewCart from "@/components/partials/StickyViewCart";
import { useEventsDispatch } from "@/store/sagas/dispatch/events.dispatch";
import { useModalDispatch } from "@/store/sagas/dispatch/modal.dispatch";
import { useIsInteractive } from "@/utils/context/navbar";
import { RESTRICT_SEARCH_AND_CART_TO_SHOW } from "@/utils/data/constants";
import { extractAttributes } from "@/utils/helpers";
import { useCartTotal } from "@wow-star/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const MenuItem = React.memo(({ item, index, linkPrefix, showInWeb }) => {
  const { topNavbarClicked } = useEventsDispatch();

  if (!item || !item.title || !showInWeb) return null;

  const key = item.id || index;
  const title = (
    <Text size="base" as="p" className="capitalize" responsive>
      {item.title}
    </Text>
  );

  if (item?.subMenu && item?.subMenu?.length > 0) {
    return (
      <li key={key} className="group relative">
        <Link
          prefetch={false}
          href={
            item.slug
              ? `/${linkPrefix ? linkPrefix + "/" : ""}${item.slug}`
              : item.link || "#"
          }
          shallow
          onClick={() => {
            topNavbarClicked({
              banner_name: item.title,
              item_id: item.slug,
              Source: "Web",
              "Section Name": "Top Navbar",
            });
          }}
          className="flex cursor-pointer items-center gap-1"
        >
          {title}
          <DownArrowIconSVG />
        </Link>
        <NavMenu menuItems={item.subMenu} linkPrefix={linkPrefix} />
      </li>
    );
  }

  return (
    <li key={key}>
      <Link
        prefetch={false}
        href={
          item?.slug
            ? `/${linkPrefix ? linkPrefix + "/" : ""}${item.slug}`
            : item?.link || "#"
        }
        onClick={() => {
          topNavbarClicked({
            banner_name: item.title,
            item_id: item.slug,
            Source: "Web",
            "Section Name": "Top Navbar",
          });
        }}
      >
        {title}
      </Link>
    </li>
  );
});

const Logo = React.memo(({ logoUrl, logoAlt, vipUrl, vipAlt }) => (
  <Link prefetch={false} href="/">
    <div className="flex items-center gap-1">
      <Img
        src={logoUrl}
        width={86}
        height={48}
        alt={logoAlt}
        priority
        className="aspect-[86/48] w-[86px] object-contain"
      />
      {/* {vipUrl && (
        <>
          <div className="h-[35px] w-[0.5px] bg-gray-300_01" />
          <Img
            src={vipUrl}
            width={70}
            height={28}
            alt={vipAlt}
            className="aspect-[70/28] w-[70px] object-contain"
          />
        </>
      )} */}
    </div>
  </Link>
));

const Header = ({ data }) => {
  const router = useRouter();
  const pathname = usePathname();
  const showHeader = pathname?.includes("blog");
  const isInteractive = useIsInteractive();

  const user = useSelector((state) => state.user?.user);
  const isRewardApplied = useSelector((state) => state.cart?.isRewardApplied);

  const isRestricted = RESTRICT_SEARCH_AND_CART_TO_SHOW.some(
    (allowedPath) =>
      allowedPath === pathname ||
      (allowedPath !== "/" && pathname.startsWith(`${allowedPath}/`)),
  );
  const { handlePasswordLessModal, handleCartVisibility } = useModalDispatch();
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

  const handleUserClick = async () => {
    try {
      if (user?.id) {
        router.push("/account");
      } else {
        handlePasswordLessModal(true, false, null);
      }
    } catch (error) {
      handlePasswordLessModal(true, false, null);
      console.error("Something went wrong", error);
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
          showInWeb
        />
      ))}
      {otherLinks?.map((item, index) => (
        <MenuItem
          key={`other-menu-${index}`}
          item={item}
          index={index}
          linkPrefix=""
          showInWeb={item?.showInWeb}
        />
      ))}
    </>
  );

  if (!data) return null;

  return showHeader ? (
    <></>
  ) : (
    <header className="relative">
      <div className="container-secondary flex border-b-[0.5px] border-solid border-gray-300_01 bg-white-a700_01 py-2.5 md:py-3 lg:py-4">
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
            {!isRestricted && (
              <SearchBar className="hidden min-w-[200px] max-w-[284px] shrink md:flex" />
            )}
            <Button className="ml-auto flex-shrink-0" onClick={handleUserClick}>
              <Img
                src="img_user.svg"
                width={24}
                height={24}
                alt="user icon"
                className="aspect-square w-[24px] object-contain"
                isStatic
              />
            </Button>
            {!isRestricted && (
              <div
                className="relative cursor-pointer"
                onClick={() => handleCartVisibility(true)}
              >
                <BagIcon size={20} />
                {!!totalCartItems && (
                  <div className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center overflow-hidden rounded-full bg-red-400">
                    <Text size="xxs" className="mx-1 text-white-a700_01">
                      {totalCartItems}
                    </Text>
                  </div>
                )}
              </div>
            )}
          </div>

          {!isRestricted && <SearchBar className="flex w-full md:hidden" />}
        </div>
      </div>

      {isInteractive && (
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={closeMobileMenu}
          collectionMenus={collectionMenus}
          otherLinks={otherLinks}
          logo={mWebMenuLogo}
          isLoggedIn={!!user?.id}
        />
      )}

      {isInteractive && <StickyViewCart />}
      {isInteractive && <PasswordLess />}
    </header>
  );
};

MenuItem.displayName = "MenuItem";
Logo.displayName = "Logo";
Header.displayName = "Header";

export default Header;
