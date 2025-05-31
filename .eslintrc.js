import tsEslintPlugin from '@typescript-eslint/eslint-plugin'

export default {
    env: {
        node: true,
        es2021: true,
        browser: true,
        jasmine: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        project: './tsconfig.json',
        tsConfigRootDir: __dirname
    },
    plugins: [
        tsEslintPlugin
    ],
    rules: {
        '@typescript-eslint/explicit-function-return-type': 'warn',
        '@typescript-eslint/explicit-module-boundary-types': 'warn',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-unused-vars': ['warn', {argsIgnorePattern: '^_'}],
        '@typescript-eslint/consistent-type-imports': 'warn',
        'no-constant-condition': ['error', {checkLoops: false}],
        'no-console': 'warn',
        'no-debugger': 'error',
        'no-duplicate-imports': 'error',
        'prefer-const': 'error',
        'arrow-body-style': ['warn', 'as-needed'],
        'array-callback-return': 'error',
        'no-await-in-loop': 'error',
        'no-promise-executor-return': 'error',
        'require-atomic-updates': 'error'
    },
    overrides: [
        {
            files: ['**/*.test.ts', '**/*.spec.ts', '**/*[sS]pec.ts', '**/*[tT]est.ts', '*.test.ts', '*.spec.ts', '*[sS]pec.ts', '*[tT]est.ts'],
            rules: {
                '@typescript-eslint/no-non-null-assertions': 'off',
                '@typescript-eslint/no-explicit-any': 'off'
            }
        }
    ]
}