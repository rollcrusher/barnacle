const {client} = require('nightwatch-cucumber');
const {Given} = require('cucumber');

Given(/^I have opened Main Page$/, () => {
    return client
        .url('http://localhost:4200/');
});
