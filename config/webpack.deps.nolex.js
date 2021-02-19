// use with browser, includes deps, no lexicon

module.exports = {
  mode: 'production',
//  target: 'node',
  output: {
    path: require('path').resolve(__dirname, '../dist'),
    library: 'RiTa',
    filename: 'rita-micro.js',
    chunkFilename: 'rita.js',
    globalObject: 'this',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },  
  node: {
    fs: "empty",
    __dirname: false,
    __filename: false,
  },
  watchOptions: {
    ignored: /node_modules/
  },
  entry: { 'rita': './src/rita.js' },
  plugins: [new (require('webpack').DefinePlugin)({
    __NOLEX__: JSON.stringify(true),
    __VERSION__: JSON.stringify(require("../package.json").version)
  })],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader?compact=true']
      }
    ]
  },
};
