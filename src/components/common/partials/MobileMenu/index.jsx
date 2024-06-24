// components/MobileMenu.js
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Text, Img, Heading } from "@/components/common";
import { CloseSVG, UserSVG } from "@/assets/images";

const MobileMenuItem = ({ item, closeMenu }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  if (item.submenu) {
    return (
      <div className="">
        <div
          className="flex justify-between items-center cursor-pointer pb-3 pt-2 pr-3"
          onClick={() => setIsOpen(!isOpen)}>
          <Text
            size="text3xl"
            as="p"
            className={`capitalize !font-semibold`}>
            {item.text}
          </Text>
          <Img
            src="img_arrow_down_black_900.svg"
            width={12}
            height={6}
            alt={`${item.text} arrow`}
            className={`h-[6px] w-[12px] transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
        <div
          style={{ height: `${height}px` }}
          className="overflow-hidden transition-all duration-300 ease-in-out">
          <ul ref={contentRef}>
            {item.submenu.map((subItem, index) => (
              <li
                key={index}
                className={
                  index !== item.submenu.length - 1 ? "border-b-[0.5px] border-b-gray-300" : ""
                }>
                <Link
                  className={index === 0 ? "pt-1.5 pb-2.5" : "py-2.5"}
                  href={subItem.link}
                  onClick={closeMenu}>
                  <Text
                    size="textxl"
                    as="p"
                    className="capitalize !font-light">
                    {subItem.text}
                  </Text>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <Link
      href={item.link}
      onClick={closeMenu}
      className="pb-3 pt-2">
      <Text
        size="text3xl"
        as="p"
        className="capitalize !font-semibold">
        {item.text}
      </Text>
    </Link>
  );
};

const MobileMenu = ({ isOpen, onClose, menuItems }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [menuPosition, setMenuPosition] = useState("-325px");

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      // Small delay to ensure the initial position is set before animating
      setTimeout(() => setMenuPosition("0px"), 10);
    } else {
      setMenuPosition("-325px");
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 300); // Match this with the animation duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && !isAnimating) return null;

  return (
    <div
      className={`fixed lg:hidden inset-0 bg-black-900 transition-opacity duration-300 ease-in-out z-50 ${
        isOpen ? "bg-opacity-20" : "bg-opacity-0 pointer-events-none"
      }`}
      onClick={onClose}>
      <div
        style={{
          transform: `translateX(${menuPosition})`,
        }}
        className={`fixed top-0 left-0 h-screen flex flex-col bg-gray-50 transition-transform duration-300 ease-in-out max-w-[325px] w-full shadow-lg overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="bg-yellow-900 p-4 flex justify-between items-center">
          <Link
            href="/"
            className=""
            onClick={onClose}>
            <Img
              src="img_header_logo_white.svg"
              width={100}
              height={48}
              alt="logo"
              className="object-contain"
            />
          </Link>
          <div className="flex-1 ml-2.5">
            <Heading
              as="h4"
              size="text4xl"
              className="text-white-a700_01 mb-px !font-normal">
              Hi Guest
            </Heading>
            <Link
              href="/login"
              className="flex gap-1 items-center relative"
              onClick={onClose}>
              <Text
                size="text2xl"
                as="p"
                className="capitalize text-white-a700_01 !font-light">
                Login
              </Text>
              <Img
                src="img_arrow_right_white.svg"
                width={18}
                height={18}
                alt={`Login arrow`}
                className="h-[18px] w-[18px] mt-px"
              />
              <div className="absolute -bottom-[3px] left-0 w-[55px] h-[0.5px] bg-white-a700_01"></div>
            </Link>
          </div>
          <button
            onClick={onClose}
            className="text-white">
            <CloseSVG
              height={24}
              width={24}
              fillColor="#ffffff"
            />
          </button>
        </div>

        {/* Menu Items */}
        <div className="p-4 flex-1 overflow-y-auto">
          <ul className="space-y-4">
            {menuItems.map((item, index) => (
              <>
                <li key={index}>
                  <MobileMenuItem
                    item={item}
                    closeMenu={onClose}
                  />
                  <div className="h-[0.5px] w-full bg-gray-300" />
                </li>
              </>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="fixed bottom-0 bg-gray-50 left-0 w-full p-4">
          <Link
            href="/login"
            className="flex items-center">
            <UserSVG className="mr-3" />
            <Text
              size="textxl"
              as="p"
              className="capitalize !font-light">
              Login / Register
            </Text>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
