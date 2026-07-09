/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['"IBM Plex Sans"', 'sans-serif'],
        sans: ['"IBM Plex Sans"', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
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
          popover: "hsl(var(--popover-foreground))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        brand: {
          orange: "#F97316",
          orangeDark: "#EA580C",
          jet: "#111111",
          slate: "#0F172A",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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

        "fade-up": {
          "0%": {
            opacity: 0,
            transform: "translateY(16px)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },

        heroZoom: {
          "0%": {
            transform: "scale(1)",
          },
          "100%": {
            transform: "scale(1.12)",
          },
        },

        heroFloat: {
          "0%,100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-15px)",
          },
        },

        heroGlow: {
          "0%,100%": {
            opacity: .25,
          },
          "50%": {
            opacity: .7,
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down .2s ease-out",

        "accordion-up": "accordion-up .2s ease-out",

        "fade-up": "fade-up .6s ease-out forwards",

        heroZoom: "heroZoom 12s linear forwards",

        heroFloat: "heroFloat 6s ease-in-out infinite",

        heroGlow: "heroGlow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
};

