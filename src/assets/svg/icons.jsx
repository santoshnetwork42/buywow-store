export const CloseIcon = ({ size = 30, color = "black", className }) => {
  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className={className}
    >
      <path
        fill={color}
        d="M353.7 158.3l-22.4-22.4-75.8 75.8-75.8-75.8-22.4 22.4 75.8 75.8-75.8 75.8 22.4 22.4 75.8-75.8 75.8 75.8 22.4-22.4-75.8-75.8 75.8-75.8z"
      />
    </svg>
  );
};

export const CloseSVG = ({
  fillColor = "#000000",
  className = "",
  ...props
}) => {
  return (
    <svg
      fill={fillColor}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
      height={props?.width || 20}
      width={props?.height || 20}
      viewBox={`0 0 ${props?.width || 20} ${props?.height || 20}`}
    >
      <path
        d="M18 6L6 18"
        stroke={fillColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 6L18 18"
        stroke={fillColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const DownArrowIconSVG = ({
  fillColor = "#000000",
  className = "",
  strokeWidth = 1, // Default stroke width
  ...props
}) => {
  const width = props?.width || 10;
  const height = props?.height || 10;
  const halfWidth = width / 2;
  const halfHeight = height / 2;

  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
      height={height}
      width={width}
      viewBox={`0 0 ${width} ${height}`}
    >
      <path
        d={`M${halfWidth - 4} ${halfHeight - 2} L${halfWidth} ${halfHeight + 2} L${halfWidth + 4} ${halfHeight - 2}`}
        stroke={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth} // Add strokeWidth here
      />
    </svg>
  );
};

export const MenuSVG = ({
  fillColor = "#000000",
  className = "",
  ...props
}) => {
  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
      width={props?.width || 27}
      height={props?.height || 22}
      viewBox="0 0 27 22"
    >
      <path
        d="M18.1207 4.125H1.38555C0.619757 4.125 0 3.81746 0 3.4375C0 3.05754 0.61979 2.75 1.38555 2.75H18.1207C18.8865 2.75 19.5063 3.05754 19.5063 3.4375C19.5063 3.81735 18.8865 4.125 18.121 4.125H18.1207Z"
        fill={fillColor}
      />
      <path
        d="M25.3398 11.499H1.38555C0.619757 11.499 0 11.1915 0 10.8115C0 10.4316 0.61979 10.124 1.38555 10.124L25.3398 10.1241C26.1056 10.1241 26.7254 10.4317 26.7254 10.8116C26.7251 11.1915 26.1053 11.499 25.3398 11.499Z"
        fill={fillColor}
      />
      <path
        d="M18.1207 18.8677H1.38555C0.619757 18.8677 0 18.5601 0 18.1802C0 17.8002 0.61979 17.4927 1.38555 17.4927H18.1207C18.8865 17.4927 19.5063 17.8002 19.5063 18.1802C19.5063 18.5601 18.8862 18.8677 18.1207 18.8677Z"
        fill={fillColor}
      />
    </svg>
  );
};

export const UserSVG = ({
  fillColor = "#292D32",
  className = "",
  ...props
}) => {
  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
      height={props?.width || 24}
      width={props?.height || 24}
      viewBox="0 0 24 24"
    >
      <path
        d="M12.1601 10.87C12.0601 10.86 11.9401 10.86 11.8301 10.87C9.45006 10.79 7.56006 8.84 7.56006 6.44C7.56006 3.99 9.54006 2 12.0001 2C14.4501 2 16.4401 3.99 16.4401 6.44C16.4301 8.84 14.5401 10.79 12.1601 10.87Z"
        stroke={fillColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.16021 14.56C4.74021 16.18 4.74021 18.82 7.16021 20.43C9.91021 22.27 14.4202 22.27 17.1702 20.43C19.5902 18.81 19.5902 16.17 17.1702 14.56C14.4302 12.73 9.92021 12.73 7.16021 14.56Z"
        stroke={fillColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const StarIcon = ({ size = 30, color = "#FAB73B", className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 13 13"
      fill="none"
      className={className}
    >
      <path
        d="M6.43209 0.747855C6.61084 0.197704 7.38916 0.197706 7.56791 0.747857L8.66205 4.11525C8.74199 4.36129 8.97126 4.52786 9.22996 4.52786H12.7706C13.3491 4.52786 13.5896 5.26809 13.1216 5.6081L10.2572 7.68926C10.0479 7.84132 9.96029 8.11085 10.0402 8.35688L11.1344 11.7243C11.3131 12.2744 10.6835 12.7319 10.2155 12.3919L7.35099 10.3107C7.1417 10.1587 6.8583 10.1587 6.64901 10.3107L3.78453 12.3919C3.31655 12.7319 2.68688 12.2744 2.86563 11.7243L3.95976 8.35689C4.03971 8.11085 3.95213 7.84132 3.74284 7.68926L0.878362 5.6081C0.410376 5.26809 0.650891 4.52786 1.22935 4.52786H4.77004C5.02874 4.52786 5.25801 4.36129 5.33795 4.11525L6.43209 0.747855Z"
        fill={color}
      />
    </svg>
  );
};

export const ArrowIconSVG = ({
  height = 24,
  width = 24,
  className = "",
  strokeWidth = 2,
  fillColor = "none",
  strokeColor = "currentColor",
  side = "right",
  ...props
}) => {
  const getPath = () => {
    switch (side) {
      case "left":
        return "M15 6L9 12L15 18";
      case "right":
        return "M9 6L15 12L9 18";
      case "top":
        return "M6 15L12 9L18 15";
      case "bottom":
        return "M6 9L12 15L18 9";
      default:
        return "M9 6L15 12L9 18";
    }
  };

  return (
    <svg
      height={height}
      width={width}
      className={className}
      viewBox="0 0 24 24"
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d={getPath()} />
    </svg>
  );
};

export const AlertInfoIcon = ({ size = 20, color = "#000000", ...props }) => {
  return (
    <svg
      className="mb-4 text-yellow-900"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};

export const LimitedTimeDiscount = ({ discountAmount, size }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M45.1867 29.6667C45.68 27.8333 48 25.9 48 24C48 22.1 45.68 20.1667 45.1867 18.3333C44.6933 16.5 45.74 13.6467 44.7933 12C43.84 10.3533 40.8467 9.84667 39.5 8.5C38.1533 7.15333 37.6467 4.16 36 3.20667C34.3533 2.25333 31.5 3.3 29.6667 2.81333C27.8333 2.32667 25.9 0 24 0C22.1 0 20.1667 2.32 18.3333 2.81333C16.5 3.30667 13.6467 2.26 12 3.20667C10.3533 4.15333 9.84667 7.15333 8.5 8.5C7.15333 9.84667 4.16 10.3533 3.20667 12C2.25333 13.6467 3.3 16.5 2.81333 18.3333C2.32667 20.1667 0 22.1 0 24C0 25.9 2.32 27.8333 2.81333 29.6667C3.30667 31.5 2.26 34.3533 3.20667 36C4.16 37.6467 7.15333 38.1533 8.5 39.5C9.84667 40.8467 10.3533 43.84 12 44.7933C13.6467 45.7467 16.5 44.7 18.3333 45.1867C20.1667 45.68 22.1 48 24 48C25.9 48 27.8333 45.68 29.6667 45.1867C31.5 44.6933 34.3533 45.74 36 44.7933C37.6467 43.84 38.1533 40.8467 39.5 39.5C40.8467 38.1533 43.84 37.6467 44.7933 36C45.7467 34.3533 44.7 31.5 45.1867 29.6667Z"
        fill="#CB0518"
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        fill="white"
        fontSize="12"
        fontWeight="bold"
      >
        {discountAmount}%
      </text>
      <text
        x="50%"
        y="78%"
        textAnchor="middle"
        fill="white"
        fontSize="12"
        fontWeight="bold"
      >
        OFF
      </text>
    </svg>
  );
};

export const UserIcon = ({ size = 20, className }) => (
  <svg
    width={size}
    height={size}
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
      stroke="black"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
      stroke="black"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const BagIcon = ({ size = 20, className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 21"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.72333 6.06427V5.1425C4.72333 3.00439 6.44332 0.904294 8.58143 0.704738C11.1282 0.457667 13.2758 2.46274 13.2758 4.96195V6.27333"
        stroke="black"
        strokeWidth="1.34783"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.14893 19.6819H11.8506C15.6706 19.6819 16.3548 18.1519 16.5544 16.2894L17.2671 10.5878C17.5237 8.26912 16.8585 6.37808 12.8008 6.37808H5.19866C1.141 6.37808 0.475813 8.26912 0.732386 10.5878L1.44509 16.2894C1.64465 18.1519 2.32884 19.6819 6.14893 19.6819Z"
        stroke="black"
        strokeWidth="1.34783"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.3219 10.1796H12.3304"
        stroke="black"
        strokeWidth="1.7971"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.66815 10.1796H5.67669"
        stroke="black"
        strokeWidth="1.7971"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const SearchIcon = ({ size = 20, color = "#000000", className }) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      color={color}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
        stroke="black"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.9984 20.9999L16.6484 16.6499"
        stroke="black"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
