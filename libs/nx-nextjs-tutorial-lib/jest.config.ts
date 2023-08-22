/* eslint-disable */
export default {
  displayName: 'nx-nextjs-tutorial-lib',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': ['@swc/jest', { jsc: { transform: { react: { runtime: 'automatic' } } } }]
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../test-reports/libs/nx-nextjs-tutorial-lib/coverage',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'nnx-nextjs-tutorial-lib Jest Tests',
        outputDirectory: 'test-reports/libs/nx-nextjs-tutorial-lib/junit',
        outputName: 'junit.xml',
        uniqueOutputName: 'false'
      }
    ]
  ]
};
