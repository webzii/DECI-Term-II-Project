import eslintPluginTs from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'

export default [
    {
        ignores: ['starter/dist/**'], // Optional: ignore compiled files
    },
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
        parser: tsParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        globals: {
            console: 'readonly',
            document: 'readonly',
            window: 'readonly',
            alert: 'readonly',
            fetch: 'readonly',
            FormData: 'readonly',
            __dirname: 'readonly',
            require: 'readonly',
            exports: 'readonly',
            describe: 'readonly',
            it: 'readonly',
            expect: 'readonly',
            beforeAll: 'readonly',
            afterAll: 'readonly',
            beforeEach: 'readonly',
            afterEach: 'readonly',
        },
    },
    plugins: {
        '@typescript-eslint': eslintPluginTs,
    },
    rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        'no-unused-vars': 'off',
        'no-undef': 'off',
        'require-yield': 'off',
        },
    },
]
