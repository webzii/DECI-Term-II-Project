module.exports = {
    parser: `@typescript-eslint/parser`,
    extends: [
        `plugin:@typescript-eslint/recommended`,
        `prettier`,
        `plugin:jasmine/recommended`,
    ],
    plugins: [`@typescript-eslint`, `jasmine`],
    env: {
        node: true,
    },
    globals: {
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
    },
};
