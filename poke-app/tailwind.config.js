const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit", // Just -in-Time Mode 必要に応じてスタイルを反映するモード
  content: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'main-color01': '#d1dfe3',
      },
    },
  },
  purge: [ // ビルド生成時の未使用のスタイルを除外し、パフォーマンスを最適化
    // "./src/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [
    // `@tailwindcss/aspect-ratio`を有効にする
    require('@tailwindcss/aspect-ratio'),
  ],
}
