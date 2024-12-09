const js = require('@eslint/js');
const nxAngular = require('@nx/eslint-plugin/angular');
const angular = require('angular-eslint');
const eslintConfigPrettier = require('eslint-config-prettier');
const importPlugin = require('eslint-plugin-import');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const tseslint = require('typescript-eslint');
const baseConfig = require('../../eslint.config.js');

module.exports = [
  ...baseConfig,
  {
    files: ['*.ts'],
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx']
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: [
            'apps/ngx-table-virtual-scroll-sticky-headers/tsconfig.app.json',
            'apps/ngx-table-virtual-scroll-sticky-headers/tsconfig.editor.json',
            'apps/ngx-table-virtual-scroll-sticky-headers/tsconfig.json',
            'apps/ngx-table-virtual-scroll-sticky-headers/tsconfig.spec.json'
          ]
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
      ...angular.configs.tsRecommended,
      nxAngular.configs.angular,
      importPlugin.flatConfigs?.recommended,
      eslintConfigPrettier,
      eslintPluginPrettierRecommended
    ],
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'mrlonis',
          style: 'camelCase'
        }
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'mrlonis',
          style: 'kebab-case'
        }
      ]
    }
  },
  {
    files: ['*.html'],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
      nxAngular.configs['angular-template'],
      eslintConfigPrettier,
      eslintPluginPrettierRecommended
    ],
    rules: {
      '@angular-eslint/template/no-duplicate-attributes': 'error',
      '@angular-eslint/template/prefer-control-flow': 'error',
      '@angular-eslint/template/prefer-self-closing-tags': 'error'
    }
  }
];
