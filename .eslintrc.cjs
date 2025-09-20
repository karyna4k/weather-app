/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/no-v-html': 'off',
    'vue/max-attributes-per-line': 'error',
    'import/no-extraneous-dependencies': 'off',
    'import/extensions': 'off',
    'no-undef': 'off',
    'no-spaced-func': 'off',
    'func-call-spacing': 'off',
    'no-plusplus': 'off',
    'implicit-arrow-linebreak': 'off',
    'no-bitwise': 'off',
    'no-shadow': 'off',
    'no-console': 'warn',
    camelcase: 'warn',
    'function-paren-newline': ['error', 'multiline-arguments'],
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'lines-between-class-members': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-var-requires': 0,
    'max-len': [
      'error',
      200,
      2,
      {
        ignoreUrls: true,
        ignoreComments: false,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'no-use-before-define': ['error', { functions: false }],
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsForRegex: ['^mut[A-Z]'],
        ignorePropertyModificationsFor: [
          'acc',
          'accumulator',
          'element',
          'el',
          'state',
          'e',
        ],
      },
    ],
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: { consistent: true, multiline: true },
        ObjectPattern: { consistent: true, multiline: true },
      },
    ],
  },
};
