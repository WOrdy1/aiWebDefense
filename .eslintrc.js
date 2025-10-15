// module.exports = {
//   root: true,
//   extends: '@react-native',
// };
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    '@react-native-community',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'import'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  rules: {
    'react/react-in-jsx-scope': 'off', // React 17+ не требует import React
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/func-call-spacing': 'off',
    'import/order': ['off'],
  },
  settings: {
    react: { version: 'detect' },
  },
};
