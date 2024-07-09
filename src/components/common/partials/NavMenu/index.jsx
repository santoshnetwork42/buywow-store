import { Text } from "@/components/common";
import Link from "next/link";
import React from "react";

export default function NavMenu({ menuItems }) {
  return (
    <div className="pointer-events-none absolute left-1/2 z-[99] w-fit min-w-28 -translate-x-1/2 -translate-y-4 pt-3 opacity-0 transition-[opacity,transform] duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
      <div className="w-full rounded bg-white-a700_01 p-3 shadow">
        <div className="flex flex-col gap-3">
          {menuItems.map((item, index) => (
            <Link
              key={item.id || index}
              href={item.slug}
              className="self-center"
            >
              <Text size="sm" as="p" className="truncate capitalize" responsive>
                {item.title}
              </Text>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
