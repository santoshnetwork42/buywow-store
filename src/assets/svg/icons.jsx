export const CloseIcon = ({
  size = defaultIconSize,
  color = defaultIconColor,
}) => {
  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path
        fill={color}
        d="M353.7 158.3l-22.4-22.4-75.8 75.8-75.8-75.8-22.4 22.4 75.8 75.8-75.8 75.8 22.4 22.4 75.8-75.8 75.8 75.8 22.4-22.4-75.8-75.8 75.8-75.8z"
      />
    </svg>
  );
};
