import { defineConfig } from "eslint/config";
import typescriptParser from "@typescript-eslint/parser";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";

export default defineConfig([
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                project: './tsconfig.json',
                sourceType: 'module',
            },
        },
        plugins: {
            '@typescript-eslint': typescriptPlugin,
        },
        rules: {
            semi: "error",
            "prefer-const": "error",
        },
    },
]);
