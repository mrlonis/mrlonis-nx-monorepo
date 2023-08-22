/* eslint-disable */
export default {
  displayName: 'nx-angular-tutorial-data',
  preset: '../../jest.preset.js',
  globals: {},
  transform: {
    '^.+\\.[tj]sx?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json'
      }
    ]
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../test-reports/libs/nx-angular-tutorial-data/coverage',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'nx-angular-tutorial-data Jest Tests',
        outputDirectory: 'test-reports/libs/nx-angular-tutorial-data/junit',
        outputName: 'junit.xml',
        uniqueOutputName: 'false'
      }
    ]
  ]
};
