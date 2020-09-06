const validateOptions = require('schema-utils');
const { RawSource } = require('webpack-sources');

//TODO: Setup schema file
// > include default values
// > Add more error handling

// schema for options object
const schema = {
  type: 'object',
  properties: {
    test: {
      type: 'string',
    },
  },
};

module.exports = class BookmarkletWebpackPlugin {
  constructor(options = {}) {
    validateOptions(schema, options, 'BookmarkletWebpackPlugin');
    this.options = options;
  }

  apply(compiler) {
    const { input, output, repo, linkName, pageTitle, author } = this.options;

    compiler.hooks.emit.tapAsync(
      'BookmarkletWebpackPlugin',
      (compilation, cb) => {
        const asset = Object.entries(compilation.assets).filter(([key, _]) =>
          key.includes(input)
        );

        if (asset.length > 1)
          throw Error(
            `
            BookmarkletWebpackPlugin: 

            input: ${input}, returned no matching assets

            *Make sure you provide the options object to the plugin with a valid 'input' property
                Example  
                  plugins: [new BookmarkletWebpackPlugin({input: 'main', output: 'bookmarkletPage.html'})],

            input should match the javascript bundle name -- Output:{filename: [[name]].js
            currently does not support [contentHash] but will return partial matches
            `
          );
        if (asset.length > 1)
          throw Error(
            `
            BookmarkletWebpackPlugin: 
              
            input: ${input} 
            
            Matched multiple assets: ${asset.map(([key, _]) => key).join(', ')})

            *Must rename assets or use a better match bundle name.
            `
          );
        const assetName = asset[0][0];
        const code = encodeURIComponent(asset[0][1]._value);
        const bookmarkletCode = `javascript:(function(){${code}})()`;

        // Remove the javascript asset output
        delete compilation.assets[assetName];

        compilation.assets[output] = new RawSource(
          createHtmlTemplate({
            bookmarkletCode,
            repo,
            linkName,
            pageTitle,
            author,
          })
        );

        cb();
      }
    );
  }
};

function createHtmlTemplate({
  bookmarkletCode,
  linkName,
  pageTitle,
  repo,
  author,
}) {
  html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      html,body,div {  text-align: center; margin: 0 auto; padding: 0; font: normal 16px/24px Helvetica Neue, Helvetica, sans-serif; color: #333; }
      #main { max-width: 630px; margin: 3em auto; }
      .bookmarklet { display: inline-block; padding: .5em 1em; color: #fff; background: #50dcf3; border-radius: 4px; text-decoration: none; }
      a { color: #50dcf3; }
      .dim { color: #999; }
      .bookmarkContainer { padding: 30px;}
    </style>
  </head>
  <body>
    <div id="main">
      <h1>${pageTitle}</h1>
      ${author ? `<p>By: ${author}</p>` : ''}
     <div class="bookmarkContainer">
        <p>
          <a class="bookmarklet" href="${bookmarkletCode}">${linkName}</a>
        </p> 
        <p>
          Drag this button to your bookmarks bar to save it as a bookmarklet.
        </p>
      </div>
      ${repo ? `<p>See source at <br> <a href="${repo}">${repo}</a></p>` : ''}
    </div>
  </body>
</html>
`;

  return html;
}
