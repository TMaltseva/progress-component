module.exports = {
  noInlineConfig: true,
  reportUnusedDisableDirectives: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:unicorn/recommended',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  plugins: ['@typescript-eslint', 'unicorn', 'import'],
  rules: {
    'no-console': 'off',
    'import/order': 'off',
    'import/no-unresolved': 'error',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
        js: 'never',
        jsx: 'never',
      },
    ],
    'import/no-cycle': 'warn',
    'class-methods-use-this': 'off',
    'default-param-last': 'off',
    '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'never' }],
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      { accessibility: 'explicit', overrides: { constructors: 'off' } },
    ],
    '@typescript-eslint/member-ordering': 'error',
    '@typescript-eslint/member-ordering': 'off',
    'unicorn/prefer-module': 'off',
    'unicorn/no-useless-undefined': [
      'error',
      {
        checkArguments: false,
      },
    ],
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    'no-template-curly-in-string': 'off',
    'no-console': ['warn', { allow: ['error', 'warn', 'info'] }],
    'no-useless-constructor': 'off',
    'no-empty-function': ['error', { allow: ['constructors'] }],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error', { functions: false, classes: false }],
    'no-void': 'off',
    'no-underscore-dangle': 'off',
    'unicorn/prevent-abbreviations': [
      'error',
      {
        allowList: {
          acc: true,
          env: true,
          i: true,
          j: true,
          props: true,
          Props: true,
          ref: true,
          Ref: true,
          args: true,
          elem: true,
          temp: true,
          tmp: true,
          id: true,
          doc: true,
        },
      },
    ],
    'unicorn/no-null': 'off',
    'unicorn/no-array-for-each': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.js', '.tsx', '.jsx'],
        paths: ['src'],
      },
      typescript: {
        alwaysTryTypes: true,
      },
      alias: {
        map: [['@', './src']],
        extensions: ['.ts', '.js', '.tsx', '.jsx'],
      },
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/extensions': ['.ts', '.js', '.tsx', '.jsx'],
  },
  overrides: [
    {
      files: ['*.ts'],
      extends: ['plugin:@typescript-eslint/recommended-requiring-type-checking'],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
    {
      files: ['src/utils/dom.utils.ts'],
      rules: {
        '@typescript-eslint/consistent-type-assertions': 'off',
      },
    },
  ],
};
