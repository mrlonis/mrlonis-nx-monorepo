/* eslint-disable */
export default {
  displayName: 'nx-nextjs-tutorial-app',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/next/babel'] }]
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../test-reports/apps/nx-nextjs-tutorial-app/coverage',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'nx-nextjs-tutorial-app Jest Tests',
        outputDirectory: 'test-reports/apps/nx-nextjs-tutorial-app/junit',
        outputName: 'junit.xml',
        uniqueOutputName: 'false'
      }
    ]
  ]
};
