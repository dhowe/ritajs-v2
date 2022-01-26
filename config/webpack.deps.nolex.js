// use with browser, includes deps, no lexicon

module.exports = {
  output: {
    path: require('path').resolve(__dirname, '../dist'),
    library: 'RiTa',
    filename: 'rita-micro.js',
    chunkFilename: 'rita.js',
    globalObject: 'this',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  resolve: {
    fallback: { "fs": false }
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  watchOptions: {
    ignored: /node_modules/
  },
  entry: { 'rita': './src/rita.js' },
  plugins: [
    new (require('webpack').DefinePlugin)({
      __NOLEX__: JSON.stringify(true),
      __VERSION__: JSON.stringify(require("../package.json").version)
    })
    //, new (require('webpack').IgnorePlugin)({
    //   resourceRegExp: /^\.\/rita_dict$/
    //   // contextRegExp: /^src$/
    //   // checkResource(resource, context) {
    //   //   // do something with resource
    //   //   console.log("***IgnorePlugin.checkResource",resource, context);
    //   //   return resource !== './rita_dict';
    //   // }
    // })
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader?compact=true']
      }
    ]
  },
  performance: {
    hints: false
  },
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
};
