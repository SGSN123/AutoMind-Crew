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
  await page.goto('https://appian.example.com');
});

When('I login with valid credentials', async function () {
  await page.fill('input[name="username"]', 'validUsername');
  await page.fill('input[name="password"]', 'validPassword');
  await page.click('button:has-text("Sign In")');
  await page.waitForLoadState('networkidle');
});

Given('the user navigates to the login page', async function () {
  await page.goto('https://appian.example.com/login');
  await page.waitForLoadState('domcontentloaded');
});

Then('the login page must display the "Username" field', async function () {
  const isVisible = await page.isVisible('input[name="username"]');
  if (!isVisible) throw new Error('Username field is not visible');
});

Then('the login page must display the "Password" field', async function () {
  const isVisible = await page.isVisible('input[name="password"]');
  if (!isVisible) throw new Error('Password field is not visible');
});

Then('the login page must display the "Sign In" button', async function () {
  const isVisible = await page.isVisible('button:has-text("Sign In")');
  if (!isVisible) throw new Error('Sign In button is not visible');
});

When('the user enters a username in the "Username" field', async function () {
  await page.fill('input[name="username"]', 'testuser');
});

When('the user enters a password in the "Password" field', async function () {
  await page.fill('input[name="password"]', 'testpassword');
});

Then('the password field must be masked', async function () {
  const type = await page.getAttribute('input[name="password"]', 'type');
  if (type !== 'password') throw new Error('Password field is not masked');
});

Then('the "Sign In" button must be clickable', async function () {
  const button = await page.$('button:has-text("Sign In")');
  if (!button) throw new Error('Sign In button not found');
  const isDisabled = await button.isDisabled();
  if (isDisabled) throw new Error('Sign In button is disabled');
});

When('the user clicks the "Sign In" button', async function () {
  await page.click('button:has-text("Sign In")');
  await page.waitForLoadState('networkidle');
});

Then('the user should be authenticated successfully', async function () {
  const url = page.url();
  if (!url.includes('/dashboard')) throw new Error('User was not authenticated');
});

Then('the user should be redirected to the Home Dashboard', async function () {
  const url = page.url();
  if (!url.includes('/dashboard')) throw new Error('User was not redirected to Home Dashboard');
});

After(async function () {
  await context.close();
  await browser.close();
});
```