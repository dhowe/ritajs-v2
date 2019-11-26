let path = require('path');
let dist = path.resolve(__dirname, 'dist');

module.exports = [{
  entry: './src/rita.js',
  mode: 'development',
  target: 'node',
  node: {
    fs: "empty",
    __dirname: false,
    __filename: false,
  },
  output: {
    path: dist,
    library: 'RiTa',
    filename: 'rita.js',
    libraryTarget: 'commonjs2',
  },
  externals: ['he', 'colors', /^antlr4\/.+$/]
}, {
  entry: './src/rita.js',
  mode: 'development',
  target: 'web',
  performance: {
    hints: false
  },
  output: {
    path: dist,
    library: 'RiTa',
    filename: 'rita-web.js'
  },
  node: {
    fs: "empty"
  }
}];
