import React from "react";

const IngredientIcon = ({ size = 32, color = "black", ...props }) => {
  return (
    <svg
      height={size}
      width={size}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      fill={color}
      {...props}
    >
      <path d="M27.2314 23.6182L20 13.6748V4h2V2H10v2h2v9.6748l-7.2314 9.9434a4.0183 4.0183 0 0 0 3.25 6.3818h15.9628a4.0183 4.0183 0 0 0 3.25-6.3818zM14 14.325V4h4v10.325l2.6728 3.6748h-9.3456zM23.9814 28H8.0186a2.0192 2.0192 0 0 1-1.6329-3.2061l3.4869-4.7939h12.2548l3.4869 4.7939A2.0192 2.0192 0 0 1 23.9814 28z" />
      <path d="M0 0h32v32H0z" fill="none" />
    </svg>
  );
};

export default IngredientIcon;
