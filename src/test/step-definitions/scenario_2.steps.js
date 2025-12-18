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
  await page.fill('#username', 'validUser');
  await page.fill('#password', 'validPassword');
  await page.click('#signIn');
  await page.waitForLoadState('networkidle');
});

Given('the user is on the login page', async function () {
  await page.goto('https://appian.example.com/login');
});

Then('the login page must display the Username field', async function () {
  await page.waitForSelector('#username', { state: 'visible' });
});

Then('the login page must display the Password field', async function () {
  await page.waitForSelector('#password', { state: 'visible' });
});

Then('the login page must display the Sign In button', async function () {
  await page.waitForSelector('#signIn', { state: 'visible' });
});

When('the user enters a valid username in the Username field', async function () {
  await page.fill('#username', 'validUser');
});

When('the user enters a valid password in the Password field', async function () {
  await page.fill('#password', 'validPassword');
});

Then('the password field must be masked', async function () {
  const type = await page.getAttribute('#password', 'type');
  if (type !== 'password') {
    throw new Error('Password field is not masked');
  }
});

When('the user clicks the Sign In button', async function () {
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle' }),
    page.click('#signIn'),
  ]);
});

Then('the user must be successfully authenticated', async function () {
  const isLoggedIn = await page.isVisible('#logoutButton');
  if (!isLoggedIn) {
    throw new Error('User is not authenticated');
  }
});

Then('the user must be redirected to the Home Dashboard', async function () {
  const url = page.url();
  if (!url.includes('/dashboard')) {
    throw new Error('User is not redirected to Home Dashboard');
  }
});

After(async function () {
  await browser.close();
});
```