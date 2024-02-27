/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "/.index.html",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["var(--font-poppins)"],
        westcoast: ["var(--font-westcoast)"],
        westcoastline: ["var(--font-westcoastline)"],
        krakens: ["var(--font-krakens)"],
      },
      colors: {
        carpetMoss: "#02A633",
        pottBlack: "#161616",
        chiGong: "#D32929",
        selected: "#76CE91",
        blurred: "#DDF2E3",
        sativa: "#E2B62C",
        indiga: "#3D438B",
        hybrid: "#44632E",
      },

    },
  },
  plugins: [],
};
