# three-minify-shaderchunk

![issues](https://img.shields.io/github/issues/milan338/three-minify-shaderchunk?style=flat-square)
![version](https://img.shields.io/npm/v/three-minify-shaderchunk?style=flat-square)
![downloads](https://img.shields.io/npm/dt/three-minify-shaderchunk?style=flat-square)
![license](https://img.shields.io/github/license/milan338/three-minify-shaderchunk?style=flat-square)

*Remove unnecessary three.js shader imports and reduce bundle sizes*

## Installation

`npm install --save-dev three-minify-shaderchunk`

## Usage

### Webpack

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

`transformShaderChunk` returns a string with the new ShaderChunk file contents, so it can be used in any other build tool with a similar replacement plugin.

Note, this package can only be used to remove unused shaders from bundles, and does not currently do any glsl minification. You can use three-minify-shaderchunk together with other plugins like [three-minifier](https://github.com/yushijinhun/three-minifier) that do glsl minification to further reduce bundle sizes.

If you're looking to go even further, you can take advantage of [aliasing imports from 'three' to module sources](https://gist.github.com/drcmda/974f84240a329fa8a9ce04bbdaffc04d).
## License

[MIT License](https://github.com/milan338/three-minify-shaderchunk/blob/master/LICENSE)


