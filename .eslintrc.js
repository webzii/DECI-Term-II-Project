/* eslint-env node */
module.exports = {
    env: {
        browser: true,        // For frontend files like public/script.js
        node: true,           // For Node.js files like server.ts
        es2021: true,
        jest: true            // For test files using describe, it, expect
    },
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    rules: {
        '@typescript-eslint/no-explicit-any': 'warn',
        'no-unused-vars': 'warn',
        'no-undef': 'off', // Disable if env handles globals correctly
    }
};
