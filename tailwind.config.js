/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontFamily: {
      primary: "var(--font-robotoFlex)",
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#F2F1EB",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#F5F7F8",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondColor: {
          DEFAULT: "F5EDED",
          foreground: "hsl(var(--secondColor-foreground))",
        },
      },
      screens: {
        xs: "480px", // Extra small devices
        sm: "640px", // Small devices
        md: "768px", // Medium devices
        lg: "1024px", // Large devices
        xl: "1280px", // Extra large devices
        "2xl": "1400px", // Custom extra large devices
        "3xl": "1900px",
      },
    },
  },
};
