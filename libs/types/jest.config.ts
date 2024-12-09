export default {
  displayName: 'types',
  preset: '../../jest.preset.js',
  globals: {},
  transform: {
    '^.+\\.[tj]sx?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json'
      }
    ]
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../test-reports/libs/types/coverage',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'types Jest Tests',
        outputDirectory: 'test-reports/libs/types/junit',
        outputName: 'junit.xml',
        uniqueOutputName: 'false'
      }
    ]
  ]
};
