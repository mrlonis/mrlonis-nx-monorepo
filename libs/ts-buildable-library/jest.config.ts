/* eslint-disable */
export default {
  displayName: 'ts-buildable-library',
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
  coverageDirectory: '../../test-reports/libs/ts-buildable-library/coverage',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'ts-buildable-library Jest Tests',
        outputDirectory: 'test-reports/libs/ts-buildable-library/junit',
        outputName: 'junit.xml',
        uniqueOutputName: 'false'
      }
    ]
  ]
};
