```
sudo yum update

#https://intoli.com/blog/installing-google-chrome-on-centos/
curl https://intoli.com/install-google-chrome.sh | bash

wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash

source ~/.bashrc

nvm install 9.5.0

#We may not need all of these
sudo yum install cups-libs dbus-glib libXrandr libXcursor libXinerama cairo cairo-gobject pango

sudo yum groupinstall 'Development Tools'

wget https://github.com/GavinJoyce/xvfb-puppeteer/archive/master.zip
unzip master.zip
cd xvfb-puppeteer-master
npm install

ldd /home/ec2-user/xvfb-puppeteer-master/node_modules/puppeteer/.local-chromium/linux-526987/chrome-linux/chrome | grep not

libXss.so.1 => not found
libatk-1.0.so.0 => not found
libatk-bridge-2.0.so.0 => not found
libgtk-3.so.0 => not found
libgdk-3.so.0 => not found
libgdk_pixbuf-2.0.so.0 => not found

sudo rpm -ivh --nodeps https://muster-vendor.s3.amazonaws.com/personalized-video/libXScrnSaver-1.2.2-6.fc20.x86_64.rpm
sudo rpm -ivh --nodeps https://muster-vendor.s3.amazonaws.com/personalized-video/at-spi2-atk-2.22.0-2.el7.x86_64.rpm
sudo rpm -ivh --nodeps https://muster-vendor.s3.amazonaws.com/personalized-video/atk-2.22.0-3.el7.x86_64.rpm
sudo rpm -ivh --nodeps https://muster-vendor.s3.amazonaws.com/personalized-video/gtk3-3.10.4-1.fc20.x86_64.rpm
sudo rpm -ivh --nodeps https://muster-vendor.s3.amazonaws.com/personalized-video/gdk-pixbuf2-2.24.0-1.fc16.x86_64.rpm
sudo rpm -ivh --nodeps https://muster-vendor.s3.amazonaws.com/personalized-video/libwayland-client-1.2.0-3.fc20.x86_64.rpm
sudo rpm -ivh --nodeps https://muster-vendor.s3.amazonaws.com/personalized-video/libwayland-cursor-1.2.0-3.fc20.x86_64.rpm
sudo rpm -ivh --nodeps https://muster-vendor.s3.amazonaws.com/personalized-video/at-spi2-core-2.22.0-1.el7.x86_64.rpm
sudo rpm -ivh --nodeps https://muster-vendor.s3.amazonaws.com/personalized-video/libxkbcommon-0.3.1-1.fc20.x86_64.rpm

LD_LIBRARY_PATH=/opt/google/chrome/lib/:${LD_LIBRARY_PATH} node test-puppeteer-headless.js

ls -la intercom.png

sudo yum install -y xorg-x11-server-Xvfb mesa-libGLU alsa-utils yarn

LD_LIBRARY_PATH=/opt/google/chrome/lib/:${LD_LIBRARY_PATH} node test-puppeteer-xvfb-forked.js

wget https://s3.amazonaws.com/muster-vendor/ffmpeg-release-64bit-static.tar.xz
tar xf ffmpeg-release-64bit-static.tar.xz
sudo cp ffmpeg-3.4.1-64bit-static/ffmpeg /usr/local/bin

//https://askubuntu.com/a/365221
ffmpeg -i screen.mp4 -c:v libx264 -crf 23 -preset medium -vf format=yuv420p screen-compressed.mp4
```
