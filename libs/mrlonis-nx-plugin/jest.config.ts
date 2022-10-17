/* eslint-disable */
export default {
  displayName: 'mrlonis-nx-plugin',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/libs/mrlonis-nx-plugin',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'mrlonis-nx-plugin Jest Tests',
        outputDirectory: 'junit/libs/mrlonis-nx-plugin',
        outputName: 'junit.xml',
        uniqueOutputName: 'false',
      },
    ],
  ],
};
