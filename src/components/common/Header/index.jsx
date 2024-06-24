"use client";

import { MenuSVG } from "@/assets/images";
import { Img, Text } from "@/components/common";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import NavMenu from "@/components/common/partials/NavMenu";
import { mainMenuItems } from "@/data/headerData";
import SearchBar from "@/components/common/partials/SearchBar";
import MobileMenu from "@/components/common/partials/MobileMenu";

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
          onMouseEnter={() => toggleMenu(index)}>
          <div className="flex cursor-pointer items-center gap-1 pt-px">
            <Text
              size="text2xl"
              as="p"
              className="capitalize">
              {item.text}
            </Text>
            <Img
              src="img_arrow_down_black_900.svg"
              width={8}
              height={4}
              alt={`${item.text} arrow`}
              className="h-[4px] w-[8px]"
            />
          </div>
          {openMenus[index] && <NavMenu menuItems={item.submenu} />}
        </li>
      );
    } else {
      return (
        <li key={index}>
          <Link href={item.link}>
            <Text
              size="text2xl"
              as="p"
              className="capitalize">
              {item.text}
            </Text>
          </Link>
        </li>
      );
    }
  };

  return (
    <header className={`${props.className} relative`}>
      <div className="flex justify-center self-stretch border-b-[0.5px] border-solid border-gray-300_01 bg-white-a700_01 py-2.5 md:py-3 lg:py-4">
        <div className="container-xs flex justify-center">
          <div className="flex flex-wrap md:flex-nowrap w-full items-center justify-between gap-x-5 gap-y-2.5">
            {/* Logo and mobile menu button */}
            <div className="flex-shrink-0 flex items-center gap-5">
              <div className="mt-2 lg:hidden">
                <MenuSVG
                  onClick={openMobileMenu}
                  height={24}
                  width={24}
                  fillColor="#000000ff"
                />
              </div>
              <Link
                href="/"
                className="">
                <Img
                  src="img_header_logo.png"
                  width={163}
                  height={48}
                  alt="logo"
                  className="h-[48px] w-[163px] object-contain"
                />
              </Link>
            </div>

            {/* Desktop menu items */}
            <ul className="hidden lg:flex items-start lg:gap-3 xl:gap-5">
              {mainMenuItems.map(renderMenuItem)}
            </ul>

            {/* Search, user, and cart icons */}
            <div className="flex max-w-[370px] flex-grow items-center justify-end lg:justify-center gap-4 lg:gap-3 xl:gap-5">
              <SearchBar className="hidden md:flex max-w-[284px]" />
              <Link
                href="#"
                className="flex-shrink-0">
                <Img
                  src="img_user.svg"
                  width={24}
                  height={24}
                  alt="user icon"
                  className="h-[24px] w-[24px]"
                />
              </Link>
              <Link
                href="#"
                className="flex-shrink-0">
                <Img
                  src="img_bag.svg"
                  width={22}
                  height={22}
                  alt="bag icon"
                  className="h-[22px] w-[22px]"
                />
              </Link>
            </div>

            {/* Mobile search bar */}
            <SearchBar className="flex w-full md:hidden" />
          </div>
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
