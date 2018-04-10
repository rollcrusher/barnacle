// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

// https://intellij-support.jetbrains.com/hc/en-us/community/posts/115000248404-Is-it-possible-to-generate-a-Angular4-coverage-report-

module.exports = function (config) {
    config.set({
        basePath: '',
        files: [
            {pattern: './front/**/*.spec.ts', included: false},
            {pattern: './front/**/*.ts', included: false},
        ],
        preprocessors: {
            './front/**/*.ts': ['@angular/cli'],
        },
        frameworks: ['jasmine', '@angular/cli'],
        plugins: [
            require("karma-jasmine"),
            require("karma-chrome-launcher"),
            require("karma-jasmine-html-reporter"),
            require("@angular/cli/plugins/karma"),
            require("karma-coverage"),
            require("karma-coverage-istanbul-reporter")
        ],
        client:{
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },

        //https://github.com/mattlewis92/karma-coverage-istanbul-reporter
        coverageIstanbulReporter: {
            dir: 'reports/coverage/',
            reports: ['html', 'text-summary'],
            fixWebpackSourcePaths: true,
            instrumenterOptions: {
                istanbul: {noCompact: true}
            },
            includeAllSources: true,
        },

        angularCli: {
            environment: 'dev'
        },
        mime: {
            "text/x-typescript": ["ts", "tsx"]
        },
        reporters: config.angularCli && config.angularCli.codeCoverage
            ? ['progress', 'coverage-istanbul']
            : ['progress', 'kjhtml'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false
    });
};
