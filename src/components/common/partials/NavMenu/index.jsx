import { Text } from "@/components/common";
import Link from "next/link";
import React from "react";

export default function NavMenu({ menuItems }) {
  return (
    <div className="absolute top-auto z-[99] min-w-28 pt-3">
      <div className="w-full rounded-sm bg-white-a700_01 p-3 shadow-md">
        <div className="flex flex-col gap-3">
          {menuItems.map((item, itemIndex) =>
            item.link ? (
              <Link
                key={itemIndex}
                href={item.link}
                className="self-center">
                <Text className="!text-black-600 !font-opensans text-base font-normal max-w-28 truncate">
                  {item.text}
                </Text>
              </Link>
            ) : (
              <Text
                key={itemIndex}
                className="!text-black-600 self-center !font-opensans text-base font-normal">
                {item.text}
              </Text>
            )
          )}
        </div>
      </div>
    </div>
  );
}
