/* eslint-disable */
export default {
  displayName: 'nx-react-tutorial-products',
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
  coverageDirectory: '../../test-reports/libs/nx-react-tutorial-products/coverage',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'nx-react-tutorial-products Jest Tests',
        outputDirectory: 'test-reports/apps/nx-react-tutorial-products/junit',
        outputName: 'junit.xml',
        uniqueOutputName: 'false'
      }
    ]
  ]
};
