import React from "react";

const iconDefaults = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const SparklesIcon = ({
  size = 24,
  color = "#dd8434",
  strokeWidth = 2,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Main sparkle */}
    <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10L12 2Z" />
    {/* Top left small sparkle */}
    <path d="M5 5V7M5 5H7M5 5H3M5 5V3" />
    {/* Bottom right small sparkle */}
    <path d="M19 19V21M19 19H21M19 19H17M19 19V17" />
  </svg>
);

export const CopyIcon = ({ size = 24, color = "#dd8434", strokeWidth = 2 }) => (
  <svg
    {...iconDefaults}
    width={size}
    height={size}
    stroke={color}
    strokeWidth={strokeWidth}
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

export const CheckIcon = ({
  size = 24,
  color = "#dd8434",
  strokeWidth = 2,
}) => (
  <svg
    {...iconDefaults}
    width={size}
    height={size}
    stroke={color}
    strokeWidth={strokeWidth}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const PlusIcon = ({ size = 24, color = "#dd8434", strokeWidth = 2 }) => (
  <svg
    {...iconDefaults}
    width={size}
    height={size}
    stroke={color}
    strokeWidth={strokeWidth}
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export const MinusIcon = ({
  size = 24,
  color = "#dd8434",
  strokeWidth = 2,
}) => (
  <svg
    {...iconDefaults}
    width={size}
    height={size}
    stroke={color}
    strokeWidth={strokeWidth}
  >
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export const ArrowRightIcon = ({
  size = 24,
  color = "#FFFFFF",
  strokeWidth = 2,
}) => (
  <svg
    {...iconDefaults}
    width={size}
    height={size}
    stroke={color}
    strokeWidth={strokeWidth}
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export const ShoppingBagIcon = ({
  size = 24,
  color = "#dd8434",
  strokeWidth = 2,
}) => (
  <svg
    {...iconDefaults}
    width={size}
    height={size}
    stroke={color}
    strokeWidth={strokeWidth}
  >
    <path d="M6 2l1 5h10l1-5z" />
    <path d="M3 7h18l-1 14H4z" />
    <path d="M16 11a4 4 0 0 1-8 0" />
  </svg>
);

export const ShieldIcon = ({
  size = 24,
  color = "#dd8434",
  strokeWidth = 2,
}) => (
  <svg
    {...iconDefaults}
    width={size}
    height={size}
    stroke={color}
    strokeWidth={strokeWidth}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

export const AwardIcon = ({
  size = 24,
  color = "#dd8434",
  strokeWidth = 2,
}) => (
  <svg
    {...iconDefaults}
    width={size}
    height={size}
    stroke={color}
    strokeWidth={strokeWidth}
  >
    <circle cx="12" cy="8" r="7" />
    <path d="M8.21 13.89l-2.2 6.63 5.99-4.38 5.99 4.38-2.2-6.63" />
  </svg>
);

export const ClockIcon = ({
  size = 24,
  color = "#dd8434",
  strokeWidth = 2,
}) => (
  <svg
    {...iconDefaults}
    width={size}
    height={size}
    stroke={color}
    strokeWidth={strokeWidth}
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
