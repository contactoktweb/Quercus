import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        gunmetal: '#273538',
        'silver-sand': '#C0C5C6',
        'rifle-green': '#405B5B',
        khaki: '#BFA68C',
        'crystal-blue': '#66A7AE',
        'warm-white': '#F7F4EF',
        'soft-black': '#111615',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      letterSpacing: {
        'luxury': '0.2em',
        'wider-luxury': '0.15em',
      },
      animation: {
        'slow-zoom': 'slow-zoom 20s ease-out forwards',
        'fade-up': 'fade-up 1s ease-out forwards',
        'line-grow': 'line-grow 1.5s ease-out forwards',
      },
      keyframes: {
        'slow-zoom': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'line-grow': {
          '0%': { width: '0' },
          '100%': { width: '60px' },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
