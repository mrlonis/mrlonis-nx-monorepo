/* eslint-disable */
export default {
  displayName: 'nx-react-tutorial-common-ui',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../test-reports/libs/nx-react-tutorial-common-ui/coverage',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'nx-react-tutorial-common-ui Jest Tests',
        outputDirectory: 'test-reports/apps/nx-react-tutorial-common-ui/junit',
        outputName: 'junit.xml',
        uniqueOutputName: 'false'
      }
    ]
  ]
};
