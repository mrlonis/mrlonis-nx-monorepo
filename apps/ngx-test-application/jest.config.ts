/* eslint-disable */
const esModules = [
  '@angular/animations',
  '@angular/cdk',
  '@angular/common',
  '@angular/compiler',
  '@angular/core',
  '@angular/forms',
  '@angular/material',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',
  '@swimlane/ngx-charts',
  'd3',
  'd3-array',
  'd3-color',
  'jest-runtime',
].join('|');

export default {
  displayName: 'ngx-test-application',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
  coverageDirectory: '../../coverage/apps/ngx-test-application',
  transform: {
    '^.+\\.(ts|mjs|js|html)$': 'jest-preset-angular',
  },
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)', `node_modules/(?!${esModules}$)`],
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
        suiteName: 'ngx-test-application Jest Tests',
        outputDirectory: 'junit/apps/ngx-test-application',
        outputName: 'junit.xml',
        uniqueOutputName: 'false',
      },
    ],
  ],
};
