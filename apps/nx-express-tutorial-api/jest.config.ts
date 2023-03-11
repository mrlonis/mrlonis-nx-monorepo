/* eslint-disable */
export default {
  displayName: 'nx-express-tutorial-api',
  preset: '../../jest.preset.js',
  globals: {},
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json'
      }
    ]
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/nx-express-tutorial-api',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'nx-express-tutorial-api Jest Tests',
        outputDirectory: 'junit/apps/nx-express-tutorial-api',
        outputName: 'junit.xml',
        uniqueOutputName: 'false'
      }
    ]
  ]
};
