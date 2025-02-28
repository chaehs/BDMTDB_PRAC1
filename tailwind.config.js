/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,vue}"
  ],
  theme: {
    extend: {
      colors: {
        'skill-bg': '#FF6B6B',
        'skill-text': '#333333',
        'gender-bg': '#4ECDC4',
        'gender-text': '#34495E',
        'age-bg': '#45B7D1',
        'age-text': '#2C3E50',
        'handedness-bg': '#9B59B6',
        'handedness-text': '#D1D1D1',
      }
    }
  },
  plugins: [],
}
