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
<<<<<<< HEAD
  optimization: {
    minimize: true,
    minimizer: [
        new (require('terser-webpack-plugin'))({
            //terser plugin v 2.3.8
          terserOptions: { output: { ascii_only: true } },
          extractComments: false
        })
    ],
}
=======
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader?compact=true']
      }
    ]
  },
>>>>>>> 27ebc7a1f23c8c1d37dd92963070794d9ce7f6a8
};
