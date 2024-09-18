const EllipsisIcon = ({ size = 20, color = "#000000", className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill={color}
      className={className}
    >
      <circle cx="10" cy="10" r="10" fill="#282828" />
      <text
        x="10"
        y="10"
        textAnchor="middle"
        alignmentBaseline="middle"
        fill="white"
        fontSize="10"
      >
        i
      </text>
    </svg>
  );
};

export default EllipsisIcon;
