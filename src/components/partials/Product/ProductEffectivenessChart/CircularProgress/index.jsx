const CircularProgressBar = ({ percentage, className }) => {
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = ((100 - percentage) / 100) * circumference;

  const getProgressRotate = 270 - (percentage / 100) * 360;

  return (
    <svg width="200" height="200" viewBox="0 0 200 200" className={className}>
      {/* Background Circle */}
      <circle
        cx="100"
        cy="100"
        r={radius}
        fill="none"
        stroke="#fff"
        strokeWidth="20"
      />

      {/* Rounded End Circle */}
      {percentage > 1 && (
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="#DD8434"
          strokeWidth="18"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset + 12}
          strokeLinecap="round"
          transform={`rotate(${getProgressRotate} 100 100)`}
        />
      )}

      {/* Progress Bar Circle (Butt End) */}
      <circle
        cx="100"
        cy="100"
        r={radius}
        fill="none"
        stroke="#DD8434"
        strokeWidth="18"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap={percentage > 1 ? "butt" : "round"}
        transform={`rotate(${getProgressRotate} 100 100)`}
      />

      {/* Percentage Text */}
      <text
        x="100"
        y="100"
        fontSize="32"
        textAnchor="middle"
        dy=".3em"
        fill="#DD8434"
      >
        {percentage}%
      </text>
    </svg>
  );
};

export default CircularProgressBar;
