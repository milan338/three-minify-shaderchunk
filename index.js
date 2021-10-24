const fs = require('fs');
const path = require('path');
const util = require('util');

/**
 * Remove unused shader imports from three.js ShaderChunk and keep only those specified
 * @param {string[]} shadersToInclude Shaders that should be imported by three.js ShaderChunk
 * @returns {string} The transformed ShaderChunk file contents
 * @link https://github.com/mrdoob/three.js/blob/dev/src/renderers/shaders/ShaderChunk.js
 * @example
 * // Webpack config
 * module.exports = {
 *   // ...
 *   module: {
 *     rules: [
 *       {
 *         test: /ShaderChunk.js$/,
 *         loader: 'string-replace-loader',
 *         include: path.resolve('./node_modules/three/src/renderers/shaders'),
 *         options: {
 *           search: /([\s\S]*)/,
 *           replace: transformShaders(['fog_vertex', 'fog_fragment']),
 *           strict: true,
 *         },
 *       },
 *     ],
 *   },
 * };
 */
function transformShaderChunk(shadersToInclude) {
    const filePath = require.resolve('three/src/renderers/shaders/ShaderChunk.js');
    const shadersBasePath = filePath.slice(0, -15);
    const file = fs.readFileSync(filePath, 'utf-8');
    // Shaders imported by ShaderChunk
    const imports = {};
    // Final output ShaderChunk object to export
    const outChunk = {};
    // Keep track of if reading ShaderChunk export object
    let isReadingExport = false;
    // Output file contents
    let out = '';
    for (const line of file.split('\n')) {
        // Update ShaderChunk imports
        if (line.startsWith('import')) {
            const parts = line.split(' ');
            const key = parts[1];
            const importPath = path.join(shadersBasePath, parts[3].replace(/["';]|(\.\/)/g, ''));
            imports[key] = importPath;
        } else if (line === 'export const ShaderChunk = {') {
            isReadingExport = true;
        } else if (line === '};' && isReadingExport) {
            isReadingExport = false;
        }
        // Should be called after all imports
        else if (isReadingExport && line) {
            const parts = line.replace(',', '').trim().split(':');
            const exportKey = parts[0].trim();
            const importKey = parts[1].trim();
            // If shader should be imported
            if (shadersToInclude.includes(importKey)) {
                // All imports will be written first, prior to the export chunk
                out += `import ${importKey} from '${imports[importKey].replace(/\\/g, '/')}';\n`;
                outChunk[exportKey] = importKey;
            }
            // If shader should not be imported
            else {
                outChunk[exportKey] = '';
            }
        }
    }
    // Append output chunk to file contents
    out += `export const ShaderChunk = ${util
        .format('%o', outChunk)
        .replace(/(['"])(?=[a-z]).*(['"])/g, (str) => {
            return str.replace(/['"]/g, '');
        })};\n`;
    return out;
}

module.exports = transformShaderChunk;
