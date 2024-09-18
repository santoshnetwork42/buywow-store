const GradientStarIcon = ({
  color = "#FFA41C",
  size = 30,
  className,
}) => {
  const gradientId = `grad${color}`;

  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 14 13"
      className={className}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop
            offset={`${color}%`}
            style={{ stopColor: "#FAB73B", stopOpacity: 1 }}
          />
          <stop
            offset={`${color}%`}
            style={{ stopColor: "lightgray", stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${gradientId})`}
        d="M6.43209 0.747855C6.61084 0.197704 7.38916 0.197706 7.56791 0.747857L8.66205 4.11525C8.74199 4.36129 8.97126 4.52786 9.22996 4.52786H12.7706C13.3491 4.52786 13.5896 5.26809 13.1216 5.6081L10.2572 7.68926C10.0479 7.84132 9.96029 8.11085 10.0402 8.35688L11.1344 11.7243C11.3131 12.2744 10.6835 12.7319 10.2155 12.3919L7.35099 10.3107C7.1417 10.1587 6.8583 10.1587 6.64901 10.3107L3.78453 12.3919C3.31655 12.7319 2.68688 12.2744 2.86563 11.7243L3.95976 8.35689C4.03971 8.11085 3.95213 7.84132 3.74284 7.68926L0.878362 5.6081C0.410376 5.26809 0.650891 4.52786 1.22935 4.52786H4.77004C5.02874 4.52786 5.25801 4.36129 5.33795 4.11525L6.43209 0.747855Z"
      />
    </svg>
  );
};

export default GradientStarIcon;
