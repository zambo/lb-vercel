const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.blue,
        gray: colors.slate,
      },
      transitionDuration: {
        DEFAULT: "750ms",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "2rem",
          lg: "4rem",
          xl: "5rem",
        },
      },
      fontFamily: {
        body: ["Ubuntu", "ui-sans-serif"],
        serif: ["Crimson Text", "ui-serif"],
      },
      fontSize: {
        xxs: ["0.7rem", { lineHeight: "0.75rem" }],
      },
      aspectRatio: {
        "4/3": "4 / 3",
        "2/1": "2 / 1",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
