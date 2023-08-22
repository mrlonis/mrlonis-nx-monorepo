/* eslint-disable */
export default {
  displayName: 'ngx-virtual-scroll-cdk-table-example',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {},
  coverageDirectory: '../../test-reports/apps/ngx-virtual-scroll-cdk-table-example/coverage',
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$'
      }
    ]
  },
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment'
  ],
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'ngx-virtual-scroll-cdk-table-example Jest Tests',
        outputDirectory: 'test-reports/apps/ngx-virtual-scroll-cdk-table-example/junit',
        outputName: 'junit.xml',
        uniqueOutputName: 'false'
      }
    ]
  ]
};
