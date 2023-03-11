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
  coverageDirectory: '../../coverage/libs/ts-workspace',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'ts-workspace Jest Tests',
        outputDirectory: 'junit/libs/ts-workspace',
        outputName: 'junit.xml',
        uniqueOutputName: 'false'
      }
    ]
  ]
};
