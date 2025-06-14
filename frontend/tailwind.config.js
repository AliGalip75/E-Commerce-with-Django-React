/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Bu olmadan dark mode çalışmaz
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Eğer sadece JS kullanıyorsan tsx çıkarabilirsin
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
