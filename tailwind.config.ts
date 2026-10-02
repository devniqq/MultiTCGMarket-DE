import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#090d14',
          panel: '#111827',
          card: '#171d2d',
          accent: '#f59e0b',
          sky: '#38bdf8',
          gold: '#fbbf24',
          rose: '#fb7185',
        },
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(245,158,11,0.2), 0 30px 60px rgba(14,17,28,0.45)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulseSlow: 'pulse 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
