import app from './app';

if (process.env.NODE_ENV === 'development') require('./paintballnet.css');

app();
