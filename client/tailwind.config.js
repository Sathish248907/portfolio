/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // --- 1. Core Corporate Redesign Palette ---
        charcoal: {
          950: '#0F171D',
          900: '#17232B', // Deep Charcoal Navy
          850: '#1C2B35',
          800: '#223440',
          700: '#2B404E',
          600: '#385263',
          DEFAULT: '#17232B',
        },
        teal: {
          900: '#182427',
          800: '#233337',
          700: '#344B50', // Muted Teal (Primary Accent)
          600: '#415D63',
          500: '#52747C',
          400: '#688E96',
          300: '#8FB0B7',
          200: '#BDCFD3',
          100: '#E4EBED',
          50: '#F2F6F7',
          DEFAULT: '#344B50',
        },
        sage: {
          900: '#2F3632',
          800: '#444D48',
          700: '#5F6B64',
          600: '#7E8C84',
          500: '#A8B5AE', // Sage Grey (Borders & Dividers)
          400: '#BAC5BF',
          300: '#CCD5D0',
          200: '#DFE5E1',
          100: '#EFF2F0',
          50: '#F7F9F8',
          DEFAULT: '#A8B5AE',
        },
        warm: {
          900: '#3F3B33',
          800: '#5F5A4E',
          700: '#7F7869',
          500: '#ADA492',
          400: '#C7C1B2',
          300: '#DBD7CC',
          200: '#E8E5DC', // Warm Off-White (Main Light Background)
          100: '#F4F2EC', // Soft Neutral Tint
          50: '#FAF9F6',
          DEFAULT: '#E8E5DC',
        },
        champagne: {
          900: '#433725',
          800: '#67553A',
          700: '#8D7551',
          600: '#A98E64',
          500: '#C4A77D', // Muted Champagne (Secondary Accent)
          400: '#D2BC99',
          300: '#E1D1B8',
          200: '#EFE6D8',
          100: '#F7F2EB',
          50: '#FBFAF7',
          DEFAULT: '#C4A77D',
        },
        slate: {
          900: '#242C2D',
          800: '#364143',
          700: '#4E5B5D',
          600: '#68777A', // Slate Grey (Secondary Text)
          500: '#7F8E91',
          400: '#99A7AA',
          300: '#B6C1C3',
          200: '#D3DCDE',
          100: '#ECF1F2',
          DEFAULT: '#68777A',
        },

        // --- Backwards Compatibility Mappings (Safely remapped to the new palette) ---
        navy: {
          950: '#17232B', // Deep Charcoal Navy
          900: '#1C2B35',
          850: '#223440',
          800: '#2B404E',
          750: '#344B50',
          700: '#385263',
          600: '#415D63',
        },
        electric: {
          300: '#BDCFD3',
          400: '#688E96',
          500: '#415D63',
          600: '#344B50', // Re-mapped to Muted Teal
          700: '#283C40',
          800: '#1E2D30',
        },
        cyan: {
          100: '#F7F2EB',
          200: '#EFE6D8',
          300: '#D2BC99',
          400: '#C4A77D', // Re-mapped to Muted Champagne
          500: '#344B50', // Re-mapped to Muted Teal
          600: '#283C40',
        },
        accent: {
          teal: '#344B50',
          emerald: '#52747C',
          purple: '#C4A77D',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', 'Manrope', 'system-ui', 'sans-serif'],
        editorial: ['"Plus Jakarta Sans"', 'Manrope', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-subtle': 'radial-gradient(circle at 50% 0%, rgba(52, 75, 80, 0.25) 0%, rgba(23, 35, 43, 0.8) 70%)',
        'grid-pattern': 'linear-gradient(to right, rgba(168, 181, 174, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(168, 181, 174, 0.08) 1px, transparent 1px)',
        'subtle-grid': 'linear-gradient(to right, rgba(104, 119, 122, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(104, 119, 122, 0.08) 1px, transparent 1px)',
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(23, 35, 43, 0.04), 0 1px 3px rgba(23, 35, 43, 0.06)',
        'card': '0 10px 30px -10px rgba(23, 35, 43, 0.08), 0 1px 3px rgba(23, 35, 43, 0.04)',
        'card-hover': '0 20px 40px -15px rgba(23, 35, 43, 0.16), 0 4px 12px -2px rgba(23, 35, 43, 0.08)',
        'card-dark': '0 12px 36px -8px rgba(0, 0, 0, 0.45)',
        'card-dark-hover': '0 20px 48px -10px rgba(0, 0, 0, 0.65)',
        'glass': '0 8px 32px 0 rgba(15, 23, 29, 0.35)',
        'neon-cyan': '0 2px 14px rgba(196, 167, 125, 0.2)', // Understated champagne glow replacement
        'neon-blue': '0 2px 14px rgba(52, 75, 80, 0.25)', // Understated teal glow replacement
      },
      animation: {
        'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
}
