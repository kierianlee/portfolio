/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    fontFamily: {
      serif: ["Source Sans Pro"],
      mono: ["Space Mono"],
    },
    extend: {
      colors: {
        phantom: "rgb(29, 29, 29)",
        "phantom-dark": "rgb(24, 24, 24)",
        "phantom-darker": "rgb(7, 7, 7)",
        crayola: "#08fdd8",
        dimmed: "rgba(255,255,255,0.6)",
        muted: "rgba(0,0,0,0.6)",
      },
    },
  },
  plugins: [],
};
