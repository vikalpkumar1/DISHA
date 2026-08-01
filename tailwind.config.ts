import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      colors: {
        // Brand tokens — royal blue / emerald / amber on near-black or slate-50
        bg: {
          dark: '#09090B',
          light: '#F8FAFC',
        },
        brand: {
          blue: '#2563EB',
          emerald: '#10B981',
          amber: '#F59E0B',
        },
      },
      borderRadius: {
        card: '20px',
        pill: '999px',
      },
      backdropBlur: {
        glass: '18px',
      },
    },
  },
  plugins: [],
};

export default config;
