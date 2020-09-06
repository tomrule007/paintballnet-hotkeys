const validateOptions = require('schema-utils');
const { ConcatSource } = require('webpack-sources');

// schema for options object
const schema = {
  type: 'object',
  properties: {
    test: {
      type: 'string',
    },
  },
};

class BookmarkletWebpackPlugin {
  constructor(options = {}) {
    validateOptions(schema, options, 'BookmarkletWebpackPlugin');
  }

  apply(compiler) {
    compiler.hooks.compilation.tap(
      'BookmarkletWrapperPlugin',
      (compilation) => {
        compilation.hooks.afterOptimizeChunkAssets.tap('MyPlugin', (chunks) => {
          chunks
            .filter((chunk) => chunk.name === 'main')
            .forEach((chunk) => {
              // console.log('filtered chunk', chunk);
              chunk.files.forEach((file) => {
                console.log('concat source: ', file);
                // compilation.assets[file] = new ConcatSource(
                //   '/**Sweet Banner**/',
                //   '\n',
                //   compilation.assets[file]
                // );
                const encodedCode = encodeURIComponent(
                  compilation.assets[file]._value
                );

                compilation.assets[
                  file
                ]._value = `javascript:(function(){${compilation.assets[file]._value}})()`;
              });
            });
        });
      }
    );
  }
}

module.exports = BookmarkletWebpackPlugin;
