// web/minimal

module.exports =
{
  mode: 'development',
  target: 'web',
  output: {
    path: require('path').resolve(__dirname, '../dist'),
    library: 'RiTa',
    filename: '[name].js',
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
  //entry: { 'rita': './src/rita.js', 'rita-dict': ['./src/rita_dict.js', './src/rita_lts.js'] }
  entry: { 'rita': './src/rita.js' },// 'rita-dict': ['./src/rita_dict.js'] },
  plugins: [new (require('webpack').DefinePlugin)({
    NOLEX: JSON.stringify(true),
    NOLTS: JSON.stringify(true),
  })]
};
