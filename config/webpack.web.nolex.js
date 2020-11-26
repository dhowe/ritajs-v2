// web/minimal

module.exports =
{
  mode: 'production',
  target: 'web',
  output: {
    path: require('path').resolve(__dirname, '../lib'),
    library: 'RiTa',
    filename: 'rita-web-nolex.js',
    chunkFilename: 'rita-web.js',
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
    __VERSION__: JSON.stringify(require("../package.json").version)
  })]
};
