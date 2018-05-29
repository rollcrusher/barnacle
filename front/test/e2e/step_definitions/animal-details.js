const {client} = require('nightwatch-cucumber');
const {Then, When, And} = require('cucumber');

const TIMEOUT_DEFAULT = 2000;

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
