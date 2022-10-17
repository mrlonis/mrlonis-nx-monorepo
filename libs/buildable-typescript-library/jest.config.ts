/* eslint-disable */
export default {
  displayName: 'buildable-typescript-library',
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
  coverageDirectory: '../../coverage/libs/buildable-typescript-library',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'buildable-typescript-library Jest Tests',
        outputDirectory: 'junit/libs/buildable-typescript-library',
        outputName: 'junit.xml',
        uniqueOutputName: 'false',
      },
    ],
  ],
};
