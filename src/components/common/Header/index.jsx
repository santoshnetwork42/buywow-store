"use client";

import { MenuSVG } from "@/assets/images";
import { Img, Text } from "@/components/common";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import NavMenu from "@/components/common/partials/NavMenu";
import { mainMenuItems } from "@/data/headerData";
import SearchBar from "@/components/common/partials/SearchBar";
import MobileMenu from "@/components/common/partials/MobileMenu";
import { DownArrowIconSVG } from "@/assets/images/downArrow";

export default function Header({ ...props }) {
  const [openMenus, setOpenMenus] = useState({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = (index) => {
    setOpenMenus((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const openMobileMenu = () => {
    setMobileMenuOpen(true);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const renderMenuItem = (item, index) => {
    if (item.submenu) {
      return (
        <li
          key={index}
          onMouseLeave={() => toggleMenu(index)}
          onMouseEnter={() => toggleMenu(index)}
          className="relative"
        >
          <div className="flex cursor-pointer items-center gap-1">
            <Text size="base" as="p" className="capitalize" responsive>
              {item.text}
            </Text>
            <DownArrowIconSVG />
          </div>
          <NavMenu menuItems={item.submenu} isOpen={openMenus[index]} />
        </li>
      );
    } else {
      return (
        <li key={index}>
          <Link href={item.link}>
            <Text size="base" as="p" className="capitalize" responsive>
              {item.text}
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
                  src="img_wow_logo.png"
                  width={86}
                  height={48}
                  alt="logo"
                  className="aspect-[86/48] w-[86px] object-contain"
                />
                <div className="h-[35px] w-[0.5px] bg-gray-300_01" />
                <Img
                  src="img_vip_member_logo.svg"
                  width={70}
                  height={28}
                  alt="logo"
                  className="aspect-[70/28] w-[70px] object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Desktop menu items */}
          <ul className="hidden lg:flex lg:gap-3 xl:gap-5">
            {mainMenuItems.map(renderMenuItem)}
          </ul>

          {/* Search, user, and cart icons */}
          <div className="flex max-w-[370px] shrink-[10] flex-grow items-center justify-end gap-4 lg:justify-center lg:gap-3 xl:gap-5">
            <SearchBar className="hidden min-w-[140px] max-w-[284px] shrink md:flex" />
            <Link href="#" className="flex-shrink-0">
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
        isOpen={mobileMenuOpen}
        onClose={closeMobileMenu}
        menuItems={mainMenuItems}
      />
    </header>
  );
}
