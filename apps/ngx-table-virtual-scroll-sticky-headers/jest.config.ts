/* eslint-disable */
export default {
  displayName: 'ngx-table-virtual-scroll-sticky-headers',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
  coverageDirectory: '../../coverage/apps/ngx-table-virtual-scroll-sticky-headers',
  transform: {
    '^.+\\.(ts|mjs|js|html)$': 'jest-preset-angular',
  },
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'ngx-table-virtual-scroll-sticky-headers Jest Tests',
        outputDirectory: 'junit/apps/ngx-table-virtual-scroll-sticky-headers',
        outputName: 'junit.xml',
        uniqueOutputName: 'false',
      },
    ],
  ],
};
