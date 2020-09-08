import app from './app';

if (process.env.NODE_ENV === 'development') require('./paintballnet.css');

if (process.env.NODE_ENV === 'production') {
  if (
    window.location.href !== 'http://paintballnet.net/play/' &&
    window.location.href !==
      'https://tomrule007.github.io/paintballnet-hotkeys/build/index.html' &&
    window.location.hostname !== '127.0.0.1'
  )
    window.location.href = 'http://paintballnet.net/play/';
}
app();
