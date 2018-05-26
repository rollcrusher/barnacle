const seleniumServer = require('selenium-server');
const chromedriver = require('chromedriver');
const geckodriver = require('geckodriver');

require('nightwatch-cucumber')({
    cucumberArgs: [
        '--require', 'front/test/e2e/libs',
        '--require', 'front/test/e2e/step_definitions',
        '--format', 'json:reports/e2e/cucumber.json',
        '--format', 'node_modules/cucumber-pretty',
        'front/test/e2e/features'
    ]
});

const nightwatchConfig = {
    output_folder : 'reports',
    custom_commands_path : '',
    custom_assertions_path : '',
    page_objects_path : '',
    globals_path : '',

    selenium: {
        start_process: true,
        server_path: seleniumServer.path,
        log_path: '',
        host: '127.0.0.1',
        port: 4444
    },

    test_settings : {
        default : {
            launch_url : 'http://localhost',
            selenium_port  : 4444,
            selenium_host  : 'localhost',
            silent: true,
            screenshots : {
                enabled : false,
                path : ''
            },
            desiredCapabilities: {
                browserName: 'firefox',
                marionette: true
            }
        },

        chrome : {
            desiredCapabilities: {
                browserName: 'chrome'
            }
        },

        edge : {
            desiredCapabilities: {
                browserName: 'MicrosoftEdge'
            }
        }
    }
};

module.exports = nightwatchConfig;
