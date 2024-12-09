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
          project: ['libs/types/tsconfig.json', 'libs/types/tsconfig.lib.json', 'libs/types/tsconfig.spec.json']
        }
      }
    },
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: '.'
      }
    },
    rules: {}
  }
];
