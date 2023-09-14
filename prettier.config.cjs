/** @type {import("prettier").Config} */
const config = {
  tabWidth: 2,
  jsxSingleQuote: true,
  singleQuote: true,
  semi: true,
  bracketSameLine: false,
  plugins: [require.resolve('prettier-plugin-tailwindcss')]
};

module.exports = config;
