"use client";

import Link from "next/link";
import { useCallback } from "react";
import { useEventsDispatch } from "@/store/sagas/dispatch/events.dispatch";
import { getSource } from "@/utils/helpers";
const LinkClickTracker = ({
  href,
  className,
  children,
  trackingId,
  trackingType = "link",
  trackingEventPayload = "",
}) => {
  const source = getSource();
  const { bannerClicked, shopByClicked } = useEventsDispatch();
  const handleClick = useCallback(
    (e) => {
      // console.log(`${trackingType} clicked: ${trackingId}`);
      switch (trackingType) {
        case "BANNER_CLICKED": {
          bannerClicked({
            Source: source,
            item_id: trackingEventPayload?.url,
            banner_name: trackingEventPayload?.alternativeText,
          });
          break;
        }
        case "SHOP_BY_CLICK": {
          shopByClicked({
            item_name: trackingEventPayload?.name,
            item_id: "",
            item_slug: trackingEventPayload?.slug,
            item_parent_category: trackingEventPayload?.parentCategory,
          });
          break;
        }
        default:
          break;
      }
      // You can send an analytics event here if needed
      // Example: sendAnalyticsEvent(trackingType, trackingId);
    },
    [trackingId, trackingType],
  );

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
};

export default LinkClickTracker;
