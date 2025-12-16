const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai'); // Chai is used for assertions

let usernameField, passwordField, signInButton; // These represent your login page elements
let isAuthenticated = false; // To simulate successful authentication
let currentPage = 'login'; // Initially, the user is on the login page

// Given: The user is on the login page
Given('the user is on the login page', function () {
  // Normally, you'd navigate to the login page here using your test framework (e.g., Playwright, Selenium)
  // Example with Playwright: await page.goto('https://yourapp.com/login');
  console.log('User is on the login page');
  // For now, we just set the page state
  currentPage = 'login';
});

// When: The user enters a valid username
When('the user enters a valid username', function () {
  usernameField = 'validUsername'; // Simulating entering a valid username
  console.log('User enters username: ', usernameField);
});

// And: The user enters a valid password
When('the user enters a valid password', function () {
  passwordField = 'validPassword'; // Simulating entering a valid password
  console.log('User enters password: ', passwordField);
});

// And: The password field is masked
When('the password field is masked', function () {
  // Simulating the masking of the password field (usually done with a web element, e.g., type="password")
  console.log('Password field is masked');
});

// And: The user clicks on the Sign In button
When('the user clicks on the Sign In button', function () {
  // Simulate the action of clicking the Sign In button
  // In a real test, you'd click the button with something like Playwright: await signInButton.click();
  console.log('User clicks the Sign In button');
  
  // Simulating a successful login for the example
  if (usernameField === 'validUsername' && passwordField === 'validPassword') {
    isAuthenticated = true;
    currentPage = 'home'; // Redirect to home page
  }
});

// Then: The user should be successfully authenticated
Then('the user should be successfully authenticated', function () {
  expect(isAuthenticated).to.be.true; // Assert that the user is authenticated
  console.log('User is successfully authenticated');
});

// And: The user should be redirected to the Home Dashboard
Then('the user should be redirected to the Home Dashboard', function () {
  expect(currentPage).to.equal('home'); // Assert that the user is on the Home page
  console.log('User is redirected to the Home Dashboard');
});
