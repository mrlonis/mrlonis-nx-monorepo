/* eslint-disable */
export default {
  displayName: 'nx-nextjs-tutorial-publishable-lib',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': ['@swc/jest', { jsc: { transform: { react: { runtime: 'automatic' } } } }]
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/nx-nextjs-tutorial-publishable-lib',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'nnx-nextjs-tutorial-publishable-lib Jest Tests',
        outputDirectory: 'junit/libs/nx-nextjs-tutorial-publishable-lib',
        outputName: 'junit.xml',
        uniqueOutputName: 'false'
      }
    ]
  ]
};
