module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true
    }
  },
  plugins: [
    '@typescript-eslint'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  // no-undef should not be used for Typescript files, this is for TypeScript to handle
  // https://typescript-eslint.io/docs/linting/troubleshooting/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
  overrides: [
    {
      files: [ '*.ts', '*.tsx' ],
      rules: {
        'no-undef': 'off'
      }
    }
  ],
  rules: {
    '@typescript-eslint/indent': [
      'error',
      2,
      { 'SwitchCase': 1 }
    ],
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-empty-interface': 'off', // Interfaces are apparently faster and recommended
    '@typescript-eslint/no-floating-promises': 'warn',
    '@typescript-eslint/no-inferrable-types': 'warn',
    '@typescript-eslint/no-this-alias': 'off',
    '@typescript-eslint/no-redeclare': 'error',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        'ignoreRestSiblings': true
      }
    ],
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-useless-constructor': 'error',
    'arrow-spacing': [
      'error',
      {
        'before': true,
        'after': true
      }
    ],
    'comma-spacing': [ 'warn', { 'before': false, 'after': true } ],
    'computed-property-spacing': 'error',
    'eol-last': [
      'error',
      'always'
    ],
    'eqeqeq': 'error',
    'keyword-spacing': 'error',
    'key-spacing': [ 'warn', { 'beforeColon': false, 'afterColon': true } ],
    'no-duplicate-imports': 'error',
    'no-else-return': [
      'error',
      {
        'allowElseIf': true
      }
    ],
    'no-empty': 'error',
    'no-multiple-empty-lines': [ 'warn', { 'max': 1 } ],
    'no-multi-spaces': 'error',
    'no-trailing-spaces': 'error',
    'no-param-reassign': 'warn',
    'no-restricted-imports': [ 'error', {
      // While this does undoubtedly look horrible, it does the job.
      'paths': [
        '.',
        '..',
        '../..',
        '../../..',
        '../../../..',
        '../../../../..',
        '../../../../../..',
        '../../../../../../../',
        '../../../../../../../../',
        '../../../../../../../../../',
        '../../../../../../../../../../'
      ]
    } ],
    // TypeScript version enabled
    'no-shadow': 'off',
    'no-unused-vars': 'off',
    'no-useless-constructor': 'off',
    'no-useless-escape': 'warn',
    'no-useless-rename': 'error',
    'no-useless-return': 'error',
    'no-use-before-define': 'off',
    'no-redeclare': 'off',
    'object-curly-spacing': [
      'error',
      'always'
    ],
    'object-shorthand': 'error',
    'prefer-const': 'error',
    'prefer-template': 'warn',
    'quotes': [ 'warn', 'single', { 'allowTemplateLiterals': true, 'avoidEscape': true } ],
    // TODO: Phase warning over to an error
    'require-await': 'warn',
    'semi': [
      'error',
      'always'
    ],
    'space-before-blocks': 'error',
    'space-before-function-paren': [
      'error',
      {
        'anonymous': 'never',
        'named': 'never',
        'asyncArrow': 'always'
      }
    ],
    'space-infix-ops': 'error'
  },
};
