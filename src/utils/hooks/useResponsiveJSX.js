import { useEffect, useState } from "react";

export const useResponsiveJSX = (breakpoints) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const updateIndex = () => {
      const width = window.innerWidth;
      const newIndex = breakpoints.findIndex((bp) => width <= bp);
      setIndex(newIndex === -1 ? breakpoints.length : newIndex);
    };

    updateIndex();
    window.addEventListener("resize", updateIndex);
    return () => window.removeEventListener("resize", updateIndex);
  }, [breakpoints]);

  return index;
};

// Example usage
// const responsiveJSX = useResponsiveJSX([768, 1024, 1280]);

// return (
//       {breakpoint === 0 && <div>Content 1</div>}
//       {breakpoint === 1 && <div>Content 2</div>}
//       {breakpoint === 2 && <div>Content 3</div>}
//   </div>
// );
