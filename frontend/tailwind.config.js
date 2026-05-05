/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "SF Pro Text",
          "Helvetica Neue",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      colors: {
        apple: {
          bg:       "#000000",
          surface:  "#111111",
          card:     "#1c1c1e",
          border:   "rgba(255,255,255,0.08)",
          label:    "#ffffff",
          secondary:"#ebebf5",
          tertiary: "#ebebf599",
          green:    "#30d158",
          red:      "#ff453a",
          blue:     "#0a84ff",
          fill:     "rgba(255,255,255,0.05)",
          hover:    "rgba(255,255,255,0.08)",
        },
      },
      borderRadius: {
        apple: "12px",
        "apple-lg": "18px",
        "apple-xl": "22px",
      },
    },
  },
  plugins: [],
};