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
            'libs/ts-workspace/tsconfig.json',
            'libs/ts-workspace/tsconfig.lib.json',
            'libs/ts-workspace/tsconfig.spec.json'
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
    rules: {}
  }
];
