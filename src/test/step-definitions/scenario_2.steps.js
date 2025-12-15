const { Given, When, Then } = require('@cucumber/cucumber');

Given('the user is on home page', function () {
  console.log('Home page');
});

When('the user performs an action', function () {
  console.log('Action done');
});

Then('the result should be shown', function () {
  console.log('Result shown');
});
