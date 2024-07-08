import { useRef, useEffect } from "react";

export const useRippleEffect = (enableRipple) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !enableRipple) return;

    const rippleEffect = (event) => {
      const elem = event.currentTarget;
      const circle = document.createElement("span");
      const diameter = Math.max(elem.clientWidth, elem.clientHeight);
      const radius = diameter / 2;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${event.clientX - elem.getBoundingClientRect().left - radius}px`;
      circle.style.top = `${event.clientY - elem.getBoundingClientRect().top - radius}px`;
      circle.classList.add("ripple");

      const ripple = elem.getElementsByClassName("ripple")[0];
      if (ripple) {
        ripple.remove();
      }
      elem.appendChild(circle);
    };

    element.addEventListener("click", rippleEffect);
    return () => {
      element.removeEventListener("click", rippleEffect);
    };
  }, [enableRipple]);

  return elementRef;
};
