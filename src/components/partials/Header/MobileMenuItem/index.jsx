import { DownArrowIconSVG } from "@/assets/svg/icons";
import { Heading, Text } from "@/components/elements";
import { useEventsDispatch } from "@/store/sagas/dispatch/events.dispatch";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const SubMenuItem = ({ subItem, linkPrefix, closeMenu, isLast }) => {
  const { topNavbarClicked } = useEventsDispatch();
  if (!subItem) return null;

  return (
    <li className={!isLast ? "border-b-[0.5px] border-b-gray-300" : ""}>
      <Link
        prefetch
        className={isLast ? "py-2.5" : "py-2.5"}
        href={`/${linkPrefix ? linkPrefix + "/" : ""}${subItem.slug || ""}`}
        onClick={() => {
          topNavbarClicked({
            banner_name: subItem.title || "",
            item_id: subItem.slug || "",
            Source: "Mobile",
            "Section Name": "Mobile Navbar",
          });
          closeMenu();
        }}
      >
        <Text size="sm" as="p" className="capitalize">
          {subItem.title}
        </Text>
      </Link>
    </li>
  );
};

SubMenuItem.displayName = "SubMenuItem";

const MobileMenuItem = ({ item, closeMenu, linkPrefix }) => {
  const { topNavbarClicked } = useEventsDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  if (!item || !item?.title) return null;

  if (item?.subMenu && item?.subMenu?.length > 0) {
    return (
      <div>
        <div
          className="flex cursor-pointer items-center justify-between pb-3 pr-3 pt-2"
          onClick={() => {
            topNavbarClicked({
              banner_name: item.title,
              item_id: item.slug,
              Source: "Mobile",
              "Section Name": "Mobile Navbar",
            });
            toggleOpen();
          }}
        >
          <Heading size="base" as="h4" className="font-semibold">
            {item.title}
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
            {item.subMenu.map((subItem, index) => (
              <SubMenuItem
                key={`sub-menu-item-${subItem.id || index}`}
                subItem={subItem}
                linkPrefix={linkPrefix}
                closeMenu={closeMenu}
                isLast={index === item.subMenu.length - 1}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <Link
      prefetch
      href={
        item?.slug
          ? `/${linkPrefix ? linkPrefix + "/" : ""}${item.slug}`
          : item?.link || "#"
      }
      onClick={() => {
        topNavbarClicked({
          banner_name: item.title,
          item_id: item.slug,
          Source: "Mobile",
          "Section Name": "Mobile Navbar",
        });
        closeMenu();
      }}
      className="pb-3 pt-2"
    >
      <Heading size="base" as="h4" className="font-semibold">
        {item.title}
      </Heading>
    </Link>
  );
};

MobileMenuItem.displayName = "MobileMenuItem";

export default MobileMenuItem;
