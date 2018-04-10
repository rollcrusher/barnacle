module.exports = function(config){
	config.set({

		basePath : '',

		files : [

			'src/**/*.js',
			'test/unit/**/*.js'
		],

		coverageReporter: {
			dir: 'reports/coverage/',
			reporters: [
				{type: 'html', subdir: 'report-html'},
				{type: 'lcov', subdir: 'report-lcov'}
			],
			instrumenterOptions: {
				istanbul: {noCompact: true}
			}
		},

		preprocessors: {
			// source files, that you wanna generate coverage for
			// do not include tests or libraries
			// (these files will be instrumented by Istanbul)
			'src/**/*.js': ['coverage']
		},

		autoWatch : true,

		frameworks: ['jasmine'],

		browsers : ['Chrome'],
		//browsers: ['PhantomJS'],

		port: 9876,

		colors: true,

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,

		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: true,

		plugins: [
			'karma-chrome-launcher',
			'karma-jasmine',
			"karma-chrome-launcher",
			"karma-firefox-launcher",
			"karma-jasmine",
			"karma-junit-reporter",
			"karma-coverage",
			"karma-htmlfile-reporter"
		],

		junitReporter : {
			outputDir: 'reports/junit',
			outputFile: 'reports/junit-test-results.xml',
			suite: 'unit'
		},

		reporters: ['progress', 'html', 'coverage', 'junit'],

		htmlReporter: {
			outputFile: 'reports/junit/html-reporter/test-results.html'
		},

	});
};