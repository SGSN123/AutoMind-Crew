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
  this.page = page;
});

When('I navigate to Appian application', async function () {
  await this.page.goto('https://appian.example.com'); // Replace with actual URL
});

When('I login with valid credentials', async function () {
  await this.page.fill('input[name="username"]', 'validUsername'); // Replace with actual username
  await this.page.fill('input[name="password"]', 'validPassword'); // Replace with actual password
  await this.page.click('button[type="submit"]'); // Adjust selector for Sign In button
});

Given('the user is on the login page in Chrome', async function () {
  await this.page.goto('https://appian.example.com/login'); // Replace with actual login URL
});

Then('the Username field is displayed', async function () {
  await this.page.waitForSelector('input[name="username"]', { state: 'visible' });
});

Then('the Password field is displayed', async function () {
  await this.page.waitForSelector('input[name="password"]', { state: 'visible' });
});

Then('the Password field is masked', async function () {
  const type = await this.page.getAttribute('input[name="password"]', 'type');
  if (type !== 'password') throw new Error('Password field is not masked');
});

Then('the Sign In button is displayed', async function () {
  await this.page.waitForSelector('button[type="submit"]', { state: 'visible' });
});

When('the user enters a username in the Username field', async function () {
  await this.page.fill('input[name="username"]', 'testuser');
});

When('the user enters a password in the Password field', async function () {
  await this.page.fill('input[name="password"]', 'testpassword');
});

Then('the Sign In button is clickable', async function () {
  const button = await this.page.$('button[type="submit"]');
  const isEnabled = await button.isEnabled();
  if (!isEnabled) throw new Error('Sign In button is not clickable');
});

When('the user clicks the Sign In button', async function () {
  await this.page.click('button[type="submit"]');
});

Then('the user is authenticated successfully', async function () {
  await this.page.waitForSelector('text=Logout', { timeout: 5000 });
});

Then('the user is redirected to the Home Dashboard', async function () {
  await this.page.waitForURL('**/home', { timeout: 5000 });
});

After(async function () {
  if (browser) {
    await browser.close();
  }
});
```