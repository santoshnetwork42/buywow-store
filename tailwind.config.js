/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      xs: "480px",
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      xxl: "1400px",
      xxxl: "1600px",
      xlst: "1920px",
    },
    extend: {
      colors: {
        amber: { 200: "#f1d98d" },
        black: {
          900: "#000000",
          // "900_0c": "#0000000c",
          // "900_19": "#00000019",
          // "900_3f": "#0000003f",
          "900_7f": "#0000007f",
        },
        blue: { 50: "#e7f0f9", 300: "#8AA0C0" },
        blue_gray: {
          // 100: "#d9d9d9",
          300: "#889ebd",
          400: "#868686",
          "300_01": "#899fbf",
          "400_01": "#6e809a",
        },
        deep_orange: {
          50: "#f8eee6",
          // "50_01": "#f6e8eb",
          "50_03": "#f7ede5",
        },
        gray: {
          50: "#fbfbf5",
          100: "#f2f4f1",
          300: "#dcdcdc",
          400: "#c2c3c7",
          500: "#aaaaaa",
          600: "#666666",
          700: "#575757",
          "300_01": "#dddddd",
          // "300_02": "#dadada",
          "400_02": "#c5c5c5",
          // "700_01": "#686868",
          "700_02": "#5c5c5c",
        },
        lime: {
          50: "#f7f7e7",
          100: "#efefd0",
          "100_01": "#f5e9cc",
          "50_01": "#f9f9ec",
        },
        orange: {
          // 50: "#fdfbdb",
          // 400: "#ffa41c",
          500: "#F5E8DD",
          "500_01": "#f97316",
          "50_01": "#f9f2e0",
          // a200: "#fab73b",
        },
        pink: { 200: "#F6E8EB" },
        white: { a700: "#fefefe", a700_01: "#ffffff" },
        yellow: {
          // 700: "#e2bb21",
          900: "#dd8434",
        },
        // black_600: "#656d76",
        // gray_shadow: "#00000029",
        green: {
          500: "#17b31b",
          "100_01": "#e6f5eb",
        },
      },
      boxShadow: {
        xs: "0 4px 4px 0 #0000000c",
        sm: "0 4px 4px 0 #0000000D",
        md: "0 0 13px 5px #00000029",
      },
      fontFamily: {
        outfit: ["var(--font-outfit)"],
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": {
            boxShadow: "0 0 1px 1px rgba(221, 132, 52, 0.5)",
          },
          "30%": {
            boxShadow: "0 0 3px 3px rgba(221, 132, 52, 0.6)",
          },
        },
        flying: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-1000px)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-5px)" },
          "75%": { transform: "translateX(5px)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "border-complete": "borderLinear 0.5s linear forwards",
        flying: "flying 0s linear infinite",
        shake: "shake 0.5s ease-in-out infinite",
        float: "float 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
