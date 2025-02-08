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
        'savoy-blue': '#656da4',
        'lavender-web': '#d9dbf1ff',
        ivory: '#f9f9edff',
        mindaro: '#B4E949',
        'purple-light': '#f2ebff',
        'purple-base': '#e0d1ef',
        'purple-dark': '#cec2ff'
      },
      gridTemplateColumns: {
        card: 'repeat(auto-fill, minmax(14rem, 1fr))',
        'card-mobile': 'repeat(auto-fill, minmax(12rem, 1fr))'
      }
    }
  },
  plugins: []
};
