module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
    allowImportExportEverywhere: true,
  },
  extends: ['prettier', 'plugin:prettier/recommended'],
  plugins: ['prettier', 'jest-dom'],
}
