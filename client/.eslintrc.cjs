module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ], 
  overrides: [],
  parserOptions: { 
    ecmaVersion: 'latest', 
    sourceType: 'module', 
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', 'react', 'react-hooks', 'jsx-a11y'],
  rules: {
    'react-refresh/only-export-components': 'warn', 
    'no-undef': 'off',
    'comma-dangle': ['error', 'always-multiline'],
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
