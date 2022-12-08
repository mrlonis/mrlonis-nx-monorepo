/* eslint-disable */
export default {
  displayName: 'ngx-virtual-scroll-cdk-table-example',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$'
    }
  },
  coverageDirectory: '../../coverage/apps/ngx-virtual-scroll-cdk-table-example',
  transform: {
    '^.+\\.(ts|mjs|js|html)$': 'jest-preset-angular'
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
        outputDirectory: 'junit/apps/ngx-virtual-scroll-cdk-table-example',
        outputName: 'junit.xml',
        uniqueOutputName: 'false'
      }
    ]
  ]
};
