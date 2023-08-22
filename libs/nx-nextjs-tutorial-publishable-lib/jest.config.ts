/* eslint-disable */
export default {
  displayName: 'nx-nextjs-tutorial-publishable-lib',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': ['@swc/jest', { jsc: { transform: { react: { runtime: 'automatic' } } } }]
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../test-reports/libs/nx-nextjs-tutorial-publishable-lib/coverage',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'nnx-nextjs-tutorial-publishable-lib Jest Tests',
        outputDirectory: 'test-reports/libs/nx-nextjs-tutorial-publishable-lib/junit',
        outputName: 'junit.xml',
        uniqueOutputName: 'false'
      }
    ]
  ]
};
