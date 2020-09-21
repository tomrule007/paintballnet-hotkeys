const BookmarkletPlugin = require('bookmarklet-webpack-plugin');
const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'main.[contentHash].js',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new BookmarkletPlugin({
      input: 'main',
      output: 'index.html',
      repo: 'https://github.com/tomrule007/paintballnet-hotkeys',
      linkName: 'PBN-Mod v1.0.0',
      pageTitle: 'Paintballnet-Mod v1.0.0',
      author: 'Thomas J. Herzog (@tomrule007)',
    }),
  ],
});
