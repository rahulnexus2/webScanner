/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0f", // Deep dark blue/black
        surface: "#12121a", // Slightly lighter for cards
        primary: "#00f0ff", // Neon Cyan
        primaryHover: "#00c0cc",
        secondary: "#7000ff", // Neon Purple
        success: "#00ff9d", // Neon Green
        danger: "#ff0055", // Neon Red
        warning: "#ffbe0b", // Neon Yellow
      },
      fontFamily: {
        sans: ['"Outfit"', 'sans-serif'], // Modern geometric sans
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "pulse-fast": "pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
        "scan": "scan 2s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
    },
  },
  plugins: [],
}

