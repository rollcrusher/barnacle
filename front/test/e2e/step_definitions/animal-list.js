const {client} = require('nightwatch-cucumber');
const {Then, When} = require('cucumber');

const TIMEOUT_DEFAULT = 1000;

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