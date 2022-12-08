/* eslint-disable */
export default {
  displayName: 'nx-nextjs-tutorial-lib',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': ['@swc/jest', { jsc: { transform: { react: { runtime: 'automatic' } } } }]
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/nx-nextjs-tutorial-lib',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'nnx-nextjs-tutorial-lib Jest Tests',
        outputDirectory: 'junit/libs/nx-nextjs-tutorial-lib',
        outputName: 'junit.xml',
        uniqueOutputName: 'false'
      }
    ]
  ]
};
