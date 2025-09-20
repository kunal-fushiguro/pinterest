/** @type {import('prettier').Config} */
module.exports = {
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "^(@tanstack/react-router/(.*)$)|^(@tanstack/react-router$)",
    "^(@tanstack/(.*)$)|^(@tanstack$)",
    "^[./]",
    "^(@tailwindcss/postcss)",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
};
