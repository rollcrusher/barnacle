const {client} = require('nightwatch-cucumber');
const {Then, When, And} = require('cucumber');

const TIMEOUT_DEFAULT = 2000;

When(/^I click at New Animal button$/, () => {
    return client
        .waitForElementVisible('.button-animal-new', TIMEOUT_DEFAULT)
        .click('.button-animal-new');
});

When(/^I get Create Animal page$/, () => {
    return client.expect.element('.animal-create-container').to.be.visible;
});

When(/^I put "([^"]*)" value to Name field$/, (animalName) => {
    return client
        .waitForElementVisible('.input-animal-name', TIMEOUT_DEFAULT)
        .setValue('.input-animal-name', animalName);
});

When(/^I click at Save button$/, () => {
    return client
        .waitForElementVisible('.button-animal-save', TIMEOUT_DEFAULT)
        .click('.button-animal-save');
});

When(/^I search feature with "([^"]*)" value$/, (featureName) => {
    return client
        .waitForElementVisible('.input-feature-name', TIMEOUT_DEFAULT)
        .setValue('.input-feature-name', featureName);
});

When(/^I get "([^"]*)" feature for appropriation$/, (featureName) => {
    client.useXpath();
    client.expect.element('//td[contains(@class, "cell-add-feature") and .="' + featureName + '"]').to.be.visible;
    client.useCss();
    return client;
});

When(/^I add "([^"]*)" feature$/, (featureName) => {
    client.waitForElementVisible('.button-animal-save', TIMEOUT_DEFAULT);
    client.useXpath();
    client.click('//td[contains(@class, "cell-add-feature") and .="' + featureName + '"]/../td[2]/button');
    client.useCss();
    return client;
});

When(/^I see "([^"]*)" feature as a defined one$/, (featureName) => {
    client.useXpath();
    client.expect.element('//td[contains(@class, "cell-defined-feature") and .="' + featureName + '"]').to.be.visible;
    client.useCss();
    return client;
});

When(/^I remove "([^"]*)" feature from defined features$/, (featureName) => {
    client.useXpath();
    client.click('//td[contains(@class, "cell-defined-feature") and .="' + featureName + '"]/../td[2]/button');
    client.useCss();
    return client;
});

Then(/^I should get created "([^"]*)" animal entity$/, (animalName) => {
    client.waitForElementVisible('.table-animals', TIMEOUT_DEFAULT);
    client.useXpath();
    client.expect.element('//td[.="' + animalName + '"]').to.be.visible;
    client.useCss();
    return client;
});

Then(/^I should get defined features w\/o "([^"]*)" feature$/, (featureName) => {
    client.useXpath();
    client.expect.element('//td[contains(@class, "cell-defined-feature") and .="' + featureName + '"]').not.to.be.present;
    client.useCss();
    return client;
});
