/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand palette
        bg: {
          DEFAULT: '#0a0a0a',
          secondary: '#111111',
          raised: '#1a1a1a',
          hover: '#1f1f1f',
        },
        border: {
          DEFAULT: '#222222',
          light: '#2a2a2a',
          accent: '#3a3220',
        },
        text: {
          primary: '#f0ece4',
          secondary: '#b8b0a8',
          muted: '#8a8580',
          faint: '#4a4540',
        },
        accent: {
          DEFAULT: '#c8a97e',
          dark: '#a0845a',
          light: '#dfc49f',
          faint: 'rgba(200, 169, 126, 0.1)',
        },
        status: {
          available: '#4a7c59',
          sold: '#7c4a4a',
          reserved: '#7c6a4a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3.5rem, 8vw, 8rem)', { lineHeight: '0.92', letterSpacing: '-0.04em' }],
        'display-lg': ['clamp(2.5rem, 5vw, 5.5rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(2rem, 3.5vw, 3.5rem)', { lineHeight: '1.0', letterSpacing: '-0.025em' }],
        'display-sm': ['clamp(1.5rem, 2.5vw, 2.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'none': '0',
        DEFAULT: '2px',
        'sm': '4px',
        'md': '6px',
        'lg': '10px',
        'xl': '16px',
      },
      boxShadow: {
        'accent': '0 0 40px rgba(200, 169, 126, 0.08)',
        'card': '0 2px 40px rgba(0, 0, 0, 0.4)',
        'elevated': '0 8px 60px rgba(0, 0, 0, 0.6)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'accent-glow': 'radial-gradient(ellipse at center, rgba(200,169,126,0.12) 0%, transparent 70%)',
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'fade-up': 'fadeUp 0.6s ease forwards',
        'counter': 'counter 2s ease forwards',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
