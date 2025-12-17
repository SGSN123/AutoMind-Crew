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
  await page.goto('https://appian.application.url/');
});

When('I login with valid credentials', async function () {
  await page.fill('input[name="username"]', 'validUsername');
  await page.fill('input[name="password"]', 'validPassword');
  await page.click('button[type="submit"]');
  await page.waitForLoadState('networkidle');
});

Given('the user navigates to the login page', async function () {
  await page.goto('https://appian.application.url/login');
});

Then('the login page must display Username field', async function () {
  const usernameField = await page.$('input[name="username"]');
  if (!usernameField) throw new Error('Username field not found');
});

Then('the login page must display Password field', async function () {
  const passwordField = await page.$('input[name="password"]');
  if (!passwordField) throw new Error('Password field not found');
});

Then('the login page must display Sign In button', async function () {
  const signInButton = await page.$('button[type="submit"]');
  if (!signInButton) throw new Error('Sign In button not found');
});

When('the user enters "validUsername" in the Username field', async function () {
  await page.fill('input[name="username"]', 'validUsername');
});

When('the user enters "validPassword" in the Password field', async function () {
  await page.fill('input[name="password"]', 'validPassword');
});

Then('the Password field must be masked', async function () {
  const type = await page.getAttribute('input[name="password"]', 'type');
  if (type !== 'password') throw new Error('Password field is not masked');
});

When('the user clicks the Sign In button', async function () {
  await page.click('button[type="submit"]');
  await page.waitForLoadState('networkidle');
});

Then('the user must be successfully authenticated', async function () {
  const content = await page.content();
  if (!content.includes('Welcome') && !content.includes('Logout')) {
    throw new Error('Authentication failed');
  }
});

Then('the user is redirected to the Home Dashboard', async function () {
  await page.waitForURL('**/home-dashboard');
  if (!page.url().includes('/home-dashboard')) throw new Error('Not redirected to Home Dashboard');
});

After(async function () {
  await browser?.close();
});
```