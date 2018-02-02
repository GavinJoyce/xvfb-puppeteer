const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://intercom.com');
  await page.screenshot({path: 'intercom.png'});

  await browser.close();
})();
