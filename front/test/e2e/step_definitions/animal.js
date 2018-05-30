const {client} = require('nightwatch-cucumber');
const {Then, When} = require('cucumber');

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
        .clearValue('.input-animal-name')
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

When(/^I click at Animal Delete button$/, () => {
    client.waitForElementVisible('.button-animal-delete', TIMEOUT_DEFAULT);
    client.click('.button-animal-delete');
    return client;
});

When(/^I click at Animal Details button for "([^"]*)" animal$/, (animalName) => {
    client.waitForElementVisible('.table-animals', TIMEOUT_DEFAULT);
    client.useXpath();
    client.click('//td[.="' + animalName + '"]/../td/button[contains(@class, "btn-animal-details")]');
    client.useCss();
    return client;
});

When(/^I get Animal Details page$/, () => {
    return client.waitForElementVisible('.animal-details', TIMEOUT_DEFAULT);
});

Then(/^I should get Animal Details page$/, () => {
    return client.waitForElementVisible('.animal-details', TIMEOUT_DEFAULT);
});

Then(/^The animal should have "([^"]*)" name$/, (animalName) => {
    return client.expect.element('.flex-item.animal-details-title').text.to.equal(animalName.toUpperCase());
});

Then(/^The animal should have features$/, (table) => {
    client.useXpath();
    table.rows().forEach(row => {
        client.expect.element('//li[@class="animal-feature" and contains(., "' + row[0] + '")]').to.be.visible;
    });
    client.useCss();
    return client;
});

When(/^I click at Edit Animal button$/, () => {
    return client
        .waitForElementVisible('.button-animal-edit', TIMEOUT_DEFAULT)
        .click('.button-animal-edit');
});

Then(/^I get Animal Edit page$/, () => {
    return client.waitForElementVisible('.animal-edit', TIMEOUT_DEFAULT);
});

When(/^I click at Animals menu item$/, () => {
    return client.waitForElementVisible('.menu-item-animals', TIMEOUT_DEFAULT, () => {
        client.click('.menu-item-animals');
    });
});

Then(/^I should get Animal List with names$/, (table) => {
    client.waitForElementVisible('.table-animals', TIMEOUT_DEFAULT);
    client.useXpath();
    table.rows().forEach(row => {
        client.expect.element('//td[@class="cell-animal-name" and .="' + row[0] + '"]').to.be.visible;
    });
    client.useCss();
    return client;
});

Then(/^I should get Animal List w\/o "([^"]*)" animal$/, (animalName) => {
    client.waitForElementVisible('.table-animals', TIMEOUT_DEFAULT);
    client.useXpath();
    client.expect.element('//td[@class="cell-animal-name" and .="' + animalName + '"]').not.to.be.present;
    client.useCss();
    return client;
});
