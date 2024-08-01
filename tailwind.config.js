/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#5A72A0",
        highlight: "#eae8fb",
        bgYellow: "#FDFFE2",
        bgGreen: "#B6C7AA",
        bgBlue: "#BBE9FF",
        bgOrange : "#FF8237",
        bgBlack : "#050503",
        bgSlate: "#ddeaf814",
        textWhite1: "#e5e7eb",
        textWhite2: "#aaa",
        bgBlack1: "#25272a",
        textBlack2: "#191a1c",
        textOrange: "#fe6d15f7"
        
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["Fira Code", "monospace"],
      },
    },
  },
  plugins: [],
};
