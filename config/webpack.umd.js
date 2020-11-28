// UMD

const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/rita.js',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      }
    ]
  },
  //devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    library: 'RiTa',
    filename: 'rita.js',
    libraryTarget: 'umd',
  },
  resolve: { fallback: { fs: false } },
  /*   optimization: {
      minimize: false
    }, */
  watchOptions: {
    ignored: /node_modules/
  },
  //externals: ['he', 'flatted/cjs', 'deepmerge', 'antlr4'],
  plugins: [
    new (webpack.DefinePlugin)({
      __VERSION__: JSON.stringify(require("../package.json").version)
    })
  ]
};
