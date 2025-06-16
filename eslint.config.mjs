
import { defineConfig } from 'eslint-define-config'
import eslintJs from '@eslint/js'
import typescriptPlugin from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierRecommendedConfig from 'eslint-plugin-prettier/recommended'
import globals from 'globals'

export default defineConfig([

  {
    ...eslintJs.configs.recommended,
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    }
  },

  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],

    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
      },
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
    },
    rules: {
      ...typescriptPlugin.configs.recommended.rules,
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },

  {

    files: ['src/**/*.spec.ts', 'src/**/*.test.ts'], 

    languageOptions: {
      globals: {
        ...globals.jest,

      },
    },
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  prettierRecommendedConfig,
])