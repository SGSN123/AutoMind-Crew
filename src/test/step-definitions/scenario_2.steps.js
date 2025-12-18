```javascript
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

let browser;
let context;
let page;

Given('I launch Chrome browser', async function () {
  browser = await chromium.launch({ headless: false, channel: 'chrome' });
  context = await browser.newContext();
  page = await context.newPage();
});

When('I navigate to Appian application', async function () {
  await page.goto('https://appian.example.com');
});

When('I login with valid credentials', async function () {
  await page.fill('input[name="username"]', 'validUsername');
  await page.fill('input[name="password"]', 'validPassword');
  await page.click('button[type="submit"]');
});

Given('the user is on the login page', async function () {
  await page.goto('https://appian.example.com/login');
});

Then('the page displays a Username field', async function () {
  const usernameField = await page.$('input[name="username"]');
  if (!usernameField) throw new Error('Username field not found');
});

Then('the page displays a Password field', async function () {
  const passwordField = await page.$('input[name="password"]');
  if (!passwordField) throw new Error('Password field not found');
});

Then('the page displays a Sign In button', async function () {
  const signInButton = await page.$('button[type="submit"]');
  if (!signInButton) throw new Error('Sign In button not found');
});

When('the user enters a username in the Username field', async function () {
  await page.fill('input[name="username"]', 'testUser');
});

When('the user enters a password in the Password field', async function () {
  await page.fill('input[name="password"]', 'testPassword');
});

Then('the Password field should mask the entered password', async function () {
  const type = await page.getAttribute('input[name="password"]', 'type');
  if (type !== 'password') throw new Error('Password field is not masked');
});

When('the user clicks the Sign In button', async function () {
  await page.click('button[type="submit"]');
});

Then('the user is successfully authenticated', async function () {
  await page.waitForSelector('#authenticated-indicator', { timeout: 5000 });
});

Then('the user is redirected to the Home Dashboard', async function () {
  await page.waitForURL('**/home-dashboard', { timeout: 5000 });
});

After(async function () {
  if (browser) {
    await browser.close();
  }
});
```