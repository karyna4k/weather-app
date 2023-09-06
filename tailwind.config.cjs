/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem'
      }
    },
    extend: {
      colors: {
        dark: '#094067',
        primary: '#fffffe',
        secondary: '#90b4ce',
        'accent-blue': '#3da9fc',
        'accent-red': '#ef4565'
      },
      gridTemplateColumns: {
        card: 'repeat(auto-fill, minmax(14rem, 1fr))',
        'card-mobile': 'repeat(auto-fill, minmax(12rem, 1fr))'
      }
    }
  },
  plugins: []
};
