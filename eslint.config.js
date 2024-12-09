const nxEslintPlugin = require('@nx/eslint-plugin');
const js = require('@eslint/js');
const jsoncParser = require('jsonc-eslint-parser');
const eslintConfigPrettier = require('eslint-config-prettier');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const tseslint = require('typescript-eslint');
const nxTsConfig = require('@nx/eslint-plugin/typescript');
const pluginJest = require('eslint-plugin-jest');
const importPlugin = require('eslint-plugin-import');

module.exports = [
  { plugins: { '@nx': nxEslintPlugin } },
  {
    files: ['*.json', '*.json5', '.prettierrc'],
    languageOptions: {
      parser: jsoncParser
    },
    extends: [eslintConfigPrettier, eslintPluginPrettierRecommended],
    rules: {}
  },
  {
    files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
    extends: [js.configs.recommended, eslintConfigPrettier, eslintPluginPrettierRecommended],
    plugins: { '@nx': nxEslintPlugin },
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*']
            }
          ]
        }
      ]
    }
  },
  {
    files: ['*.ts', '*.tsx'],
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      nxTsConfig.configs.typescript,
      importPlugin.flatConfigs?.recommended,
      eslintConfigPrettier,
      eslintPluginPrettierRecommended
    ],
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: '.'
      }
    },
    rules: {
      '@typescript-eslint/no-deprecated': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_'
        }
      ],
      'import/newline-after-import': ['error', { count: 1 }],
      'import/no-absolute-path': 'error',
      'import/no-cycle': 'error',
      'import/no-deprecated': 'error',
      'import/no-self-import': 'error',
      'import/no-unresolved': 'error',
      'import/no-useless-path-segments': [
        'error',
        {
          noUselessIndex: true,
          commonjs: true
        }
      ],
      'import/order': [
        'error',
        {
          alphabetize: {
            order: 'asc',
            caseInsensitive: false
          },
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'never'
        }
      ]
    }
  },
  {
    files: ['*.js', '*.jsx'],
    extends: [
      nxTsConfig.configs.javascript,
      importPlugin.flatConfigs?.recommended,
      eslintConfigPrettier,
      eslintPluginPrettierRecommended
    ],
    rules: {
      'import/newline-after-import': ['error', { count: 1 }],
      'import/no-absolute-path': 'error',
      'import/no-cycle': 'error',
      'import/no-deprecated': 'error',
      'import/no-self-import': 'error',
      'import/no-unresolved': 'error',
      'import/no-useless-path-segments': [
        'error',
        {
          noUselessIndex: true,
          commonjs: true
        }
      ],
      'import/order': [
        'error',
        {
          alphabetize: {
            order: 'asc',
            caseInsensitive: false
          },
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'never'
        }
      ]
    }
  },
  {
    // update this to match your test files
    files: ['*.spec.ts', '*.spec.tsx', '*.spec.js', '*.spec.jsx'],
    plugins: { jest: pluginJest },
    languageOptions: {
      globals: pluginJest.environments.globals.globals
    },
    rules: {
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error'
    }
  },
  {
    ignores: ['apps/ngx-ui-personal-website/src/assets/old-git-repo']
  }
];
