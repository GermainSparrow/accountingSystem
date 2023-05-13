
module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'node': true
  },
  'extends': [
    'eslint:recommended'
  ],
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'rules': {
    'semi': ['error', 'always'],
    'quotes': ['error', 'single'],
    'indent': ['error', 2],
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'no-debugger': 'error',
    'no-undef': 'error',
    'no-multiple-empty-lines': ['error', { 'max': 2 }],
    'no-trailing-spaces': 'error',
    'comma-dangle': ['error', 'never'],
    'eol-last': ['error', 'always'],
    'no-var': 'error',
    'prefer-const': 'error',
    'no-const-assign': 'error',
    'arrow-parens': ['error', 'as-needed'],
    'arrow-spacing': ['error', { 'before': true, 'after': true }],
    'object-curly-spacing': ['error', 'always']
  }
};
