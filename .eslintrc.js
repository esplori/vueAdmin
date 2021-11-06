module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    // 0：off,1: warning, 2: error
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'semi': 0,
    'space-before-function-paren': 0,
    'comma-dangle': 0,
    'quotes': 0,
    'no-undef': 1,
    'prefer-const': 0,
    'camelcase': 0
  }
}
