// web/full

module.exports =
{
  mode: 'development',
  target: 'web',
  output: {
    path: require('path').resolve(__dirname, '../dist'),
    library: 'RiTa',
    filename: 'rita-full.js'
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
  entry: './src/rita.js',
};
