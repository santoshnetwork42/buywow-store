const defaultIconSize = 28;
const defaultIconColor = "rgb(34, 34, 34)";

export const CloseIcon = ({ size = 30, color = "black", className }) => {
  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className={className}
    >
      <path
        fill={color}
        d="M353.7 158.3l-22.4-22.4-75.8 75.8-75.8-75.8-22.4 22.4 75.8 75.8-75.8 75.8 22.4 22.4 75.8-75.8 75.8 75.8 22.4-22.4-75.8-75.8 75.8-75.8z"
      />
    </svg>
  );
};

export const CloseSVG = ({
  fillColor = "#000000",
  className = "",
  ...props
}) => {
  return (
    <svg
      fill={fillColor}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
      height={props?.width || 20}
      width={props?.height || 20}
      viewBox={`0 0 ${props?.width || 20} ${props?.height || 20}`}
    >
      <path
        d="M18 6L6 18"
        stroke={fillColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 6L18 18"
        stroke={fillColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const DownArrowIconSVG = ({
  fillColor = "#000000",
  className = "",
  strokeWidth = 1, // Default stroke width
  ...props
}) => {
  const width = props?.width || 10;
  const height = props?.height || 10;
  const halfWidth = width / 2;
  const halfHeight = height / 2;

  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
      height={height}
      width={width}
      viewBox={`0 0 ${width} ${height}`}
    >
      <path
        d={`M${halfWidth - 4} ${halfHeight - 2} L${halfWidth} ${halfHeight + 2} L${halfWidth + 4} ${halfHeight - 2}`}
        stroke={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth} // Add strokeWidth here
      />
    </svg>
  );
};

export const MenuSVG = ({
  fillColor = "#000000",
  className = "",
  ...props
}) => {
  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
      width={props?.width || 27}
      height={props?.height || 22}
      viewBox="0 0 27 22"
    >
      <path
        d="M18.1207 4.125H1.38555C0.619757 4.125 0 3.81746 0 3.4375C0 3.05754 0.61979 2.75 1.38555 2.75H18.1207C18.8865 2.75 19.5063 3.05754 19.5063 3.4375C19.5063 3.81735 18.8865 4.125 18.121 4.125H18.1207Z"
        fill={fillColor}
      />
      <path
        d="M25.3398 11.499H1.38555C0.619757 11.499 0 11.1915 0 10.8115C0 10.4316 0.61979 10.124 1.38555 10.124L25.3398 10.1241C26.1056 10.1241 26.7254 10.4317 26.7254 10.8116C26.7251 11.1915 26.1053 11.499 25.3398 11.499Z"
        fill={fillColor}
      />
      <path
        d="M18.1207 18.8677H1.38555C0.619757 18.8677 0 18.5601 0 18.1802C0 17.8002 0.61979 17.4927 1.38555 17.4927H18.1207C18.8865 17.4927 19.5063 17.8002 19.5063 18.1802C19.5063 18.5601 18.8862 18.8677 18.1207 18.8677Z"
        fill={fillColor}
      />
    </svg>
  );
};

export const UserSVG = ({
  fillColor = "#292D32",
  className = "",
  ...props
}) => {
  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
      height={props?.width || 24}
      width={props?.height || 24}
      viewBox="0 0 24 24"
    >
      <path
        d="M12.1601 10.87C12.0601 10.86 11.9401 10.86 11.8301 10.87C9.45006 10.79 7.56006 8.84 7.56006 6.44C7.56006 3.99 9.54006 2 12.0001 2C14.4501 2 16.4401 3.99 16.4401 6.44C16.4301 8.84 14.5401 10.79 12.1601 10.87Z"
        stroke={fillColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.16021 14.56C4.74021 16.18 4.74021 18.82 7.16021 20.43C9.91021 22.27 14.4202 22.27 17.1702 20.43C19.5902 18.81 19.5902 16.17 17.1702 14.56C14.4302 12.73 9.92021 12.73 7.16021 14.56Z"
        stroke={fillColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const StarIcon = ({ size = 30, color = "#FAB73B", className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 13 13"
      fill="none"
      className={className}
    >
      <path
        d="M6.43209 0.747855C6.61084 0.197704 7.38916 0.197706 7.56791 0.747857L8.66205 4.11525C8.74199 4.36129 8.97126 4.52786 9.22996 4.52786H12.7706C13.3491 4.52786 13.5896 5.26809 13.1216 5.6081L10.2572 7.68926C10.0479 7.84132 9.96029 8.11085 10.0402 8.35688L11.1344 11.7243C11.3131 12.2744 10.6835 12.7319 10.2155 12.3919L7.35099 10.3107C7.1417 10.1587 6.8583 10.1587 6.64901 10.3107L3.78453 12.3919C3.31655 12.7319 2.68688 12.2744 2.86563 11.7243L3.95976 8.35689C4.03971 8.11085 3.95213 7.84132 3.74284 7.68926L0.878362 5.6081C0.410376 5.26809 0.650891 4.52786 1.22935 4.52786H4.77004C5.02874 4.52786 5.25801 4.36129 5.33795 4.11525L6.43209 0.747855Z"
        fill={color}
      />
    </svg>
  );
};

export const LoaderIcon = ({
  size = 20,
  color = "#dd8433",
  strokeColor = "#FFF",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      height={size}
      width={size}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke={strokeColor}
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill={color}
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};

export const ArrowIconSVG = ({
  height = 24,
  width = 24,
  className = "",
  strokeWidth = 2,
  fillColor = "none",
  strokeColor = "currentColor",
  side = "right",
  ...props
}) => {
  const getPath = () => {
    switch (side) {
      case "left":
        return "M15 6L9 12L15 18";
      case "right":
        return "M9 6L15 12L9 18";
      case "top":
        return "M6 15L12 9L18 15";
      case "bottom":
        return "M6 9L12 15L18 9";
      default:
        return "M9 6L15 12L9 18";
    }
  };

  return (
    <svg
      height={height}
      width={width}
      className={className}
      viewBox="0 0 24 24"
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d={getPath()} />
    </svg>
  );
};

export const CreditIcon = ({ size = 20, color = "#000000", ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill={color}
    >
      <g transform="translate(0, 0)">
        <circle cx="16" cy="16" r="16" fill="#32B566" fillOpacity="0.15" />
      </g>

      <g transform="translate(8, 8)">
        <path
          d="M12 4L4 12"
          stroke="#32B566"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.5 12H4V5.5"
          stroke="#32B566"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export const DebitIcon = ({ size = 20, color = "#000000", ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill={color}
    >
      <g transform="translate(0, 0)">
        <circle cx="16" cy="16" r="16" fill="#E61F42" fillOpacity="0.13" />
      </g>

      <g transform="translate(8, 8)">
        <path
          d="M4 12L12 4"
          stroke="#E61F42"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.5 4L12 4L12 10.5"
          stroke="#E61F42"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export const EllipsisIcon = ({ size = 20, color = "#000000", className }) => {
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

export const PendingLockIcon = ({ size = 20, color = "#000000", ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill={color}
    >
      <path
        d="M9 4H10C10.1326 4 10.2598 4.05268 10.3536 4.14645C10.4473 4.24021 10.5 4.36739 10.5 4.5V10.5C10.5 10.6326 10.4473 10.7598 10.3536 10.8536C10.2598 10.9473 10.1326 11 10 11H2C1.86739 11 1.74021 10.9473 1.64645 10.8536C1.55268 10.7598 1.5 10.6326 1.5 10.5V4.5C1.5 4.36739 1.55268 4.24021 1.64645 4.14645C1.74021 4.05268 1.86739 4 2 4H3V3.5C3 2.70435 3.31607 1.94129 3.87868 1.37868C4.44129 0.81607 5.20435 0.5 6 0.5C6.79565 0.5 7.55871 0.81607 8.12132 1.37868C8.68393 1.94129 9 2.70435 9 3.5V4ZM5.5 7.866V9H6.5V7.866C6.69064 7.75593 6.83964 7.58604 6.92388 7.38266C7.00812 7.17928 7.0229 6.95379 6.96593 6.74116C6.90895 6.52852 6.78341 6.34063 6.60876 6.20662C6.43412 6.07261 6.22013 5.99997 6 5.99997C5.77987 5.99997 5.56588 6.07261 5.39124 6.20662C5.21659 6.34063 5.09105 6.52852 5.03407 6.74116C4.9771 6.95379 4.99188 7.17928 5.07612 7.38266C5.16036 7.58604 5.30936 7.75593 5.5 7.866ZM8 4V3.5C8 2.96957 7.78929 2.46086 7.41421 2.08579C7.03914 1.71071 6.53043 1.5 6 1.5C5.46957 1.5 4.96086 1.71071 4.58579 2.08579C4.21071 2.46086 4 2.96957 4 3.5V4H8Z"
        fill="#282828"
      />
    </svg>
  );
};

export const AlertInfoIcon = ({ size = 20, color = "#000000", ...props }) => {
  return (
    <svg
      className="mb-4 text-yellow-900"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};

export const WalletIcon = ({ size = 20, color = "#000000", className }) => {
  return (
    <svg
      width="130"
      height="178"
      viewBox="0 0 130 178"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M78.4449 136.164L108.333 82.3308L78.7466 69.6666L48.8582 123.501L78.4449 136.164Z"
        fill="#32B566"
      />
      <path
        d="M78.4449 136.164L108.333 82.3308L78.7466 69.6666L48.8582 123.501L78.4449 136.164Z"
        stroke="#474747"
        strokeWidth="0.410648"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M96.6247 80.9899L87.1559 76.9323C85.3663 80.1744 80.9264 81.507 77.234 79.9357L53.9017 121.943L76.713 131.709L100.045 89.7017C96.3529 88.1304 94.8125 84.232 96.6247 80.9899Z"
        fill="#F6F9EA"
      />
      <path
        d="M96.6247 80.9899L87.1559 76.9323C85.3663 80.1744 80.9264 81.507 77.234 79.9357L53.9017 121.943L76.713 131.709L100.045 89.7017C96.3529 88.1304 94.8125 84.232 96.6247 80.9899Z"
        stroke="#474747"
        strokeWidth="0.410648"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M103.294 83.8465L80.4877 74.0849L53.9047 121.965L76.7108 131.727L103.294 83.8465Z"
        stroke="#474747"
        strokeWidth="0.410648"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M80.8584 105.534C85.1496 105.534 88.6283 102.48 88.6283 98.712C88.6283 94.9442 85.1496 91.8897 80.8584 91.8897C76.5673 91.8897 73.0886 94.9442 73.0886 98.712C73.0886 102.48 76.5673 105.534 80.8584 105.534Z"
        fill="#32B566"
      />
      <path
        d="M80.8584 105.534C85.1496 105.534 88.6283 102.48 88.6283 98.712C88.6283 94.9442 85.1496 91.8897 80.8584 91.8897C76.5673 91.8897 73.0886 94.9442 73.0886 98.712C73.0886 102.48 76.5673 105.534 80.8584 105.534Z"
        stroke="#474747"
        strokeWidth="0.410648"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M82.8292 156.333H35.2584C27.7603 156.333 21.6667 150.983 21.6667 144.399V97.4587C21.6667 90.8752 27.7603 85.5248 35.2584 85.5248H82.8292C90.3272 85.5248 96.4208 90.8752 96.4208 97.4587V144.399C96.4208 151.002 90.3499 156.333 82.8292 156.333Z"
        fill="#E2B641"
      />
      <path
        d="M82.8292 156.333H35.2584C27.7603 156.333 21.6667 150.983 21.6667 144.399V97.4587C21.6667 90.8752 27.7603 85.5248 35.2584 85.5248H82.8292C90.3272 85.5248 96.4208 90.8752 96.4208 97.4587V144.399C96.4208 151.002 90.3499 156.333 82.8292 156.333Z"
        fill="#2C2B45"
      />
      <path
        d="M83.1624 156.333H35.5916C28.0936 156.333 22 150.983 22 144.399V97.4587C22 90.8752 28.0936 85.5248 35.5916 85.5248H83.1624C90.6605 85.5248 96.7541 90.8752 96.7541 97.4587V144.399C96.7541 151.002 90.6831 156.333 83.1624 156.333Z"
        fill="#EEC14A"
      />
      <path
        d="M82.8292 153.927H35.2584C27.7603 153.927 21.6667 148.576 21.6667 141.993V144.399C21.6667 150.983 27.7603 156.333 35.2584 156.333H82.8292C90.3272 156.333 96.4208 150.983 96.4208 144.399V141.993C96.4208 148.576 90.3499 153.927 82.8292 153.927Z"
        fill="#D89979"
      />
      <path
        d="M82.8292 85.5248H35.2584C27.7603 85.5248 21.6667 90.4376 21.6667 96.4841V99.0499C21.6667 93.0034 27.7603 88.0906 35.2584 88.0906H82.8292C90.3272 88.0906 96.4208 93.0034 96.4208 99.0499V96.4841C96.4208 90.4376 90.3499 85.5248 82.8292 85.5248Z"
        fill="#F3B598"
      />
      <path
        opacity="0.3"
        d="M66.9721 114.664H54.7397C52.497 114.664 50.6622 113.053 50.6622 111.083V89.105C50.6622 87.1359 52.497 85.5248 54.7397 85.5248H71.0496V111.083C71.0496 113.053 69.2374 114.664 66.9721 114.664Z"
        fill="#474747"
        stroke="#474747"
        strokeWidth="0.410648"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M82.8292 156.333H35.2584C27.7603 156.333 21.6667 150.983 21.6667 144.399V97.4587C21.6667 90.8752 27.7603 85.5248 35.2584 85.5248H82.8292C90.3272 85.5248 96.4208 90.8752 96.4208 97.4587V144.399C96.4208 151.002 90.3499 156.333 82.8292 156.333Z"
        stroke="#474747"
        strokeWidth="0.410648"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g opacity="0.46">
        <path
          opacity="0.46"
          d="M26.6504 144.101V97.7571C26.6504 93.5802 30.5014 90.1989 35.2584 90.1989H82.8292C87.5863 90.1989 91.4372 93.5802 91.4372 97.7571V144.081C91.4372 148.258 87.5863 151.639 82.8292 151.639H35.2584C30.5014 151.659 26.6504 148.278 26.6504 144.101Z"
          stroke="#474747"
          strokeWidth="0.273765"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="0.96 0.96"
        />
      </g>
      <path
        d="M65.16 112.476H52.9275C50.6849 112.476 48.85 110.865 48.85 108.896V84.6299C48.85 82.6608 50.6849 81.0497 52.9275 81.0497H65.16C67.4026 81.0497 69.2375 82.6608 69.2375 84.6299V108.896C69.2375 110.865 67.4253 112.476 65.16 112.476Z"
        fill="#D89979"
      />
      <path
        d="M65.16 110.825H52.9275C50.6849 110.825 48.85 109.214 48.85 107.245V108.896C48.85 110.865 50.6849 112.476 52.9275 112.476H65.16C67.4026 112.476 69.2375 110.865 69.2375 108.896V107.245C69.2375 109.214 67.4253 110.825 65.16 110.825Z"
        fill="#E27444"
      />
      <path
        d="M65.16 81.0497H52.9275C50.6849 81.0497 48.85 82.6608 48.85 84.6299V85.9824C48.85 84.0133 50.6849 82.4022 52.9275 82.4022H65.16C67.4026 82.4022 69.2375 84.0133 69.2375 85.9824V84.6299C69.2375 82.6608 67.4253 81.0497 65.16 81.0497Z"
        fill="#FFB797"
      />
      <path
        d="M65.16 112.476H52.9275C50.6849 112.476 48.85 110.865 48.85 108.896V84.6299C48.85 82.6608 50.6849 81.0497 52.9275 81.0497H65.16C67.4026 81.0497 69.2375 82.6608 69.2375 84.6299V108.896C69.2375 110.865 67.4253 112.476 65.16 112.476Z"
        stroke="#474747"
        strokeWidth="0.410648"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.3"
        d="M59.7233 107.344C62.6258 107.344 64.9788 105.278 64.9788 102.73C64.9788 100.181 62.6258 98.1153 59.7233 98.1153C56.8208 98.1153 54.4679 100.181 54.4679 102.73C54.4679 105.278 56.8208 107.344 59.7233 107.344Z"
        fill="#474747"
        stroke="#474747"
        strokeWidth="0.410648"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g opacity="0.46">
        <path
          opacity="0.46"
          d="M52.9275 110.089C52.18 110.089 51.5684 109.552 51.5684 108.896V84.6299C51.5684 83.9736 52.18 83.4365 52.9275 83.4365H65.16C65.9075 83.4365 66.5192 83.9736 66.5192 84.6299V108.896C66.5192 109.552 65.9075 110.089 65.16 110.089H52.9275Z"
          stroke="#474747"
          strokeWidth="0.273765"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="0.67 0.67"
        />
      </g>
      <path
        d="M59.0438 106.151C61.9463 106.151 64.2993 104.085 64.2993 101.536C64.2993 98.9878 61.9463 96.9219 59.0438 96.9219C56.1413 96.9219 53.7884 98.9878 53.7884 101.536C53.7884 104.085 56.1413 106.151 59.0438 106.151Z"
        fill="#D89979"
      />
      <path
        d="M59.0438 106.151C61.9463 106.151 64.2993 104.085 64.2993 101.536C64.2993 98.9878 61.9463 96.9219 59.0438 96.9219C56.1413 96.9219 53.7884 98.9878 53.7884 101.536C53.7884 104.085 56.1413 106.151 59.0438 106.151Z"
        stroke="#474747"
        strokeWidth="0.410648"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g opacity="0.6">
        <path
          opacity="0.6"
          d="M55.9596 98.7954C56.1318 98.038 57.283 97.9513 58.7822 98.2119C60.2934 98.4987 61.5607 98.9318 61.442 99.5796C61.3322 100.209 59.869 100.936 58.3251 100.767C56.7605 100.589 55.7963 99.5346 55.9596 98.7954Z"
          fill="#FFFCEE"
        />
      </g>
      <g clipPath="url(#clip0_0_1)">
        <path
          d="M26.3356 0C26.3356 0 12.0805 52.7963 26.3356 80.9143C39.9492 107.767 71.9737 101.57 87.3356 127.44C97.6104 144.743 101.836 177 101.836 177"
          stroke="white"
          strokeOpacity="0.22"
        />
        <path
          d="M33.6711 0C33.6711 0 19.4161 52.7963 33.6711 80.9143C47.2847 107.767 79.3092 101.57 94.6711 127.44C104.946 144.743 109.171 177 109.171 177"
          stroke="white"
          strokeOpacity="0.22"
        />
        <path
          d="M41.6711 0C41.6711 0 27.4161 52.7963 41.6711 80.9143C55.2847 107.767 87.3092 101.57 102.671 127.44C112.946 144.743 117.171 177 117.171 177"
          stroke="white"
          strokeOpacity="0.22"
        />
        <path
          d="M48.6711 0C48.6711 0 34.4161 52.7963 48.6711 80.9143C62.2847 107.767 94.3092 101.57 109.671 127.44C119.946 144.743 124.171 177 124.171 177"
          stroke="white"
          strokeOpacity="0.22"
        />
      </g>
      <defs>
        <clipPath id="clip0_0_1">
          <rect
            width="106"
            height="178"
            fill="white"
            transform="translate(19)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export const FreeIcon = ({ size = 20, className }) => {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M45.1867 29.6667C45.68 27.8333 48 25.9 48 24C48 22.1 45.68 20.1667 45.1867 18.3333C44.6933 16.5 45.74 13.6467 44.7933 12C43.84 10.3533 40.8467 9.84667 39.5 8.5C38.1533 7.15333 37.6467 4.16 36 3.20667C34.3533 2.25333 31.5 3.3 29.6667 2.81333C27.8333 2.32667 25.9 0 24 0C22.1 0 20.1667 2.32 18.3333 2.81333C16.5 3.30667 13.6467 2.26 12 3.20667C10.3533 4.15333 9.84667 7.15333 8.5 8.5C7.15333 9.84667 4.16 10.3533 3.20667 12C2.25333 13.6467 3.3 16.5 2.81333 18.3333C2.32667 20.1667 0 22.1 0 24C0 25.9 2.32 27.8333 2.81333 29.6667C3.30667 31.5 2.26 34.3533 3.20667 36C4.16 37.6467 7.15333 38.1533 8.5 39.5C9.84667 40.8467 10.3533 43.84 12 44.7933C13.6467 45.7467 16.5 44.7 18.3333 45.1867C20.1667 45.68 22.1 48 24 48C25.9 48 27.8333 45.68 29.6667 45.1867C31.5 44.6933 34.3533 45.74 36 44.7933C37.6467 43.84 38.1533 40.8467 39.5 39.5C40.8467 38.1533 43.84 37.6467 44.7933 36C45.7467 34.3533 44.7 31.5 45.1867 29.6667Z"
        fill="#17B31B"
      />
      <path
        d="M11.0607 29V20.36H16.3407V21.992H12.6927V23.864H15.6207V25.496H12.6927V29H11.0607ZM17.424 29V20.36H21.072C21.156 20.36 21.268 20.364 21.408 20.372C21.552 20.376 21.68 20.388 21.792 20.408C22.308 20.488 22.73 20.658 23.058 20.918C23.39 21.178 23.634 21.506 23.79 21.902C23.946 22.294 24.024 22.732 24.024 23.216C24.024 23.94 23.844 24.56 23.484 25.076C23.124 25.588 22.56 25.904 21.792 26.024L21.072 26.072H19.056V29H17.424ZM22.296 29L20.592 25.484L22.272 25.16L24.144 29H22.296ZM19.056 24.548H21C21.084 24.548 21.176 24.544 21.276 24.536C21.376 24.528 21.468 24.512 21.552 24.488C21.772 24.428 21.942 24.328 22.062 24.188C22.182 24.044 22.264 23.886 22.308 23.714C22.356 23.538 22.38 23.372 22.38 23.216C22.38 23.06 22.356 22.896 22.308 22.724C22.264 22.548 22.182 22.39 22.062 22.25C21.942 22.106 21.772 22.004 21.552 21.944C21.468 21.92 21.376 21.904 21.276 21.896C21.176 21.888 21.084 21.884 21 21.884H19.056V24.548ZM25.463 29V20.36H31.103V21.884H27.095V23.732H30.383V25.256H27.095V27.476H31.103V29H25.463ZM32.5412 29V20.36H38.1812V21.884H34.1732V23.732H37.4612V25.256H34.1732V27.476H38.1812V29H32.5412Z"
        fill="white"
      />
    </svg>
  );
};

export const LimitedTimeDiscount = ({ discountAmount, size }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M45.1867 29.6667C45.68 27.8333 48 25.9 48 24C48 22.1 45.68 20.1667 45.1867 18.3333C44.6933 16.5 45.74 13.6467 44.7933 12C43.84 10.3533 40.8467 9.84667 39.5 8.5C38.1533 7.15333 37.6467 4.16 36 3.20667C34.3533 2.25333 31.5 3.3 29.6667 2.81333C27.8333 2.32667 25.9 0 24 0C22.1 0 20.1667 2.32 18.3333 2.81333C16.5 3.30667 13.6467 2.26 12 3.20667C10.3533 4.15333 9.84667 7.15333 8.5 8.5C7.15333 9.84667 4.16 10.3533 3.20667 12C2.25333 13.6467 3.3 16.5 2.81333 18.3333C2.32667 20.1667 0 22.1 0 24C0 25.9 2.32 27.8333 2.81333 29.6667C3.30667 31.5 2.26 34.3533 3.20667 36C4.16 37.6467 7.15333 38.1533 8.5 39.5C9.84667 40.8467 10.3533 43.84 12 44.7933C13.6467 45.7467 16.5 44.7 18.3333 45.1867C20.1667 45.68 22.1 48 24 48C25.9 48 27.8333 45.68 29.6667 45.1867C31.5 44.6933 34.3533 45.74 36 44.7933C37.6467 43.84 38.1533 40.8467 39.5 39.5C40.8467 38.1533 43.84 37.6467 44.7933 36C45.7467 34.3533 44.7 31.5 45.1867 29.6667Z"
        fill="#CB0518"
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        fill="white"
        fontSize="12"
        fontWeight="bold"
      >
        {discountAmount}%
      </text>
      <text
        x="50%"
        y="78%"
        textAnchor="middle"
        fill="white"
        fontSize="12"
        fontWeight="bold"
      >
        OFF
      </text>
    </svg>
  );
};

export const AlertIcon = ({ size = 34, className, ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 34 34"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="34" height="34" fill="url(#pattern0_1_5749)" />
      <defs>
        <pattern
          id="pattern0_1_5749"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use href="#image0_1_5749" transform="scale(0.0078125)" />
        </pattern>
        <image
          id="image0_1_5749"
          width="128"
          height="128"
          href="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};

export const BagIcon = ({ size = 20, className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 21"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.72333 6.06427V5.1425C4.72333 3.00439 6.44332 0.904294 8.58143 0.704738C11.1282 0.457667 13.2758 2.46274 13.2758 4.96195V6.27333"
        stroke="black"
        strokeWidth="1.34783"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.14893 19.6819H11.8506C15.6706 19.6819 16.3548 18.1519 16.5544 16.2894L17.2671 10.5878C17.5237 8.26912 16.8585 6.37808 12.8008 6.37808H5.19866C1.141 6.37808 0.475813 8.26912 0.732386 10.5878L1.44509 16.2894C1.64465 18.1519 2.32884 19.6819 6.14893 19.6819Z"
        stroke="black"
        strokeWidth="1.34783"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.3219 10.1796H12.3304"
        stroke="black"
        strokeWidth="1.7971"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.66815 10.1796H5.67669"
        stroke="black"
        strokeWidth="1.7971"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const ImageCamera = ({}) => {
  return (
    <svg
      className="cursor-pointer"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color="var(--theme-primary-black-30)"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.9999 3.66669C14.5541 3.66669 14.1378 3.88949 13.8905 4.26042L10.953 8.66669H4.99992C3.76224 8.66669 2.57526 9.15835 1.70009 10.0335C0.824917 10.9087 0.333252 12.0957 0.333252 13.3334V31.6667C0.333252 32.9044 0.824917 34.0913 1.70009 34.9665C2.57526 35.8417 3.76224 36.3334 4.99992 36.3334H34.9999C36.2376 36.3334 37.4246 35.8417 38.2998 34.9665C39.1749 34.0913 39.6666 32.9044 39.6666 31.6667V13.3334C39.6666 12.0957 39.1749 10.9087 38.2998 10.0335C37.4246 9.15835 36.2376 8.66669 34.9999 8.66669H29.0468L26.1093 4.26042C25.862 3.88949 25.4457 3.66669 24.9999 3.66669H14.9999ZM12.776 10.7396L15.7135 6.33335H24.2863L27.2239 10.7396C27.4711 11.1106 27.8874 11.3334 28.3333 11.3334H34.9999C35.5304 11.3334 36.0391 11.5441 36.4141 11.9191C36.7892 12.2942 36.9999 12.8029 36.9999 13.3334V31.6667C36.9999 32.1971 36.7892 32.7058 36.4141 33.0809C36.0391 33.456 35.5304 33.6667 34.9999 33.6667H4.99992C4.46949 33.6667 3.96078 33.456 3.58571 33.0809C3.21063 32.7058 2.99992 32.1971 2.99992 31.6667V13.3334C2.99992 12.8029 3.21063 12.2942 3.58571 11.9191C3.96078 11.5441 4.46949 11.3334 4.99992 11.3334H11.6666C12.1124 11.3334 12.5287 11.1106 12.776 10.7396ZM14.6666 21.6667C14.6666 18.7212 17.0544 16.3334 19.9999 16.3334C22.9454 16.3334 25.3333 18.7212 25.3333 21.6667C25.3333 24.6122 22.9454 27 19.9999 27C17.0544 27 14.6666 24.6122 14.6666 21.6667ZM19.9999 13.6667C15.5816 13.6667 11.9999 17.2484 11.9999 21.6667C11.9999 26.085 15.5816 29.6667 19.9999 29.6667C24.4182 29.6667 27.9999 26.085 27.9999 21.6667C27.9999 17.2484 24.4182 13.6667 19.9999 13.6667Z"
        fill="currentColor"
      ></path>
    </svg>
  );
};

export const VideoDotIcon = ({ size = 10, color = "#DDDDDD", className }) => {
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

export function SearchIcon({ size = 20, color = "#000000", className }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      color={color}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
        stroke="black"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.9984 20.9999L16.6484 16.6499"
        stroke="black"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
