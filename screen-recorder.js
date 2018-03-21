const { spawn, exec } = require('child_process');

let counter = 0;
let ffmpeg;

process.on('message', (data) => {
  if (data.command === 'start') {
    ffmpeg = exec('ffmpeg -y -framerate 30 -video_size 1280x720 -f x11grab -i :99.0+0,106 -c:v libx264rgb -crf 0 -preset ultrafast -qp 0 -pix_fmt yuv444p screen.mp4');
    setInterval(() => {
      counter++;
      process.send({ msg: `tick_${counter}` });
    }, 1000);
  }

  if (data.command === 'stop') {
    console.log('shutting down ffmpeg');
    ffmpeg.stdin.write('q');
  }
});
