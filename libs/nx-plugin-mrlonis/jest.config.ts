/* eslint-disable */
export default {
  displayName: 'nx-plugin-mrlonis',
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
  coverageDirectory: '../../test-reports/libs/nx-plugin-mrlonis/coverage',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'nx-plugin-mrlonis Jest Tests',
        outputDirectory: 'test-reports/libs/nx-plugin-mrlonis/junit',
        outputName: 'junit.xml',
        uniqueOutputName: 'false'
      }
    ]
  ]
};
