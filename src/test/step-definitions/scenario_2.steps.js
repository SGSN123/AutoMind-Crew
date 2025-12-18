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
  await page.goto('https://appian.url'); // Replace with actual URL
});

When('I login with valid credentials', async function () {
  await page.fill('input[name="username"]', 'validUser');
  await page.fill('input[name="password"]', 'validPassword');
  await page.click('button:has-text("Sign In")');
});

Given('the user is on the login page', async function () {
  await page.goto('https://appian.url/login'); // Replace with actual login page URL
});

Then('the Username field is displayed', async function () {
  const usernameField = await page.isVisible('input[name="username"]');
  if (!usernameField) throw new Error('Username field not displayed');
});

Then('the Password field is displayed', async function () {
  const passwordField = await page.isVisible('input[name="password"]');
  if (!passwordField) throw new Error('Password field not displayed');
});

Then('the Password field input is masked', async function () {
  const type = await page.getAttribute('input[name="password"]', 'type');
  if (type !== 'password') throw new Error('Password field input not masked');
});

Then('the Sign In button is displayed', async function () {
  const signInButton = await page.isVisible('button:has-text("Sign In")');
  if (!signInButton) throw new Error('Sign In button not displayed');
});

When('the user enters a username in the Username field', async function () {
  await page.fill('input[name="username"]', 'testUser');
});

When('the user enters a password in the Password field', async function () {
  await page.fill('input[name="password"]', 'testPassword');
});

When('the user clicks the Sign In button', async function () {
  await page.click('button:has-text("Sign In")');
});

Then('the user is successfully authenticated', async function () {
  const userIsAuthenticated = await page.waitForSelector('text=Welcome', { timeout: 5000 }).then(() => true).catch(() => false);
  if (!userIsAuthenticated) throw new Error('User not authenticated');
});

Then('the user is redirected to the Home Dashboard', async function () {
  const url = page.url();
  if (!url.includes('/home-dashboard')) throw new Error('User not redirected to Home Dashboard');
});

After(async function () {
  if (browser) await browser.close();
});
```