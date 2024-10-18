"use client";

import { useEventsDispatch } from "@/store/sagas/dispatch/events.dispatch";
import { getSource } from "@/utils/helpers";
import Link from "next/link";
import { useCallback } from "react";

const LinkClickTracker = ({
  href,
  className,
  children,
  trackingId,
  trackingType = "link",
  trackingEventPayload = "",
}) => {
  const source = getSource();
  const {
    bannerClicked,
    shopByClicked,
    blogClicked,
    topNavbarClicked,
    footerClicked,
  } = useEventsDispatch();

  const handleClick = useCallback(
    (e) => {
      switch (trackingType) {
        case "BANNER_CLICKED": {
          bannerClicked({
            Source: source,
            item_id: trackingEventPayload?.id,
            banner_name: trackingEventPayload?.moeText,
            banner_link: trackingEventPayload?.url,
          });
          break;
        }
        case "FOOTER_CLICK": {
          footerClicked({
            section: "footer",
            menu: trackingEventPayload?.menu,
            subMenu: trackingEventPayload?.subMenu,
          });
          break;
        }
        case "SHOP_BY_CLICK": {
          shopByClicked({
            item_name: trackingEventPayload?.name,
            event: trackingEventPayload?.type, // event name passed for clickstream as payload
            item_id: "",
            item_slug: trackingEventPayload?.slug,
            item_parent_category: trackingEventPayload?.parentCategory,
          });
          break;
        }
        case "BLOG_CLICK": {
          blogClicked({
            item_name: trackingEventPayload.name,
            item_id: trackingEventPayload?.id,
            item_slug: trackingEventPayload.slug,
            item_parent_category: trackingEventPayload?.parentCategory,
          });
          break;
        }
        case "TOP_NAVBAR_CLICKED": {
          topNavbarClicked({
            banner_name: trackingEventPayload?.name,
            item_id: trackingEventPayload?.slug,
            Source: "Web",
            "Section Name": "Top Navbar",
          });
          break;
        }

        default:
          break;
      }
    },
    //  eslint-disable-next-line react-hooks/exhaustive-deps
    [trackingId, trackingType],
  );

  return (
    <Link
      prefetch={false}
      href={href}
      className={className}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
};

export default LinkClickTracker;
