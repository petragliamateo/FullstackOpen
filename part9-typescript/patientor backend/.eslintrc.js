module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: 'standard-with-typescript',
  overrides: [
  ],
  rules: {
    '@typescript-eslint/semi': ['error'],
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-unused-vars': [
      'error', { argsIgnorePattern: '^_' }
    ],
    '@typescript-eslint/no-explicit-any': 1,
    'no-case-declarations': 0
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json'
  }
}
