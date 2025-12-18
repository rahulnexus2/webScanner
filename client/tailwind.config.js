/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#020617", // Slate 950 (Deepest Navy)
        surface: "#0f172a",    // Slate 900
        surfaceHighlight: "#1e293b", // Slate 800
        primary: "#06b6d4",    // Cyan 500 (Trust/Safe)
        primaryHover: "#22d3ee", // Cyan 400
        secondary: "#3b82f6",  // Blue 500
        accent: "#6366f1",     // Indigo 500
        success: "#10b981",    // Emerald 500
        danger: "#ef4444",     // Red 500
        warning: "#f59e0b",    // Amber 500
        textMain: "#f8fafc",   // Slate 50
        textMuted: "#94a3b8",  // Slate 400
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "scan-line": "scanLine 2s linear infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scanLine: {
          "0%": { top: "0%" },
          "100%": { top: "100%" },
        },
      },
      boxShadow: {
        "glow": "0 0 20px rgba(6, 182, 212, 0.5)",
        "glow-danger": "0 0 20px rgba(239, 68, 68, 0.5)",
      }
    },
  },
  plugins: [],
}

