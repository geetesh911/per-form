// @ts-check

import { fixupPluginRules } from '@eslint/compat';
// @ts-ignore
import pluginCypress from 'eslint-plugin-cypress/flat';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import reactPlugin from 'eslint-plugin-react';
// @ts-ignore
import reactHookPlugin from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    {
        ignores: [
            'app',
            'examples',
            'node_modules',
            'dist',
            'coverage',
            'src/types/global.d.ts',
            '!.*.js',
            'reports',
            'scripts/README',
        ],
    },
    // @ts-ignore
    reactPlugin.configs.flat.recommended,
    ...tseslint.configs.recommended,
    eslintPluginPrettierRecommended,
    pluginCypress.configs.recommended,
    {
        plugins: {
            // @ts-ignore
            'react-hooks': fixupPluginRules(reactHookPlugin),
            'simple-import-sort': simpleImportSort,
        },
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: 'module',
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        settings: {
            react: {
                pragma: 'React',
                version: 'detect',
            },
        },
        rules: {
            curly: 'error',
            'no-extra-boolean-cast': 'error',
            'cypress/unsafe-to-chain-command': 'off',
            '@typescript-eslint/no-non-null-assertion': 'off',
            '@typescript-eslint/no-empty-function': 'off',
            '@typescript-eslint/ban-ts-comment': 'warn',
            '@typescript-eslint/ban-types': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-unused-vars': ['warn', { ignoreRestSiblings: true }],
            '@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
            'cypress/no-unnecessary-waiting': 'off',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'error',
            'react/display-name': 'warn',
            'react/prop-types': 'off',
            'no-console': ['error'],
            'simple-import-sort/imports': [
                'error',
                {
                    groups: [
                        // Side effect imports.
                        ['^\\u0000'],
                        // Packages. `react` related packages come first.
                        ['^react', '^@?\\w'],
                        // Parent imports. Put `..` last.
                        ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                        // Other relative imports. Put same-folder imports and `.` last.
                        ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                    ],
                },
            ],
            'simple-import-sort/exports': 'error',
            'prettier/prettier': [
                'error',
                {
                    endOfLine: 'auto',
                    printWidth: 100,
                    tabWidth: 4,
                },
            ],
        },
    },
    {
        files: ['*.test.ts', '*.test.tsx'],
        rules: {
            // Allow testing runtime errors to suppress TS errors
            '@typescript-eslint/ban-ts-comment': 'off',
        },
    },
);
