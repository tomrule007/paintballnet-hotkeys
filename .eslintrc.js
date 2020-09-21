module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ['standard', 'prettier'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: { 'prettier/prettier': ['error'] },
};
