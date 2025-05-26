import styles from "@/assets/svg/checkmark/checkmark.module.css";

const Checkmark = ({ size = 20, color = "#000000", className }) => {
  return (
    <svg
      className={`${className} ${styles.checkmark}`}
      width={size}
      height={size}
      color={color}
      strokeWidth={4}
      stroke="#17b31b"
      strokeMiterlimit={10}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 52"
    >
      <circle
        className={`${styles.checkmark__circle}`}
        cx="26"
        cy="26"
        r="25"
        fill="none"
      />
      <path
        className={`${styles.checkmark__check}`}
        fill="none"
        d="M14.1 27.2l7.1 7.2 16.7-16.8"
      />
    </svg>
  );
};

const TickMark = ({ size = 20, color = "#4CAF50", ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 15 15"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 7.5C0 3.35786 3.35786 0 7.5 0C11.6421 0 15 3.35786 15 7.5C15 11.6421 11.6421 15 7.5 15C3.35786 15 0 11.6421 0 7.5ZM7.0718 10.7106L11.3905 5.31232L10.6096 4.68762L6.92825 9.2893L4.32012 7.11586L3.67993 7.88408L7.0718 10.7106Z"
        fill={color}
      />
    </svg>
  );
};

export { TickMark };
export default Checkmark;
