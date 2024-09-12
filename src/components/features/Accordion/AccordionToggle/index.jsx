import { twMerge } from "tailwind-merge";

const ToggleArrow = ({
  open,
  onToggle,
  className,
  variant,
  arrowClassName,
}) => {
  return (
    <div
      className={twMerge(
        "flex aspect-square cursor-pointer justify-center rounded-full text-center",
        variant === "small" ? "w-2 pt-1.5" : "w-5 pt-2.5",
        className,
      )}
      onClick={onToggle}
    >
      <div
        className={twMerge(
          "w-2.5 origin-center transform rounded-full bg-black-900 transition-transform duration-300 ease-in-out",
          variant === "small" ? "h-[1px] -translate-x-[1px]" : "h-0.5",
          open ? "-rotate-45" : "rotate-45",
          arrowClassName,
        )}
      ></div>
      <div
        className={twMerge(
          "-mx-1 w-2.5 origin-center transform rounded-full bg-black-900 transition-transform duration-300 ease-in-out",
          variant === "small" ? "h-[1px]" : "h-0.5",
          open ? "rotate-45" : "-rotate-45",
          arrowClassName,
        )}
      ></div>
    </div>
  );
};

export default ToggleArrow;
