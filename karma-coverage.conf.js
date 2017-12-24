const karmaConf = require('./karma.conf.js');
module.exports = function (config) {
  // Generic Karma Configuration
  karmaConf(config);

  //Extended Configuration for Karma Coverage Reports
  config.set({
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('karma-remap-coverage')
    ],
    preprocessors: {
      './src/lib/**/!(*spec).js': 'coverage'
    },
    reporters: ['progress', 'kjhtml', 'coverage', 'remap-coverage'],

    coverageReporter: {
      type: 'in-memory'
    },
    remapCoverageReporter: {
      'text-summary': null,
      html: './coverage/html',
      cobertura: './coverage/coverage.xml'
    }
  })
}
