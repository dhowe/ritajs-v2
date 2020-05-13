// web/minimal

module.exports =
{
  mode: 'development',
  target: 'web',
  output: {
    path: require('path').resolve(__dirname, '../dist'),
    library: 'RiTa',
    filename: 'rita-micro.js',
    chunkFilename: 'rita-full.js',
  },
  performance: {
    hints: false
  },
  watchOptions: {
    ignored: /node_modules/
  },
  node: {
    fs: "empty"
  },
  entry: { 'rita': './src/rita.js' },
  plugins: [new (require('webpack').DefinePlugin)({
    __NOLEX__: JSON.stringify(true),
    __NOLTS__: JSON.stringify(true),
    __VERSION__: JSON.stringify(require("../package.json").version)
  })]
};
