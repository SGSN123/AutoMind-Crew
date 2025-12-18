```javascript
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

let browser;
let context;
let page;

Given('I launch Chrome browser', async function () {
  browser = await chromium.launch({ channel: 'chrome', headless: false });
  context = await browser.newContext();
  page = await context.newPage();
});

When('I navigate to Appian application', async function () {
  await page.goto('https://appian.example.com'); // Replace with actual URL
});

When('I login with valid credentials', async function () {
  await page.fill('input[name="username"]', 'validUsername'); // Replace with actual valid username
  await page.fill('input[name="password"]', 'validPassword'); // Replace with actual valid password
  await page.click('button[type="submit"]');
  await page.waitForLoadState('networkidle');
});

Given('the user is on the login page', async function () {
  await page.goto('https://appian.example.com/login'); // Replace with actual login page URL
});

Then('the login page displays the Username field', async function () {
  const usernameField = await page.$('input[name="username"]');
  if (!usernameField) throw new Error('Username field not found');
});

Then('the login page displays the Password field', async function () {
  const passwordField = await page.$('input[name="password"]');
  if (!passwordField) throw new Error('Password field not found');
});

Then('the login page displays the Sign In button', async function () {
  const signInButton = await page.$('button[type="submit"]');
  if (!signInButton) throw new Error('Sign In button not found');
});

When('the user enters a valid username in the Username field', async function () {
  await page.fill('input[name="username"]', 'validUsername'); // Replace with actual valid username
});

When('the user enters a valid password in the Password field', async function () {
  await page.fill('input[name="password"]', 'validPassword'); // Replace with actual valid password
});

Then('the password field is masked', async function () {
  const type = await page.getAttribute('input[name="password"]', 'type');
  if (type !== 'password') throw new Error('Password field is not masked');
});

Then('the Sign In button is clickable', async function () {
  const signInButton = await page.$('button[type="submit"]');
  const isDisabled = await signInButton.getAttribute('disabled');
  if (isDisabled !== null) throw new Error('Sign In button is disabled');
});

When('the user clicks the Sign In button', async function () {
  await page.click('button[type="submit"]');
  await page.waitForLoadState('networkidle');
});

Then('the user is successfully authenticated', async function () {
  // Example check for a user-specific element, adjust selector as needed
  const userProfile = await page.$('div.user-profile');
  if (!userProfile) throw new Error('User not authenticated');
});

Then('the user is redirected to the Home Dashboard', async function () {
  if (!page.url().includes('/home')) throw new Error('Not redirected to Home Dashboard');
});

After(async function () {
  await browser?.close();
});
```