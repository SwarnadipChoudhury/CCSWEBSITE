/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#F7F7F2',
        'bg-warm': '#F3F2EC',
        surface: '#FFFFFF',
        'surface-2': '#FAFAF7',
        border: '#E5E7EB',
        'border-bright': '#D1D5DB',
        text: '#111827',
        'text-secondary': '#5B6472',
        'text-muted': '#9CA3AF',
        accent: '#3157D5',
        'accent-light': '#EEF2FF',
        'accent-dim': '#4F6FE0',
        teal: '#159A9C',
        'teal-light': '#E6F4F4',
        green: '#8AA63F',
        'green-light': '#F0F4E4',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-line': 'pulse-line 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
