/* eslint-disable */
export default {
  displayName: 'nx-react-tutorial-store',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/react/babel'] }]
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../test-reports/apps/nx-react-tutorial-store/coverage',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'nx-react-tutorial-store Jest Tests',
        outputDirectory: 'test-reports/apps/nx-react-tutorial-store/junit',
        outputName: 'junit.xml',
        uniqueOutputName: 'false'
      }
    ]
  ]
};
