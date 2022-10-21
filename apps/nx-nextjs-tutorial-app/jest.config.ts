/* eslint-disable */
export default {
  displayName: 'nx-nextjs-tutorial-app',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nrwl/next/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/apps/nx-nextjs-tutorial-app',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'nx-nextjs-tutorial-app Jest Tests',
        outputDirectory: 'junit/apps/nx-nextjs-tutorial-app',
        outputName: 'junit.xml',
        uniqueOutputName: 'false',
      },
    ],
  ],
};
