const VideoDotIcon = ({ size = 10, color = "#DDDDDD", className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="4.99999" cy="4.99999" r="4.99999" fill={color} />
      <path
        d="M8.68587 4.99944L3.00606 8.15017L3.11736 1.65595L8.68587 4.99944Z"
        fill="white"
      />
    </svg>
  );
};

export default VideoDotIcon;
