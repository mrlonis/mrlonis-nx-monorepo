/* eslint-disable */
export default {
  displayName: 'nx-react-tutorial-admin',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/react/babel'] }]
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../test-reports/apps/nx-react-tutorial-admin/coverage',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'nx-react-tutorial-admin Jest Tests',
        outputDirectory: 'test-reports/apps/nx-react-tutorial-admin/junit',
        outputName: 'junit.xml',
        uniqueOutputName: 'false'
      }
    ]
  ]
};
