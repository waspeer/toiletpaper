module.exports = {
  extends: ['./node_modules/poetic/config/eslint/eslint-config.js'],
  // Add custom rules here
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/camelcase': ['error', { properties: 'never' }],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
    'comma-dangle': ['warn', 'always-multiline'],
    'import/prefer-default-export': 'off',
    'no-console': 'off',
    'no-empty-function': 'off',
    'no-use-before-define': ['off'],
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/*.test.tsx', '**/test/**/*'] },
    ],
    'no-useless-constructor': 'off',
    semi: ['warn', 'always'],
    'object-curly-spacing': ['warn', 'always'],
    quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: false }],
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
