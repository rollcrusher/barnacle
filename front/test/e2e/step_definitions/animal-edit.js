const {client} = require('nightwatch-cucumber');
const {Then, When} = require('cucumber');

const TIMEOUT_DEFAULT = 2000;

When(/^I click at Edit Animal button$/, () => {
    return client
        .waitForElementVisible('.button-animal-edit', TIMEOUT_DEFAULT)
        .click('.button-animal-edit');
});

Then(/^I get Animal Edit page$/, () => {
    return client.waitForElementVisible('.animal-edit', TIMEOUT_DEFAULT);
});