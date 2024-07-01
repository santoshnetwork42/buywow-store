// components/MobileMenu.js
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Text, Img, Heading, Button } from "@/components/common";
import { CloseSVG, UserSVG } from "@/assets/images";
import { DownArrowIconSVG } from "@/assets/images/downArrow";

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
          className="flex cursor-pointer items-center justify-between pb-3 pr-3 pt-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Heading size="base" as="h4" className="font-semibold">
            {item.text}
          </Heading>
          <DownArrowIconSVG
            className={`mt-0.5 h-3 w-3 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
            strokeWidth={1.4}
          />
        </div>
        <div
          style={{ height: `${height}px` }}
          className="overflow-hidden transition-all duration-300 ease-in-out"
        >
          <ul ref={contentRef}>
            {item.submenu.map((subItem, index) => (
              <li
                key={index}
                className={
                  index !== item.submenu.length - 1
                    ? "border-b-[0.5px] border-b-gray-300"
                    : ""
                }
              >
                <Link
                  className={index === 0 ? "pb-2.5 pt-1.5" : "py-2.5"}
                  href={subItem.link}
                  onClick={closeMenu}
                >
                  <Text size="sm" as="p" className="capitalize">
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
    <Link href={item.link} onClick={closeMenu} className="pb-3 pt-2">
      <Heading size="base" as="h4" className="font-semibold">
        {item.text}
      </Heading>
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
      className={`fixed inset-0 z-50 bg-black-900 transition-opacity duration-300 ease-in-out lg:hidden ${
        isOpen ? "bg-opacity-20" : "pointer-events-none bg-opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        style={{
          transform: `translateX(${menuPosition})`,
        }}
        className={`fixed left-0 top-0 flex h-screen w-full max-w-[326px] flex-col overflow-y-auto bg-gray-50 shadow-lg transition-transform duration-300 ease-in-out`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-yellow-900 p-4">
          <Link href="/" className="" onClick={onClose}>
            <Img
              src="img_header_logo_white.svg"
              width={100}
              height={48}
              alt="logo"
              className="aspect-[100/48] w-[100px] object-contain"
            />
          </Link>
          <div className="ml-2.5 flex flex-1 flex-col gap-0.5">
            <Heading as="h4" size="lg" className="text-white-a700_01">
              Hi Guest
            </Heading>
            <Link
              href="/login"
              className="relative flex w-fit items-center gap-1"
              onClick={onClose}
            >
              <Text size="sm" as="p" className="text-white-a700_01">
                Login
              </Text>
              <Img
                src="img_arrow_right_white.svg"
                width={18}
                height={18}
                alt={`Login arrow`}
                className="aspect-square w-[18px] object-contain"
              />
              <div className="absolute -bottom-[3px] left-0 h-[0.5px] w-[55px] bg-white-a700_01"></div>
            </Link>
          </div>
          <Button onClick={onClose}>
            <CloseSVG height={24} width={24} fillColor="#ffffff" />
          </Button>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-4">
            {menuItems.map((item, index) => (
              <li key={index}>
                <MobileMenuItem item={item} closeMenu={onClose} />
                <div className="h-[0.5px] w-full bg-gray-300" />
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="fixed bottom-0 left-0 w-full bg-gray-50 p-4">
          <Link href="/login" className="flex items-center gap-3">
            <UserSVG />
            <Text size="sm" as="p" className="capitalize">
              Login / Register
            </Text>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
