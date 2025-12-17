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
  await page.click('button[type="submit"]');
  await page.waitForLoadState('networkidle');
});

Given('the user navigates to the login page', async function () {
  await page.goto('https://appian.example.com/login');
});

Then('the login page displays a Username field', async function () {
  await page.waitForSelector('input[name="username"]', { state: 'visible' });
});

Then('the login page displays a Password field', async function () {
  await page.waitForSelector('input[name="password"]', { state: 'visible' });
});

Then('the login page displays a Sign In button', async function () {
  await page.waitForSelector('button[type="submit"]', { state: 'visible' });
});

When('the user enters a valid username in the Username field', async function () {
  await page.fill('input[name="username"]', 'validUsername');
});

When('the user enters a valid password in the Password field', async function () {
  await page.fill('input[name="password"]', 'validPassword');
});

Then('the Password field masks the entered password', async function () {
  const type = await page.getAttribute('input[name="password"]', 'type');
  if (type !== 'password') throw new Error('Password field is not masked');
});

Then('the Sign In button is clickable', async function () {
  const isDisabled = await page.$eval('button[type="submit"]', (btn) => btn.disabled);
  if (isDisabled) throw new Error('Sign In button is disabled');
});

When('the user clicks the Sign In button', async function () {
  await page.click('button[type="submit"]');
  await page.waitForLoadState('networkidle');
});

Then('the user is authenticated successfully', async function () {
  const url = page.url();
  if (!url.includes('/dashboard')) throw new Error('User not authenticated or not redirected properly');
});

Then('the user is redirected to the Home Dashboard', async function () {
  await page.waitForSelector('text=Home Dashboard', { state: 'visible' });
});

After(async function () {
  if (browser) await browser.close();
});
```