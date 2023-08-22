/* eslint-disable */
export default {
  displayName: 'nx-plugin-mrlonis-e2e',
  preset: '../../jest.preset.js',
  globals: {},
  transform: {
    '^.+\\.[tj]s$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json'
      }
    ]
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../test-reports/apps/nx-plugin-mrlonis-e2e/coverage'
};
