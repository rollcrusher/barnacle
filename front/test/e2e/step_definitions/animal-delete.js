const {client} = require('nightwatch-cucumber');
const {When} = require('cucumber');

const TIMEOUT_DEFAULT = 2000;

When(/^I click at Animal Delete button for "([^"]*)" animal$/, (animalName) => {
    client.waitForElementVisible('.table-animals', TIMEOUT_DEFAULT);
    client.useXpath();
    client.click('//td[.="' + animalName + '"]/../td/button[contains(@class, "btn-animal-delete")]');
    client.useCss();
    return client;
});
