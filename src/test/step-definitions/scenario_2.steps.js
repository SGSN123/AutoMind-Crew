```javascript
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

let browser;
let context;
let page;

Given('I launch Chrome browser', async function() {
  browser = await chromium.launch({ channel: 'chrome', headless: false });
  context = await browser.newContext();
  page = await context.newPage();
  this.page = page;
});

When('I navigate to Appian application', async function() {
  await this.page.goto('https://appian.example.com');
});

When('I login with valid credentials', async function() {
  await this.page.fill('input[name="username"]', 'validUser');
  await this.page.fill('input[name="password"]', 'validPassword');
  await this.page.click('button[type="submit"]');
});

Given('the user is on the login page', async function() {
  await this.page.goto('https://appian.example.com/login');
});

Then('the Username field is displayed', async function() {
  const usernameVisible = await this.page.isVisible('input[name="username"]');
  if (!usernameVisible) throw new Error('Username field is not visible');
});

Then('the Password field is displayed', async function() {
  const passwordVisible = await this.page.isVisible('input[name="password"]');
  if (!passwordVisible) throw new Error('Password field is not visible');
});

Then('the Sign In button is displayed', async function() {
  const signInVisible = await this.page.isVisible('button[type="submit"]');
  if (!signInVisible) throw new Error('Sign In button is not visible');
});

When('the user enters {string} into the Username field', async function(username) {
  await this.page.fill('input[name="username"]', username);
});

When('the user enters {string} into the Password field', async function(password) {
  await this.page.fill('input[name="password"]', password);
});

Then('the Password field must mask the entered text', async function() {
  const passwordType = await this.page.getAttribute('input[name="password"]', 'type');
  if (passwordType !== 'password') throw new Error('Password field is not masked');
});

When('the user clicks the Sign In button', async function() {
  await this.page.click('button[type="submit"]');
});

Then('the user is successfully authenticated', async function() {
  await this.page.waitForSelector('text=Welcome', { timeout: 5000 });
});

Then('the user is redirected to the Home Dashboard', async function() {
  const url = this.page.url();
  if (!url.includes('/dashboard')) throw new Error('User is not redirected to Home Dashboard');
});

After(async function() {
  if (browser) await browser.close();
});
```