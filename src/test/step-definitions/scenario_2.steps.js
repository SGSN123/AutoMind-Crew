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
  await page.goto('https://your-appian-app-url.com');
});

When('I login with valid credentials', async function () {
  await page.fill('#username', 'validUsername');
  await page.fill('#password', 'validPassword');
  await page.click('#signInButton');
  await page.waitForLoadState('networkidle');
});

Given('the user is on the login page in Chrome', async function () {
  if (!page) {
    browser = await chromium.launch({ channel: 'chrome', headless: false });
    context = await browser.newContext();
    page = await context.newPage();
  }
  await page.goto('https://your-appian-app-url.com/login');
});

Then('the Username field is displayed', async function () {
  await page.waitForSelector('#username', { state: 'visible' });
});

Then('the Password field is displayed', async function () {
  await page.waitForSelector('#password', { state: 'visible' });
});

Then('the Password field is masked', async function () {
  const type = await page.getAttribute('#password', 'type');
  if (type !== 'password') throw new Error('Password field is not masked');
});

Then('the Sign In button is displayed', async function () {
  await page.waitForSelector('#signInButton', { state: 'visible' });
});

When('the user enters a valid username in the Username field', async function () {
  await page.fill('#username', 'validUsername');
});

When('the user enters a valid password in the Password field', async function () {
  await page.fill('#password', 'validPassword');
});

When('the user clicks the Sign In button', async function () {
  await page.click('#signInButton');
  await page.waitForLoadState('networkidle');
});

Then('the user is successfully authenticated', async function () {
  const loggedInSelector = '#logoutButton'; // example element visible when logged in
  await page.waitForSelector(loggedInSelector, { state: 'visible' });
});

Then('the user is redirected to the Home Dashboard', async function () {
  const url = page.url();
  if (!url.includes('/home-dashboard')) throw new Error('User not redirected to Home Dashboard');
});

After(async function () {
  if (browser) await browser.close();
});
```