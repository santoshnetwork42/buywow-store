import LinkClickTracker from "@/components/common/LinkClickTracker";
import { Text } from "@/components/elements";
import React from "react";

const MenuItem = ({ item, linkPrefix }) => (
  <LinkClickTracker
    href={`/${linkPrefix ? linkPrefix + "/" : ""}${item?.slug}`}
    className="self-center"
    trackingType="TOP_NAVBAR_CLICKED"
    trackingEventPayload={{
      slug: item?.slug,
      name: item?.title,
    }}
  >
    <Text size="sm" as="p" className="truncate capitalize" responsive>
      {item?.title}
    </Text>
  </LinkClickTracker>
);

MenuItem.displayName = "MenuItem";

function NavMenu({ menuItems, linkPrefix }) {
  return (
    <div className="invisible absolute left-1/2 z-[99] w-fit min-w-28 -translate-x-1/2 translate-y-3 pt-3 opacity-0 transition-[opacity,transform,visibility] duration-300 ease-in-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
      <div className="w-full rounded bg-white-a700_01 p-3 shadow">
        <div className="flex flex-col gap-3">
          {menuItems?.map((item, index) => (
            <MenuItem
              key={`menu-item-${index}`}
              item={item}
              linkPrefix={linkPrefix}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default NavMenu;
