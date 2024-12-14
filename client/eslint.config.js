import pluginJs from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
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
      'no-console': ['error', { allow: ['error'] }],
      'sort-imports': 'off',
      'sort-vars': ['error', { ignoreCase: true }],
    },
  },
];
