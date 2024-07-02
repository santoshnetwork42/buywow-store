// components/MobileMenu.js
import React from "react";
import Link from "next/link";
import { Text, Img, Heading, Button } from "@/components/common";
import { CloseSVG, UserSVG } from "@/assets/images";
import Sidebar from "@/components/common/Sidebar";
import MobileMenuItem from "@/components/common/partials/MobileMenuItem";

const MobileMenu = ({ isOpen, onClose, menuItems }) => {
  return (
    <Sidebar
      isOpen={isOpen}
      onClose={onClose}
      position="left"
      width="326px"
      className="lg:hidden"
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
    </Sidebar>
  );
};

export default MobileMenu;
