/* eslint-disable */
export default {
  displayName: 'nx-react-tutorial-admin',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nrwl/react/babel'] }]
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/apps/nx-react-tutorial-admin',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'nx-react-tutorial-admin Jest Tests',
        outputDirectory: 'junit/apps/nx-react-tutorial-admin',
        outputName: 'junit.xml',
        uniqueOutputName: 'false'
      }
    ]
  ]
};
