const DebitIcon = ({ size = 20, color = "#000000", ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill={color}
    >
      <g transform="translate(0, 0)">
        <circle cx="16" cy="16" r="16" fill="#E61F42" fillOpacity="0.13" />
      </g>

      <g transform="translate(8, 8)">
        <path
          d="M4 12L12 4"
          stroke="#E61F42"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.5 4L12 4L12 10.5"
          stroke="#E61F42"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default DebitIcon;
