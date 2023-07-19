/* eslint-disable comma-dangle */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["standard", "plugin:react/recommended"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./vite.config.js",
  },
  plugins: ["react"],
  rules: {
    "comma-dangle": "off",
    semi: "off",
    quotes: "off",
    singlequote: "off",
    "multiline-ternary": "off",
    "react/react-in-jsx-scope": "off",
  },
};
