const {Before, After} = require('cucumber');
const dataLoader = require('./dataLoader');

Before((scenario) => {
    new Promise((resolve) => {
        dataLoader.restoreDB(resolve);
    });
});

After((scenario) => {
    // Do stuff after each scenario
});

After('@sometag', (scenario) => {
    // Do stuff after each scenario with @sometag
});
