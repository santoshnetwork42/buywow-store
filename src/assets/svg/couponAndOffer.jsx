const CouponAndOffer = ({ size = 30, color = "#000000", className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 27 27"
      fill={color}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_659_362"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="27"
        height="27"
      >
        <rect width="27" height="27" fill="url(#pattern0_659_362)" />
      </mask>
      <g mask="url(#mask0_659_362)">
        <rect width="27" height="27" fill={color} />
      </g>
      <defs>
        <pattern
          id="pattern0_659_362"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use href="#image0_659_362" transform="scale(0.0078125)" />
        </pattern>
        <image
          id="image0_659_362"
          width="128"
          height="128"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};

export default CouponAndOffer;
