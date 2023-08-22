/* eslint-disable */
export default {
  displayName: 'nx-express-tutorial-api',
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
  coverageDirectory: '../../test-reports/apps/nx-express-tutorial-api/coverage',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'nx-express-tutorial-api Jest Tests',
        outputDirectory: 'test-reports/apps/nx-express-tutorial-api/junit',
        outputName: 'junit.xml',
        uniqueOutputName: 'false'
      }
    ]
  ]
};
