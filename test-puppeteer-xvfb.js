const delay = require('delay');
const puppeteer = require('puppeteer');

(async () => {
  console.log('starting xvfb');
  var Xvfb = require('xvfb');
  var xvfb = new Xvfb({
    xvfb_args: ['-screen', '0', '1600x1200x24+32']
  });
  xvfb.startSync();

  console.log('xvfb started');

  let browser = await puppeteer.launch({
    headless: false,
    args: [
      '--window-size=1440,810',
      '--window-position=0,0',
      '--use-gl=osmesa',
    ]
  });

  const page = await browser.newPage();
  console.log('loading http://exotravel.com/');

  await page.goto('http://exotravel.com/');

  await page.setViewport({ width: 1440, height: 742 });

  await page.screenshot({path: 'exotravel.png'});

  console.log('pausing for 20 seconds... (you can use ffmpeg to record the screen)');

  await delay(20000);

  console.log('closing browser');

  xvfb.stopSync();
})();
