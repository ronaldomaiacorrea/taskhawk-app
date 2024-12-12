import pluginJs from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}']},
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      '@stylistic': stylistic,
      import: importPlugin,
    },
  },
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
      'arrow-body-style': ['error', 'as-needed'],
      'capitalized-comments': [
        'error',
        'always',
        { ignoreConsecutiveComments: true },
      ],
      curly: 'error',
      'default-case': 'error',
      'no-console': ['error', { allow: ['error']}],
      'sort-imports': 'off',
      'import/order': [
        'error',
        {
          groups: [
            ['builtin', 'external'], // Built-in and external modules
            'internal', // Internal modules (e.g., @common)
            ['parent', 'sibling', 'index'], // Relative imports
            'type', // Type imports
          ],
          pathGroups: [
            {
              pattern: '@common/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@hooks/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@utils/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@constants/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@queries/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@context/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@features/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@shared/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@api/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@layout/**',
              group: 'internal',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['react'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'sort-vars': ['error', { ignoreCase: true }],
      '@stylistic/object-curly-spacing': [
        'error',
        'always',
        { arraysInObjects: false },
      ],
    },
  },
];
