# three-minify-shaderchunk

*Remove unnecessary three.js shader imports and reduce bundle sizes*

## Installation

`npm install --save-dev `

## Usage

*This example uses the [string-replace-loader](https://www.npmjs.com/package/string-replace-loader) webpack plugin*

```js
// Webpack config
const transformShaderChunk = require('three-minify-shaderchunk');

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /ShaderChunk.js$/,
        loader: 'string-replace-loader',
        include: path.resolve('./node_modules/three/src/renderers/shaders'),
        options: {
          search: /[\s\S]*/,
          replace: transformShaders(['fog_vertex', 'fog_fragment']),
          strict: true,
        },
      },
    ],
  },
};

```


