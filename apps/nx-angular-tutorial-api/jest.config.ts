/* eslint-disable */
export default {
  displayName: 'nx-angular-tutorial-api',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json'
    }
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/nx-angular-tutorial-api',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'nx-angular-tutorial-api Jest Tests',
        outputDirectory: 'junit/apps/nx-angular-tutorial-api',
        outputName: 'junit.xml',
        uniqueOutputName: 'false'
      }
    ]
  ]
};
