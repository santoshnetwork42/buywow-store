"use client";

import {
  BagIcon,
  DownArrowIconSVG,
  MenuSVG,
  UserIcon,
} from "@/assets/svg/icons";
import { WOWLogo } from "@/assets/svg/logo";
import { Button, Img, Text } from "@/components/elements";
import NavMenu from "@/components/partials/Header/NavMenu";
import SearchBar from "@/components/partials/Header/SearchBar";
import { useEventsDispatch } from "@/store/sagas/dispatch/events.dispatch";
import { useModalDispatch } from "@/store/sagas/dispatch/modal.dispatch";
import { useIsInteractive } from "@/utils/context/navbar";
import {
  PAGETYPE,
  RESTRICT_SEARCH_AND_CART_TO_SHOW,
} from "@/utils/data/constants";
import { extractAttributes } from "@/utils/helpers";
import { useCartTotal } from "@wow-star/utils-cms";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const MobileMenu = dynamic(
  () => import("@/components/partials/Header/MobileMenu"),
  { ssr: false },
);

const StickyViewCart = dynamic(
  () => import("@/components/partials/StickyViewCart"),
  { ssr: false },
);

const PasswordLess = dynamic(() => import("@/components/common/Passwordless"), {
  ssr: false,
});

const MenuItem = React.memo(({ item, index, showInWeb }) => {
  const { topNavbarClickedEvent } = useEventsDispatch();

  const linkPrefix = PAGETYPE[item?.slugType] || "";

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
          onClick={() => {
            topNavbarClickedEvent({
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
        <NavMenu menuItems={item.subMenu} />
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
          topNavbarClickedEvent({
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

const Header = ({ data }) => {
  const router = useRouter();
  const pathname = usePathname();
  const showHeader = !pathname?.includes("blog");
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
    mWebMenuLogo,
    menus: collectionMenus,
    otherLinks,
  } = extractAttributes(data) || {};

  const { url: logoUrl, alternativeText: logoAlternativeText = "logo" } =
    extractAttributes(logo) || {};

  const openMobileMenu = () => setIsMobileMenuOpen(true);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleUserClick = async () => {
    try {
      if (user?.id) {
        router.push("/pages/account");
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
          showInWeb={item?.showInWeb}
        />
      ))}
      {otherLinks?.map((item, index) => (
        <MenuItem
          key={`other-menu-${index}`}
          item={item}
          index={index}
          showInWeb={item?.showInWeb}
        />
      ))}
    </>
  );

  if (!data) return null;
  if (!showHeader) return null;

  return (
    <header className="relative">
      <div className="container-main flex border-b-[0.5px] border-solid border-gray-300_01 bg-white-a700_01 py-2.5 md:py-3 lg:py-4">
        <div className="flex flex-1 flex-wrap items-center justify-between gap-x-5 gap-y-2.5 md:flex-nowrap">
          <div className="flex flex-shrink-0 gap-5 max-md:w-[25%]">
            <Button
              size="none"
              variant="none"
              className="ml-0.5 mt-2 md:flex-1 lg:hidden"
              onClick={openMobileMenu}
            >
              <MenuSVG height={24} width={24} fillColor="#000000ff" />
            </Button>

            <div className="flex hidden items-center gap-1 md:block">
              <Link href="/" aria-label="Go to WOW Home Page">
                <WOWLogo size={86} keyName="web" />
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <Link href="/" aria-label="Go to WOW Home Page">
              <WOWLogo size={86} keyName="mobile" />
            </Link>
          </div>

          {(!!collectionMenus?.length || !!otherLinks?.length) && (
            <ul className="hidden flex-wrap gap-y-2 lg:flex lg:gap-x-3 xl:gap-x-4 xxl:gap-x-5">
              {renderMenuItems()}
            </ul>
          )}

          <div className="flex items-center justify-end gap-4 max-md:w-[25%] md:max-w-[370px] md:flex-grow lg:justify-center lg:gap-3 xl:gap-5">
            {!isRestricted && (
              <SearchBar className="hidden min-w-[200px] max-w-[284px] shrink md:flex" />
            )}
            <Button className="ml-auto flex-shrink-0" onClick={handleUserClick}>
              <UserIcon size={22} />
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
Header.displayName = "Header";

export default Header;
