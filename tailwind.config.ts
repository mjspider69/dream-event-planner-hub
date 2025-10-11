import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./client/src/**/*.{js,ts,jsx,tsx}",
    "./client/index.html"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#301823',
          peach: '#F6CFA8',
          tan: '#CBAD8D',
          cream: '#FEF5ED',
          'dark-rgb': '48, 24, 35',
          'peach-rgb': '246, 207, 168',
          'tan-rgb': '203, 173, 141',
          'cream-rgb': '254, 245, 237'
        },
        'royal-gold': '#CBAD8D',
        'warm-gold': '#F6CFA8',
        'deep-gold': '#C9A87A',
        'pearl-white': '#FEF5ED',
        'charcoal-gray': '#301823',
        'soft-sand': '#F5E6D3',
        'misty-rose': '#FAE8E0',
        pearl: {
          50: '#fefdfb',
          100: '#fdf9f3',
          200: '#fbf3e7',
          300: '#f7ebdb',
          400: '#f1dfcf',
          500: '#e9d1c3',
          600: '#d4b8a8',
          700: '#b8998d',
          800: '#9c7b72',
          900: '#7f5e57'
        },
        amber: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f'
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        }
      },
      fontFamily: {
        sans: ['Rasa', 'serif'],
        heading: ['ZCOOL XiaoWei', 'serif'],
        body: ['Rasa', 'serif'],
        playfair: ['ZCOOL XiaoWei', 'serif'],
        poppins: ['Rasa', 'serif'],
        cormorant: ['Rasa', 'serif'],
        'great-vibes': ['ZCOOL XiaoWei', 'serif']
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      }
    }
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")]
};

export default config;