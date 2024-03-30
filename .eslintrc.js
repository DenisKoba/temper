module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/eslint-config-prettier',
    'plugin:vue/recommended',
    'plugin:prettier-vue/recommended',
  ],
  plugins: ['import', 'prettier'],
  ignorePatterns: ['src/core/gql/**/*.gen.ts'],
  rules: {
    'vue/multi-word-component-names': 0,
    quotes: [
      'error',
      'single',
      { avoidEscape: true, allowTemplateLiterals: true },
    ],
    'import/order': [
      1,
      {
        pathGroups: [
          {
            pattern: '@/**',
            group: 'internal',
          },
        ],
        groups: ['external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'no-debugger': 'warn',
    'prettier/prettier': ['error', { singleQuote: true }],
    '@typescript-eslint/no-non-null-assertion': 'off',
    'vue/no-multiple-template-root': 0,
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
