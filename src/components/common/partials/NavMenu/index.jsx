import { Text } from "@/components/common";
import Link from "next/link";
import React from "react";

export default function NavMenu({ menuItems, isOpen }) {
  return (
    <div
      className={`absolute left-1/2 z-[99] min-w-28 -translate-x-1/2 pt-3 transition-[opacity,transform] duration-300 ease-in-out ${
        isOpen
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-4 opacity-0"
      }`}
    >
      <div className="w-full rounded bg-white-a700_01 p-3 shadow">
        <div className="flex flex-col gap-3">
          {menuItems.map((item, itemIndex) =>
            item.link ? (
              <Link key={itemIndex} href={item.link} className="self-center">
                <Text size="sm" as="p" className="max-w-28 truncate" responsive>
                  {item.text}
                </Text>
              </Link>
            ) : (
              <Text
                key={itemIndex}
                size="sm"
                responsive
                as="p"
                className="self-center"
              >
                {item.text}
              </Text>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
