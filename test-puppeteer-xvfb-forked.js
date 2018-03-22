const delay = require('delay');
const { fork } = require('child_process');
const puppeteer = require('puppeteer');
const Xvfb = require('xvfb');
const tmp = require('tmp-promise')

async function xvfpRecordScreen(url, callback) {
  var Xvfb = require('xvfb');
  var xvfb = new Xvfb({
    xvfb_args: ['-screen', '0', '1600x1200x24+32']
  });
  xvfb.startSync();

  let browser = await puppeteer.launch({
    headless: false,
    args: [ //TODO: GJ: allow extensions configuration
      '--no-sandbox',
      '--window-size=1440,860',
      '--window-position=0,0',
      '--enable-translate-new-ux', //TODO: GJ: find a way to disable translation fully (--disable-translate has been removed)
    ]
  });

  const page = await browser.newPage();

  await page.goto(url);
  await page.setViewport({ width: 1280, height: 720 });

  let filePath = await _recordScreen(async () => {
    return await callback(page);
  });

  xvfb.stopSync();
  return filePath;
}

async function _recordScreen(callback) {
  let filePath = await tmp.tmpName({ postfix: '.mp4' });

  let ffmpegX11Recorder = fork('./ffmpeg-x11-recorder.js', [filePath]);
  ffmpegX11Recorder.send({ command: 'start' });

  await callback();

  ffmpegX11Recorder.send({ command: 'stop' });
  await delay(500); //TODO: find a more graceful way to shut down the ffmpeg process
  ffmpegX11Recorder.kill('SIGINT');

  return filePath;
}

(async () => {
  let videoPath = await xvfpRecordScreen('http://intercom.com/', async (page) => {
    console.log('pausing for 5 seconds...');
    await delay(5000);

    await page.goto('https://www.emberjs.com/');
    console.log('pausing for 5 more seconds...');
    await delay(5000);
  });

  console.log(`RECORDED to ${videoPath}`);
})();
