/* eslint-disable */
export default {
  displayName: 'nx-react-tutorial-store',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nrwl/react/babel'] }]
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/apps/nx-react-tutorial-store',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'nx-react-tutorial-store Jest Tests',
        outputDirectory: 'junit/apps/nx-react-tutorial-store',
        outputName: 'junit.xml',
        uniqueOutputName: 'false'
      }
    ]
  ]
};
