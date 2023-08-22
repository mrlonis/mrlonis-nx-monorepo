/* eslint-disable */
export default {
  displayName: 'ts-workspace',
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
  coverageDirectory: '../../test-reports/libs/ts-workspace/coverage',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'ts-workspace Jest Tests',
        outputDirectory: 'test-reports/libs/ts-workspace/junit',
        outputName: 'junit.xml',
        uniqueOutputName: 'false'
      }
    ]
  ]
};
