const delay = require('delay');
const { fork } = require('child_process');
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
      '--window-size=1440,860',
      '--window-position=0,0'
    ]
  });

  const page = await browser.newPage();
  console.log('loading http://exotravel.com/');

  await page.goto('http://exotravel.com/');

  await page.setViewport({ width: 1280, height: 720 });

  await page.screenshot({path: 'exotravel.png'});

  let screenRecorder = fork('screen-recorder.js');
  screenRecorder.on('message', (data) => {
    console.log('Message from screenRecorder', data);
    if (data.status === 'complete') {
      screenRecorder.kill('SIGINT');
    }
  });
  screenRecorder.send({ command: 'start' });

  console.log('pausing for 5 seconds... (you can use ffmpeg to record the screen)');

  await delay(15000);

  screenRecorder.send({ command: 'stop' });

  await delay(5000); //TODO: find a more graceful way

  screenRecorder.kill('SIGINT');

  console.log('closing browser');

  xvfb.stopSync();
})();
