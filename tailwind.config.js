/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // One family for the whole app, see DESIGN.md.
      fontFamily: {
        sans: ["Poppins", "system-ui", "sans-serif"],
      },
      // Tailwind 3.3 belum punya skala spacing untuk min-h, jadi min-h-11 tidak
      // menghasilkan CSS apa pun. Skala ini yang membuat target sentuh 44px berlaku.
      minHeight: ({ theme }) => theme("spacing"),
      minWidth: ({ theme }) => theme("spacing"),
      // 2 core colors + 1 accent, see DESIGN.md.
      colors: {
        ink: { DEFAULT: "#141821", soft: "#3A4250", mute: "#565D68" },
        paper: { DEFAULT: "#F4F2EE", line: "#DFDAD1" },
        signal: { DEFAULT: "#C8102E", strong: "#A00D25" },
      },
    },
  },
  plugins: [],
};
