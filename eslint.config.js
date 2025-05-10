import typescriptParser from "@typescript-eslint/parser";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import globals from 'globals';

export default [
    { ignores: ['dist', 'node_modules'] },
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: typescriptParser,
            globals: globals.node,
            parserOptions: {
                ecmaVersion: 'latest',
                project: './tsconfig.json',
                sourceType: 'module',
            },
        },
        plugins: {
            '@typescript-eslint': typescriptPlugin,
        },
        rules: {
            'semi': ['error', 'always'],
            'quotes': ['error', 'single'],
            "no-var": "error",
            "prefer-const": "error",
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/explicit-function-return-type': 'off',
        },
    },
];
