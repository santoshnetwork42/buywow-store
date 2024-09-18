const CreditIcon = ({ size = 20, color = "#000000", ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill={color}
    >
      <g transform="translate(0, 0)">
        <circle cx="16" cy="16" r="16" fill="#32B566" fillOpacity="0.15" />
      </g>

      <g transform="translate(8, 8)">
        <path
          d="M12 4L4 12"
          stroke="#32B566"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.5 12H4V5.5"
          stroke="#32B566"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default CreditIcon;
