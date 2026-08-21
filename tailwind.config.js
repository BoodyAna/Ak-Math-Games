/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#16233D",
          50: "#EEF1F6",
          100: "#D7DEE9",
          200: "#AFC0D6",
          300: "#8299B9",
          400: "#526080",
          500: "#16233D",
          600: "#121D33",
          700: "#0E1626",
          800: "#0A101B",
          900: "#060A11",
        },
        chalk: {
          DEFAULT: "#1F5C4E",
          50: "#E9F4F1",
          100: "#C7E4DC",
          200: "#96CDBE",
          300: "#5FB19C",
          400: "#37937C",
          500: "#1F5C4E",
          600: "#194A3F",
          700: "#123830",
          800: "#0B2620",
          900: "#051410",
        },
        paper: {
          DEFAULT: "#FAF8F3",
          dim: "#F1EEE4",
        },
        amber: {
          DEFAULT: "#F5A623",
          50: "#FEF6E9",
          100: "#FCE8C2",
          200: "#F9D38A",
          300: "#F7BE52",
          400: "#F5A623",
          500: "#D98C0E",
          600: "#B0700A",
        },
        coral: {
          DEFAULT: "#E8583F",
          50: "#FDEEEA",
          100: "#FAD1C6",
          200: "#F3A48F",
          300: "#EC7758",
          400: "#E8583F",
          500: "#CB3F27",
        },
        teal: {
          DEFAULT: "#2AA9A0",
          50: "#E8F7F6",
          100: "#C3ECE9",
          200: "#8CD9D2",
          300: "#55C6BC",
          400: "#2AA9A0",
          500: "#1F8880",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      backgroundImage: {
        "grid-paper":
          "linear-gradient(rgba(22,35,61,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(22,35,61,0.06) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid-24": "24px 24px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(22,35,61,0.04), 0 8px 24px -8px rgba(22,35,61,0.12)",
        "card-hover": "0 4px 8px rgba(22,35,61,0.06), 0 16px 32px -12px rgba(22,35,61,0.18)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-12px) rotate(3deg)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "fade-up": "fade-up 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};
