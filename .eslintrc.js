module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ["airbnb-typescript", "prettier/@typescript-eslint"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {},
};
