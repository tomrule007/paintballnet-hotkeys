const validateOptions = require('schema-utils');

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
    compiler.hooks.done.tap('BookmarkletWebpackPlugin', (
      stats /* stats is passed as an argument when done hook is tapped.  */
    ) => {
      console.log('BookmarkletWebpackPlugin');
    });
  }
}

module.exports = BookmarkletWebpackPlugin;
