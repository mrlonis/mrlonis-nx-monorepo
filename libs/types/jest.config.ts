/* eslint-disable */
export default {
  displayName: 'types',
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
  coverageDirectory: '../../coverage/libs/types',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'types Jest Tests',
        outputDirectory: 'junit/libs/types',
        outputName: 'junit.xml',
        uniqueOutputName: 'false'
      }
    ]
  ]
};
