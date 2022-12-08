/* eslint-disable */
export default {
  displayName: 'nx-react-tutorial-common-ui',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/nx-react-tutorial-common-ui',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'nx-react-tutorial-common-ui Jest Tests',
        outputDirectory: 'junit/apps/nx-react-tutorial-common-ui',
        outputName: 'junit.xml',
        uniqueOutputName: 'false',
      },
    ],
  ],
};
