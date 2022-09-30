/* eslint-disable */
export default {
  displayName: 'types-mrlonis',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/types-mrlonis',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'types-mrlonis Jest Tests',
        outputDirectory: 'junit/libs/types-mrlonis',
        outputName: 'junit.xml',
        uniqueOutputName: 'false',
      },
    ],
  ],
};
