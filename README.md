# three-minify-shaderchunk

![issues](https://img.shields.io/github/issues/milan338/three-minify-shaderchunk?style=flat-square)
![version](https://img.shields.io/npm/v/three-minify-shaderchunk?style=flat-square)
![downloads](https://img.shields.io/npm/dt/three-minify-shaderchunk?style=flat-square)
![license](https://img.shields.io/github/license/milan338/three-minify-shaderchunk?style=flat-square)

*Remove unnecessary three.js shader imports and reduce bundle sizes*

## Installation

`npm install --save-dev three-minify-shaderchunk`

## Usage

*This example uses the [string-replace-loader](https://www.npmjs.com/package/string-replace-loader) webpack plugin*

```js
// Webpack config
const transformShaderChunk = require('three-minify-shaderchunk');
const shadersToInclude = require('three-minify-shaderchunk/examples/all_shaders');

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
          replace: transformShaderChunk(shadersToInclude),
          strict: true,
        },
      },
    ],
  },
};

```

## License

[MIT License](https://github.com/milan338/three-minify-shaderchunk/blob/master/LICENSE)


