const AlertIcon = ({ size = 34, className, ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 34 34"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="34" height="34" fill="url(#pattern0_1_5749)" />
      <defs>
        <pattern
          id="pattern0_1_5749"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use href="#image0_1_5749" transform="scale(0.0078125)" />
        </pattern>
        <image
          id="image0_1_5749"
          width="128"
          height="128"
          href="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};

export default AlertIcon;

export const IconWrapper = ({
  children,
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {children}
  </svg>
);

export const Gift = ({ size, color, strokeWidth, className }) => (
  <IconWrapper
    size={size}
    color={color}
    strokeWidth={strokeWidth}
    className={className}
  >
    <path d="M20 12v10H4V12" />
    <path d="M2 7h20v5H2z" />
    <path d="M12 22V7" />
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
  </IconWrapper>
);

export const Volume2 = ({ size, color, strokeWidth, className }) => (
  <IconWrapper
    size={size}
    color={color}
    strokeWidth={strokeWidth}
    className={className}
  >
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
  </IconWrapper>
);

export const VolumeX = ({ size, color, strokeWidth, className }) => (
  <IconWrapper
    size={size}
    color={color}
    strokeWidth={strokeWidth}
    className={className}
  >
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <line x1="23" y1="9" x2="17" y2="15" />
    <line x1="17" y1="9" x2="23" y2="15" />
  </IconWrapper>
);

export const Copy = ({ size, color, strokeWidth, className }) => (
  <IconWrapper
    size={size}
    color={color}
    strokeWidth={strokeWidth}
    className={className}
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </IconWrapper>
);

export const ExternalLink = ({ size, color, strokeWidth, className }) => (
  <IconWrapper
    size={size}
    color={color}
    strokeWidth={strokeWidth}
    className={className}
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </IconWrapper>
);

export const Timer = ({ size, color, strokeWidth, className }) => (
  <IconWrapper
    size={size}
    color={color}
    strokeWidth={strokeWidth}
    className={className}
  >
    <line x1="10" y1="2" x2="14" y2="2" />
    <line x1="12" y1="14" x2="12" y2="8" />
    <circle cx="12" cy="14" r="8" />
  </IconWrapper>
);

export const X = ({ size, color, strokeWidth, className }) => (
  <IconWrapper
    size={size}
    color={color}
    strokeWidth={strokeWidth}
    className={className}
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </IconWrapper>
);
