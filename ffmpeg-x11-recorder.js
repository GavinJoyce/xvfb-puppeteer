const { exec } = require('child_process');

let ffmpeg;
let filePath = process.argv[2];

process.on('message', (command) => {
  if (data.command === 'start') {
    ffmpeg = exec(`ffmpeg -y -framerate 30 -video_size 1280x720 -f x11grab -i :99.0+0,106 -c:v libx264rgb -crf 0 -preset ultrafast -qp 0 -pix_fmt yuv444p ${filePath}`);
  }

  if (data.command === 'stop') {
    ffmpeg.stdin.write('q');
  }
});
