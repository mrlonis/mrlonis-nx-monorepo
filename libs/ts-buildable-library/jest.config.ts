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
  coverageDirectory: '../../coverage/libs/ts-buildable-library',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'ts-buildable-library Jest Tests',
        outputDirectory: 'junit/libs/ts-buildable-library',
        outputName: 'junit.xml',
        uniqueOutputName: 'false'
      }
    ]
  ]
};
