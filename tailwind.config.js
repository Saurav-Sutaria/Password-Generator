/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*"],
  theme: {
    extend: {
      fontFamily: {
        mullish: ["League Spartan", "sans-serif"],
      },
      colors: {
        dk_Violet: "hsl(268, 75%, 9%)",
        lt_Violet: "hsl(268, 47%, 21%)",
        lt_violet2: "hsl(281, 89%, 26%)",
        vb_violet: "hsl(285, 91%, 52%)",
        vb_violet2: "hsl(290, 70%, 36%)",
        vb_yellow: "hsl(52, 100%, 62%)",    
        pl_white: "hsl(0, 0%, 100%)",
        vb_cyan: "hsl(176, 100%, 44%)",
        vb_cyan2: "hsl(177, 92%, 70%)",
        dk_text: "hsl(198, 20%, 13%)",
      },
    },
  },
  plugins: [],
}
