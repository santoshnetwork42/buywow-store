"use client";

import Link from "next/link";
import { useCallback } from "react";

const LinkClickTracker = ({
  href,
  className,
  children,
  trackingId,
  trackingType = "link",
}) => {
  const handleClick = useCallback(
    (e) => {
      console.log(`${trackingType} clicked: ${trackingId}`);

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
