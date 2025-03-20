<<<<<<< HEAD
=======
/** @type {import('tailwindcss').Config} */
>>>>>>> 53fdfb42e21bb902f8308ca68c3b9abf095e991d
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
<<<<<<< HEAD
        background: {
          DEFAULT: "hsl(var(--background))",
          dark: "hsl(215, 28%, 17%)" // This gives a dark blue instead of black
        },  // Added comma here
        foreground: "hsl(var(--foreground))",
        
=======
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
>>>>>>> 53fdfb42e21bb902f8308ca68c3b9abf095e991d
        primary: {
          DEFAULT: "#1B4B8F",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
<<<<<<< HEAD
        signin: {
          from: "#1B4B8F",
          to: "#2563eb",
          hover: {
            from: "#1e40af",
            to: "#1d4ed8"
          }
        },
=======
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
>>>>>>> 53fdfb42e21bb902f8308ca68c3b9abf095e991d
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
<<<<<<< HEAD
        "button-glow": {
          "0%, 100%": { boxShadow: "0 0 15px rgba(37, 99, 235, 0.5)" },
          "50%": { boxShadow: "0 0 30px rgba(37, 99, 235, 0.8)" }
        }
=======
>>>>>>> 53fdfb42e21bb902f8308ca68c3b9abf095e991d
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
<<<<<<< HEAD
        "button-glow": "button-glow 2s ease-in-out infinite"
      }
=======
      },
>>>>>>> 53fdfb42e21bb902f8308ca68c3b9abf095e991d
    },
  },
  plugins: [require("tailwindcss-animate")],
}

