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
  coverageDirectory: '../../coverage/libs/nx-plugin-mrlonis',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'nx-plugin-mrlonis Jest Tests',
        outputDirectory: 'junit/libs/nx-plugin-mrlonis',
        outputName: 'junit.xml',
        uniqueOutputName: 'false'
      }
    ]
  ]
};
