const nxPreset = require('@nrwl/jest/preset').default;

module.exports = { ...nxPreset, coverageReporters: ['cobertura', 'html'] };
