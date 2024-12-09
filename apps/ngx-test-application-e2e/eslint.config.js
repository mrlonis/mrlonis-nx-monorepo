const baseConfig = require('../../eslint.config.js');
const cypressPlugin = require('eslint-plugin-cypress/flat');
const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
const eslintConfigPrettier = require('eslint-config-prettier');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const importPlugin = require('eslint-plugin-import');
const nxTsConfig = require('@nx/eslint-plugin/typescript');

module.exports = [
  ...baseConfig,
  {
    files: ['*.ts', '*.tsx'],
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx']
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: ['apps/ngx-test-application-e2e/tsconfig.json']
        }
      }
    },
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: '.'
      }
    },
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      nxTsConfig.configs.typescript,
      importPlugin.flatConfigs.recommended,
      eslintConfigPrettier,
      eslintPluginPrettierRecommended
    ],
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
  cypressPlugin.configs.recommended
];
