/* eslint-disable */
export default {
  displayName: 'nx-angular-tutorial-api',
  preset: '../../jest.preset.js',
  globals: {},
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json'
      }
    ]
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../test-reports/apps/nx-angular-tutorial-api/coverage',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'nx-angular-tutorial-api Jest Tests',
        outputDirectory: 'test-reports/apps/nx-angular-tutorial-api/junit',
        outputName: 'junit.xml',
        uniqueOutputName: 'false'
      }
    ]
  ]
};
