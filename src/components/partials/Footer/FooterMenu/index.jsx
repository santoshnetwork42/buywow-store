import { DownArrowIconSVG } from "@/assets/svg/icons";
import { Heading, Text } from "@/components/elements";
import Link from "next/link";
import React, { useMemo } from "react";

const SubMenuItem = React.memo(({ item }) => {
  if (!item?.title) return null;
  return (
    <li className="">
      <Link href={item?.slug || item?.link}>
        <Text as="p" size="sm" className="capitalize text-white-a700_01">
          {item.title}
        </Text>
      </Link>
    </li>
  );
});

SubMenuItem.displayName = "SubMenuItem";

const FooterMenu = ({ item, isOpen, onToggle }) => {
  const subMenuItems = useMemo(() => {
    if (!item.subMenu || !Array.isArray(item.subMenu)) return [];
    return item.subMenu.filter((subItem) => subItem?.title);
  }, [item.subMenu]);

  if (!item) return null;

  const hasSubMenu = subMenuItems.length > 0;

  return (
    <div
      className={`flex flex-col ${
        isOpen ? "gap-2 sm:gap-3 md:gap-3 lg:gap-5" : "gap-0 lg:gap-5"
      } transition-all duration-300`}
    >
      <div
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between lg:hidden"
      >
        <Heading
          as="h6"
          size="base"
          className="font-semibold capitalize text-white-a700_01"
        >
          {item.title}
        </Heading>
        <DownArrowIconSVG
          className={`h-[14px] w-[14px] transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fillColor="#ffffff"
        />
      </div>
      <Heading
        as="h6"
        size="base"
        className="hidden capitalize text-white-a700_01 lg:block"
      >
        {item.title}
      </Heading>
      {hasSubMenu && (
        <ul
          className={`flex flex-col gap-1.5 overflow-hidden transition-all duration-300 ease-in-out sm:gap-2 lg:gap-2.5 ${
            isOpen
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-50 lg:max-h-96 lg:opacity-100"
          }`}
        >
          {subMenuItems.map((subItem, index) => (
            <SubMenuItem key={`${subItem.slug}-${index}`} item={subItem} />
          ))}
        </ul>
      )}
    </div>
  );
};

FooterMenu.displayName = "FooterMenu";

export default FooterMenu;
