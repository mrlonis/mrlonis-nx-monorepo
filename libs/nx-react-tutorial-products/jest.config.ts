/* eslint-disable */
export default {
  displayName: 'nx-react-tutorial-products',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json'
    }
  },
  transform: {
    '^.+\\.[tj]s$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/libs/nx-react-tutorial-products',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'nx-react-tutorial-products Jest Tests',
        outputDirectory: 'junit/apps/nx-react-tutorial-products',
        outputName: 'junit.xml',
        uniqueOutputName: 'false'
      }
    ]
  ]
};
